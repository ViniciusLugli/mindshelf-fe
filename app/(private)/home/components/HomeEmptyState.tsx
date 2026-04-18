type HomeEmptyStateProps = {
  message: string;
};

export default function HomeEmptyState({ message }: HomeEmptyStateProps) {
  return (
    <div className="rounded-[1.6rem] border border-dashed border-base-300/70 bg-base-100/55 px-4 py-12 text-center text-sm text-base-content/45">
      {message}
    </div>
  );
}
