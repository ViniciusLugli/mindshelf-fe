import LatestNotes, { Note } from "@/app/components/shared/LastestNotes";
import LatestGroups, { Group } from "@/app/components/shared/LatestGroups";
import UserCarousel, {
  CarouselUser,
} from "@/app/components/shared/UserCarousel";

const users: CarouselUser[] = [
  { id: "1", name: "Ana Silva", unreadMessages: 3, status: "online" },
  {
    id: "2",
    name: "João Costa",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP46-FuCHEfwl6nhJV-oJfl7gKHATfBgI9oA&s",
    unreadMessages: 0,
    status: "offline",
  },
  { id: "3", name: "Maria Souza", unreadMessages: 12, status: "online" },
  {
    id: "4",
    name: "Carlos Pereira",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    unreadMessages: 1,
    status: "offline",
  },
  { id: "5", name: "Luciana Gomes", unreadMessages: 0, status: "online" },
  {
    id: "6",
    name: "Fernando Almeida",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    unreadMessages: 5,
    status: "online",
  },
  { id: "7", name: "Patrícia Santos", unreadMessages: 0, status: "offline" },
  { id: "8", name: "Roberto Lima", unreadMessages: 0, status: "online" },
  { id: "9", name: "Sofia Fernandes", unreadMessages: 2, status: "offline" },
  { id: "10", name: "Ricardo Oliveira", unreadMessages: 0, status: "online" },
  { id: "11", name: "Camila Rodrigues", unreadMessages: 7, status: "online" },
];

const notes: Note[] = [
  {
    id: "1",
    groupTitle: "Product Design",
    groupColor: "#E76F51",
    noteTitle:
      "Refinar o fluxo de onboarding para diminuir abandono no primeiro acesso",
  },
  {
    id: "2",
    groupTitle: "Marketing Sprint",
    groupColor: "#2A9D8F",
    noteTitle: "Ideias de campanha para lancamento do plano colaborativo",
  },
  {
    id: "3",
    groupTitle: "Book Club",
    groupColor: "#264653",
    noteTitle:
      "Resumo dos capitulos 3 e 4 com perguntas para a proxima reuniao",
  },
  {
    id: "4",
    groupTitle: "Weekend Ideas",
    groupColor: "#F4A261",
    noteTitle: "Lista curta de passeios, cafes e exposicoes para sabado",
  },
];

const groups: Group[] = [
  { id: "1", title: "Product Design", color: "#E76F51" },
  { id: "2", title: "Marketing Sprint", color: "#2A9D8F" },
  { id: "3", title: "Book Club", color: "#264653" },
  { id: "4", title: "Weekend Ideas", color: "#F4A261" },
];

export default function GroupsPage() {
  return (
    <section className="space-y-8 px-5 py-3">
      <div className="w-full h-full">
        <UserCarousel users={users} />
      </div>

      <div className="pb-3">
        <LatestGroups groups={groups} />
      </div>
      <div className="space-y-2 px-1">
        <LatestNotes notes={notes} />
      </div>
    </section>
  );
}
