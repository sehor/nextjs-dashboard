import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import UserButton from '@/app/ui/user-button';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="bg-gray-100 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">我的应用</h1>
          <UserButton />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
