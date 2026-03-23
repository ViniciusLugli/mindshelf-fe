import Link from "next/link";
import Logo from "../shared/Logo";
import { navbarLinks } from "./Navbar/navbar.links";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral px-6 py-10 text-neutral-content md:px-8 lg:px-12">
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <div className="flex w-full flex-col items-start justify-between gap-8 text-left lg:flex-row lg:items-center">
          <div className="max-w-md">
            <Logo size="sm" />
            <p className="mt-4 text-sm leading-6 text-neutral-content/70 sm:text-base">
              Your personal space to think, organize and share. Create groups,
              write notes and connect with the people that matter
            </p>
          </div>

          <nav className="grid w-full max-w-xl grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="footer-title mb-3 opacity-100">Navigate</h2>
              <div className="flex flex-col gap-2 text-sm sm:text-base">
                {navbarLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="link link-hover"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="footer-title mb-3 opacity-100">Account</h2>
              <div className="flex flex-col gap-2 text-sm sm:text-base">
                <Link href="/signin" className="link link-hover">
                  Sign In
                </Link>
                <Link href="/signup" className="link link-hover">
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="footer-title mb-3 opacity-100">Contact</h2>
              <div className="flex flex-col gap-2 text-sm sm:text-base">
                <a
                  href="mailto:viniciusflugli@gmail.com"
                  className="link link-hover"
                >
                  viniciusflugli@gmail.com
                </a>
                <a
                  href="https://github.com/ViniciusLugli"
                  target="_blank"
                  rel="noreferrer"
                  className="link link-hover"
                >
                  GitHub
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="w-full border-t border-neutral-content/15 pt-5 text-sm text-neutral-content/60">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <p>Copyright {year} MindShelf. Todos os direitos reservados.</p>
            <p>Made to transform notes in shared knowledge.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
