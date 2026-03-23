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

export default function GroupsPage() {
  return (
    <>
      <div className="w-full h-full">
        <UserCarousel users={users} />
      </div>
    </>
  );
}
