import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QALab",
  description: "Dashboard de portfólio para registrar casos de teste e bugs em QA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
