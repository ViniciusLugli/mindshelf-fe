import Link from "next/link";
import NoteCard from "./NoteCard";

export type Note = {
  id: string;
  groupTitle: string;
  groupColor: string;
  noteTitle: string;
};

type LatestNotesProps = {
  notes: Note[];
  title?: string;
};

export default function LatestNotes({
  notes,
  title = "Latest Notes",
}: LatestNotesProps) {
  return (
    <div className="w-full px-5 mb-5">
      <h2 className="my-4 px-2 text-lg font-bold text-base-content sm:text-3xl">
        {title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {notes.map((note) => (
          <Link key={note.id} href={`/groups/${note.id}`}>
            <NoteCard
              key={note.id}
              groupTitle={note.groupTitle}
              groupColor={note.groupColor}
              noteTitle={note.noteTitle}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
