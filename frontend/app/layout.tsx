import "./globals.css";

export const metadata = {
  title: "Saarthi",
  description: "AI Banking Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}