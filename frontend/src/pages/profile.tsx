'use client';

import ProtectedRoute from '../component/ProtectedRoute';

// TODO: Add profile page
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1>Profile Page</h1>
        {/* Your profile content here */}
      </div>
    </ProtectedRoute>
  );
}
