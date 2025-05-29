import AccountSettings from '@/components/user/AccountSettings';
import NotificationSettings from '@/components/user/NotificationSettings';
import PrivacySettings from '@/components/user/PrivacySettings';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-8">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
          <AccountSettings />
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
          <NotificationSettings />
        </div>
        
        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
          <PrivacySettings />
        </div>
      </div>
    </div>
  );
}