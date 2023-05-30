import '@styles/globals.css';
import Navbar from '@components/Navbar';

export const metadata = {
  title: 'The One Project',
  description: 'Exploring the lore of The lord of the rings',
  icons: {
    icon: '/assets/icons/sauroneye1.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
