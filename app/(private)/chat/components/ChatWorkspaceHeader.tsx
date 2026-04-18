import { Wifi, WifiOff } from "@mui/icons-material";

type ChatWorkspaceHeaderProps = {
  connectionStatus: "disconnected" | "connecting" | "connected";
};

export default function ChatWorkspaceHeader({
  connectionStatus,
}: ChatWorkspaceHeaderProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
          Conversas
        </p>
        <h1 className="text-3xl font-bold text-base-content">Chat com seus amigos</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-base-content/55">
          Converse em tempo real, acompanhe o que ainda nao foi lido e compartilhe tasks direto na conversa.
        </p>
      </div>

      <div className="badge badge-lg gap-2 rounded-full border border-base-300/60 bg-base-100 px-4 py-4 text-sm font-medium text-base-content/60">
        {connectionStatus === "connected" ? (
          <Wifi fontSize="small" className="text-success" />
        ) : (
          <WifiOff fontSize="small" className="text-warning" />
        )}
        {connectionStatus === "connected" ? "Conectado" : "Reconectando"}
      </div>
    </div>
  );
}
