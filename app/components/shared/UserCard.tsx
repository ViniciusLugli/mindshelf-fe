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
  return (
    <div className="card bg-base-100 w-40 h-40 shadow-sm card-border border-accent">
      <figure className="w-full h-20">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} />
        ) : (
          <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </figure>

      {unreadMessages > 0 && (
        <span className="badge badge-error badge-sm absolute -top-1 -right-1 font-bold">
          {unreadMessages > 99 ? "99+" : unreadMessages}
        </span>
      )}

      <div className="card-body items-center p-2">
        <h3 className="card-title">{name}</h3>

        {status === "online" ? (
          <p>
            <span className="badge badge-success">Online</span>
          </p>
        ) : (
          <p>
            <span className="badge badge-neutral">Offline</span>
          </p>
        )}
      </div>
    </div>
  );
}
