type UserAvatarProps = {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeMap = {
  sm: "h-10 w-10 text-sm rounded-2xl",
  md: "h-14 w-14 text-lg rounded-[1.35rem]",
  lg: "h-20 w-20 text-2xl rounded-[1.6rem]",
  xl: "h-28 w-28 text-4xl rounded-[2rem]",
};

export default function UserAvatar({
  name,
  avatarUrl,
  size = "md",
}: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeMap[size]} border border-base-300/60 object-cover shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${sizeMap[size]} flex items-center justify-center border border-base-300/60 bg-linear-to-br from-primary to-secondary font-semibold text-primary-content shadow-sm`}
    >
      {initial}
    </div>
  );
}
