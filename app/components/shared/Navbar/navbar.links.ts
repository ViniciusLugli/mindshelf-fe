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
];
