import UserSidebar from '@/components/user/UserSidebar';
import UserHeader from '@/components/user/UserHeader';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}