import Link from "next/link";
import NoteCard from "./Cards/NoteCard";
import EmptyCard from "../UI/EmptyCard";
import { StickyNote2 } from "@mui/icons-material";

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
  if (!notes.length)
    return (
      <div className="w-full px-5 mb-5">
        <h2 className="my-4 px-2 text-lg font-bold text-base-content sm:text-3xl">
          {title}
        </h2>

        <EmptyCard
          title="No Notes Found"
          description="When you create or edit notes, they will appear here."
          icon={<StickyNote2 fontSize="small" />}
        />
      </div>
    );

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
