"use client";

import UserAvatar from "@/app/components/UI/UserAvatar";
import { useSession } from "@/app/providers/SessionProvider";
import Logo from "../Logo";
import MenuIcon from "@mui/icons-material/Menu";
import NavMenu from "./NavMenu";
import { navbarLinks } from "./navbar.links";
import Link from "next/link";

export default function Navbar() {
  const { currentUser } = useSession();

  return (
    <div className="navbar min-h-16 bg-neutral text-neutral-content px-3 py-2 sm:min-h-20 sm:px-4 lg:min-h-23 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost h-auto min-h-0 p-0 text-inherit hover:bg-transparent lg:hidden"
          >
            <MenuIcon />
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 bg-neutral p-2 text-neutral-content shadow"
          >
            <NavMenu items={navbarLinks} mobile />
          </ul>
        </div>

        <Link
          href={"/"}
          className="mx-2 h-auto min-h-0 hover:bg-transparent sm:mx-4"
        >
          <Logo size="sm" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 sm:px-2 sm:text-base lg:px-4 lg:text-lg">
          <NavMenu items={navbarLinks} />
        </ul>
      </div>

      <div className="navbar-end">
        <Link
          href="/account"
          className="h-auto min-h-0 text-sm text-inherit hover:bg-transparent sm:text-base lg:text-lg"
        >
          <UserAvatar
            name={currentUser?.name || "Usuario"}
            avatarUrl={currentUser?.avatar_url || undefined}
            size="sm"
          />
        </Link>
      </div>
    </div>
  );
}
