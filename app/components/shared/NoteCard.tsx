type NoteCardProps = {
  groupTitle: string;
  groupColor: string;
  noteTitle: string;
};

export default function NoteCard({ groupTitle, noteTitle }: NoteCardProps) {
  return (
    <article className="card group/note min-h-40 border border-base-300/70 bg-base-100/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-base-content/10">
      <div className="card-body justify-between gap-6 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="badge badge-outline border-[groupColor]/30 bg-[groupColor]/8 px-3 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[groupColor]">
            {groupTitle}
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.22em] text-base-content/35">
            Note
          </span>
        </div>

        <h3 className="line-clamp-3 text-xl font-semibold leading-tight text-base-content transition-colors duration-300 group-hover/note:text-primary">
          {noteTitle}
        </h3>
      </div>
    </article>
  );
}
