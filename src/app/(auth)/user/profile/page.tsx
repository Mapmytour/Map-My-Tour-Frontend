import ProfileForm from '@/components/user/ProfileForm';
import ProfileStats from '@/components/user/ProfileStats';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <ProfileForm />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <ProfileStats />
        </div>
      </div>
    </div>
  );
}