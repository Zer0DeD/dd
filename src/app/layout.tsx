export const metadata = {
  title: "DD",
  description: "Курсовая работа по цифровой кафедре",
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
