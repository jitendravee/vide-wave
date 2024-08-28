export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex flex-col">
          <main className="relative flex  min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
