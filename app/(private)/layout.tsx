import Navbar from "../components/UI/Navbar/Navbar";

export default function PrivatePageNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
