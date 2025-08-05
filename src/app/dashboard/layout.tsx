import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="bg-[#fbfbfb]">{children}</div>
    </Providers>
  );
}
