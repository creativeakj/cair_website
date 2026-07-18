import { GoogleTagManager } from "@next/third-parties/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </div>
    </LanguageProvider>
  );
}
