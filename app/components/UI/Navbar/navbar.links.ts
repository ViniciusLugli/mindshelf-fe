export type NavbarItem = {
  label: string;
  href: string;
  children?: NavbarItem[];
};

export const navbarLinks: NavbarItem[] = [
  {
    label: "Home",
    href: "/home",
  },
  { label: "Groups", href: "/groups" },
  {
    label: "Lista",
    href: "/lista",
    children: [
      { label: "Subitem 1", href: "/subitem1" },
      { label: "Subitem 2", href: "/subitem2" },
    ],
  },
];
