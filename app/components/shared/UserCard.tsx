type UserCardProprs = {
  name: string;
  avatarUrl?: string;
  unreadMessages: number;
  status?: "online" | "offline";
};

export default function UserCard({
  name,
  avatarUrl,
  unreadMessages,
  status,
}: UserCardProprs) {
  return (
    <div className="card bg-base-100 w-40 h-32 shadow-sm card-border border-accent">
      <figure className="w-full h-full">
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

      <div className="card-body h-10 items-center text-center ">
        <h2 className="card-title">{name}</h2>
        <p>Status: {status}</p>
      </div>
    </div>
  );
}
