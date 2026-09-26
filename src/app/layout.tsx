export const metadata = { title: "THE Connect", description: "Community platform for Seabrook / CCISD" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f4f4f8", color: "#1a1f2e" }}>
        {children}
      </body>
    </html>
  );
}
