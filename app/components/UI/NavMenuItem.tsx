import Link from "next/link";
import { NavbarItem } from "./navbar.links";

type NavMenuItemProps = {
  item: NavbarItem;
  mobile: boolean;
};

export default function NavMenuItem({ item, mobile }: NavMenuItemProps) {
  if (item.children?.length) {
    if (mobile) {
      return (
        <li>
          <details>
            <summary>{item.label}</summary>
            <ul className="bg-neutral p-2">
              {item.children.map((child, index) => (
                <NavMenuItem key={index} item={child} mobile={mobile} />
              ))}
            </ul>
          </details>
        </li>
      );
    }

    return (
      <li>
        <details>
          <summary>{item.label}</summary>
          <ul className="bg-neutral p-2">
            {item.children.map((child) => (
              <NavMenuItem key={child.label} item={child} mobile={mobile} />
            ))}
          </ul>
        </details>
      </li>
    );
  }

  return (
    <li>
      <Link href={item.href}>{item.label}</Link>
    </li>
  );
}
