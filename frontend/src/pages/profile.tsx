'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '../component/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
    const { token } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setError('No token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.detail || 'Failed to fetch profile.');
                } else {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (err) {
                setError('Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    return (
        <ProtectedRoute>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Profile Page</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {profile && (
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        {profile.picture && (
                            <img src={profile.picture} alt="Profile" className="w-24 h-24 rounded-full" />
                        )}
                        <p><strong>Phone Number:</strong> {profile.phone_number || 'N/A'}</p>
                        <p><strong>Survey Answers:</strong> {JSON.stringify(profile.survey_answers)}</p>
                        <p><strong>Dinner Preferences:</strong> {JSON.stringify(profile.dinner_preferences)}</p>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}