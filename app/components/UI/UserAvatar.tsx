import Image from "next/image";

type UserAvatarProps = {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeMap = {
  sm: { classes: "h-10 w-10 text-sm rounded-2xl", pixels: 40 },
  md: { classes: "h-14 w-14 text-lg rounded-[1.35rem]", pixels: 56 },
  lg: { classes: "h-20 w-20 text-2xl rounded-[1.6rem]", pixels: 80 },
  xl: { classes: "h-28 w-28 text-4xl rounded-[2rem]", pixels: 112 },
};

export default function UserAvatar({
  name,
  avatarUrl,
  size = "md",
}: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const sizeConfig = sizeMap[size];

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={sizeConfig.pixels}
        height={sizeConfig.pixels}
        className={`${sizeConfig.classes} border border-base-300/60 object-cover shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${sizeConfig.classes} flex items-center justify-center border border-base-300/60 bg-linear-to-br from-primary to-secondary font-semibold text-primary-content shadow-sm`}
    >
      {initial}
    </div>
  );
}
