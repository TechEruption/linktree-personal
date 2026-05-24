import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminProfile } from '../components/admin/AdminProfile';
import { AdminLinks } from '../components/admin/AdminLinks';
import { AdminSocial } from '../components/admin/AdminSocial';

export function AdminPage() {
  const [currentTab, setCurrentTab] = useState('profile');

  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return <AdminProfile />;
      case 'links':
        return <AdminLinks />;
      case 'social':
        return <AdminSocial />;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <AdminSidebar currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
    </AdminSidebar>
  );
}
