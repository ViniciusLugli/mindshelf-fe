import { NavbarItem } from "./navbar.links";
import NavMenuItem from "./NavMenuItem";

type NavMenuProps = {
  items: NavbarItem[];
  mobile?: boolean;
};

export default function NavMenu({ items, mobile = false }: NavMenuProps) {
  return (
    <>
      {items.map((item, index) => (
        <NavMenuItem key={index} item={item} mobile={mobile} />
      ))}
    </>
  );
}
