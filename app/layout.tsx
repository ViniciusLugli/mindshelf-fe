import { Metadata } from "next";
import "./globals.css";
import Footer from "./components/shared/Footer";
import QueryProvider from "./providers/QueryProvider";

export const metadata: Metadata = {
  title: "MindShelf",
  applicationName: "MindShelf",
  description:
    "Your personal space to think, organize and share. Create groups, write notes and connect with the people that matter — your knowledge, curated and shared.",
  authors: [
    {
      name: "Vinícius Ferreira Lugli",
      url: "https://github.com/ViniciusLugli",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        (function() {
                            const theme = localStorage.getItem("theme") || "cupcake";
                            document.documentElement.setAttribute("data-theme", theme);
                        })();
                    `,
          }}
        />
      </head>
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
