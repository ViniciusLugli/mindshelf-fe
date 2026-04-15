"use client";

import GroupCard from "@/app/components/shared/Cards/GroupCard";
import ColorPicker from "@/app/components/UI/ColorPicker";
import InputField from "@/app/components/UI/InputField";
import { useCreateGroupMutation } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_GROUP_COLOR = "#E76F51";
const PRESET_COLORS = [
  "#E76F51",
  "#2A9D8F",
  "#264653",
  "#F4A261",
  "#D64550",
  "#0EA5E9",
];

function normalizeHexColor(value: string): string | null {
  const cleaned = value.trim().replace(/^#/, "");
  const isValidHex = /^([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/.test(cleaned);
  if (!isValidHex) return null;
  return `#${cleaned.toUpperCase()}`;
}

export default function NewGroupPage() {
  const router = useRouter();
  const createGroupMutation = useCreateGroupMutation();
  const [state, setState] = useState({
    groupName: "",
    groupColor: DEFAULT_GROUP_COLOR,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmitting = createGroupMutation.isPending;

  const previewTitle = state.groupName.trim() || "Novo Grupo";
  const normalizedGroupColor = normalizeHexColor(state.groupColor);
  const previewColor = normalizedGroupColor || DEFAULT_GROUP_COLOR;
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const groupName = state.groupName.trim();
    if (!groupName) {
      setErrorMessage("O nome do grupo é obrigatório.");
      return;
    }
    if (!normalizedGroupColor) {
      setErrorMessage("Escolha uma cor hex válida.");
      return;
    }

    try {
      await createGroupMutation.mutateAsync({
        name: groupName,
        color: normalizedGroupColor,
      });
      router.push("/groups");
    } catch (error) {
      console.error("Failed to create group", error);
      setErrorMessage("Não foi possível criar o grupo. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-lg space-y-10">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-base-content/35">
              Grupos · Novo
            </p>
            <h1
              className="text-4xl font-bold leading-[1.08] text-base-content sm:text-5xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Crie um espaço para suas ideias.
            </h1>
            <p className="text-sm leading-relaxed text-base-content/50">
              Defina o nome e a identidade visual do grupo. O preview ao lado
              reflete as mudanças em tempo real.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-content">
                  1
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/40">
                  Identidade
                </p>
              </div>
              <InputField
                label="Nome do grupo"
                placeholder="Ex: Product Design Squad"
                value={state.groupName}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, groupName: value }))
                }
              />
            </div>

            <div className="border-t border-base-300/60" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-content">
                  2
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/40">
                  Cor do grupo
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {PRESET_COLORS.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    aria-label={`Usar ${presetColor}`}
                    onClick={() =>
                      setState((prev) => ({ ...prev, groupColor: presetColor }))
                    }
                    className="relative h-8 w-8 rounded-full border-2 border-base-100 shadow transition-transform hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: presetColor,
                      outline:
                        previewColor === presetColor
                          ? `2px solid ${presetColor}`
                          : "none",
                      outlineOffset: "2px",
                    }}
                  >
                    {previewColor === presetColor && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          className="h-3 w-3"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}

                <div className="mx-1 h-6 w-px bg-base-300/70" />

                <ColorPicker
                  value={state.groupColor}
                  onChange={(color) =>
                    setState((prev) => ({ ...prev, groupColor: color }))
                  }
                />
              </div>
            </div>

            <div className="border-t border-base-300/60" />

            {errorMessage && (
              <div className="rounded-xl border border-error/20 bg-error/8 px-4 py-2.5 text-[13px] text-error">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-ghost btn-sm text-base-content/50"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Criando...
                  </>
                ) : (
                  "Criar grupo"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <aside
        className="hidden lg:flex flex-col justify-between relative overflow-hidden border-l border-base-300/50"
        style={{
          background: `linear-gradient(160deg, color-mix(in oklab, ${previewColor} 12%, var(--color-base-200)) 0%, var(--color-base-200) 60%)`,
          transition: "background 0.4s ease",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative flex flex-1 flex-col p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-base-content/30">
            Preview
          </p>

          <div className="flex flex-1 items-center justify-center">
            <div className="pointer-events-none w-full max-w-70">
              <GroupCard title={previewTitle} color={previewColor} href="#" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
