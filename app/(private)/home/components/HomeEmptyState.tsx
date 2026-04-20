type HomeEmptyStateProps = {
  message: string;
};

export default function HomeEmptyState({ message }: HomeEmptyStateProps) {
  return (
    <div className="app-empty-state rounded-[1.6rem] border border-dashed px-4 py-12 text-center text-sm">
      {message}
    </div>
  );
}
