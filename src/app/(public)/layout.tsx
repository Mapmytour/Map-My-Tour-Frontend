import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopHeader from "@/components/common/TopHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <TopHeader />
        <Header />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}