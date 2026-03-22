import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
