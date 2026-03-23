import Navbar from "../components/shared/Navbar/Navbar";

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
