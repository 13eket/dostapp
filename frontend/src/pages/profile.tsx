"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../component/ProtectedRoute";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

interface Profile {
  name: string;
  email: string;
  picture?: string;
  phone_number?: string;
  survey_answers?: any;
  dinner_preferences?: any;
}

export default function ProfilePage() {
  const { token, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Only fetch if we have a token and loading is complete
    if (!token || loading) {
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.detail || "Failed to fetch profile.");
        } else {
          const data = await response.json();
          setProfile(data);
        }
      } catch (err) {
        setError("Something went wrong.");
      }
    };

    fetchProfile();
  }, [token, loading]);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Profile Page</h1>
        {error && <p className="text-red-500">{error}</p>}
        {profile && (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            {profile.picture && (
              <Image
                src={profile.picture}
                alt="Profile"
                className="w-24 h-24 rounded-full"
                width={96}
                height={96}
              />
            )}
            <p>
              <strong>Phone Number:</strong> {profile.phone_number || "N/A"}
            </p>
            <p>
              <strong>Survey Answers:</strong>{" "}
              {JSON.stringify(profile.survey_answers)}
            </p>
            <p>
              <strong>Dinner Preferences:</strong>{" "}
              {JSON.stringify(profile.dinner_preferences)}
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
