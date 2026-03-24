type UserCardProps = {
  name: string;
  avatarUrl?: string;
  unreadMessages: number;
  status: "online" | "offline";
};

export default function UserCard({
  name,
  avatarUrl,
  unreadMessages,
  status,
}: UserCardProps) {
  const initial = name.charAt(0).toUpperCase();
  const isOnline = status === "online";

  return (
    <article className="card group/card relative min-w-44 max-w-44 shrink-0 overflow-hidden border border-base-300/70 bg-base-100/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-base-content/10">
      <figure className="relative h-28 overflow-hidden border-b border-base-300/60 bg-linear-to-br from-primary/18 via-base-200 to-secondary/12">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-secondary text-4xl font-semibold text-primary-content">
            {initial}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-base-content/25 to-transparent" />
      </figure>

      {unreadMessages > 0 && (
        <span className="badge badge-error badge-sm absolute right-3 top-3 border-0 font-bold shadow-md shadow-error/30">
          {unreadMessages > 99 ? "99+" : unreadMessages}
        </span>
      )}

      <div className="card-body gap-3 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-base-content transition-colors group-hover/card:text-primary">
            {name}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-2.5 w-2.5 rounded-full ${
                isOnline
                  ? "bg-success shadow-sm shadow-success/60"
                  : "bg-base-300"
              }`}
            />
            <span className="font-medium text-base-content/70">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
