import "./globals.css";

export const metadata = {
  title: "DonutSMP Casino",
  description: "Play house games with your DonutSMP chip balance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
