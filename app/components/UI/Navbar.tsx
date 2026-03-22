"use client";

import Logo from "../shared/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import NavMenu from "./NavMenu";
import { navbarLinks } from "./navbar.links";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar min-h-23 bg-neutral px-4 text-base-100 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost h-auto min-h-0 p-0 hover:bg-transparent lg:hidden"
          >
            <MenuIcon />
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavMenu items={navbarLinks} mobile />
          </ul>
        </div>

        <a className="h-auto min-h-0 mx-4 hover:bg-transparent">
          <Logo size="sm" />
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavMenu items={navbarLinks} />
        </ul>
      </div>

      <div className="navbar-end">
        <Link href="/signin" className="btn btn-ghost hover:bg-transparent">
          Sign In
        </Link>
      </div>
    </div>
  );
}
