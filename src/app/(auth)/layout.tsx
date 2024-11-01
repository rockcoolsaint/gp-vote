import { ShurikenUIProvider } from "@shuriken-ui/react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ShurikenUIProvider>
      <div>
        {children}
      </div>
    </ShurikenUIProvider>
  );
}
