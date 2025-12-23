import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Hapus min-h-screen di sini karena sudah ada di globals.css */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}