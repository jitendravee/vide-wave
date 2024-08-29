import SlideBar from "@/ui/slideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen">
          <SlideBar className="flex border-cyan-400" />
          <main className="flex">{children}</main>
        </div>
      </body>
    </html>
  );
}
