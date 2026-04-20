export default function ChatWorkspaceHeader() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
          Conversations
        </p>
        <h1 className="text-3xl font-bold text-base-content">
          Chat with your people
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-base-content/55">
          Send quick messages, track unread replies, and share notes without leaving the thread.
        </p>
      </div>
    </div>
  );
}
