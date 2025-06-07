'use client';

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useFormContext } from '@/context/FormContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toSnakeCaseDeep } from '@/utils/api';
import assert from 'assert';

function SignInButton() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { formData } = useFormContext();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/auth/google`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              google_token: tokenResponse.access_token,
              ...toSnakeCaseDeep(formData),
            }),
          },
        );

        assert(res.ok, 'Backend Google Auth Failed');

        const data = await res.json();

        assert(data.jwt, 'Backend did not provide JWT token');
        assert(data.next_step != null && data.next_step != undefined, 'Backend did not provide next step');

        setToken(data.jwt);

        switch (data.next_step) {
          case "cabinet":
            router.push("/profile");
            break;
          case "payment":
            router.push("/payment");
            break;
          case "survey_answers":
            router.push("/survey");
            break;
          case "phone_number":
            router.push("/phoneNumber");
            break;
          case "dinner_preferences":
            router.push("/dinnerPreferences");
            break;
          default:
            router.push("/");
        }
      } catch (err) {
        setError('Failed to sign in. Please try again.');
      }
    },
    onError: () => {
      setError('Google sign-in failed. Please try again.');
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-orange-500 text-center">
      <div className="max-w-md p-8 text-white">
        <h1 className="text-3xl font-bold">СТОЛИК С 5 ДРУГИМИ УЧАСТНИКАМИ</h1>
        <p className="mt-2 text-3xl italic"> НАЙДЕН!</p>
        {error && <p className="mt-2 text-red-200">{error}</p>}

        <div className="mt-6 space-y-4">
          <button
            onClick={() => login()}
            className="flex w-full items-center justify-center space-x-2 rounded-full border bg-white py-2 text-black"
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.73 1.3 9.2 3.4l6.83-6.84C35.71 2.19 30.22 0 24 0 14.66 0 6.4 5.4 2.46 13.3l7.9 6.14C12.28 13.06 17.7 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.8 24.5c0-1.7-.15-3.32-.42-4.9H24v9.9h12.96c-.64 3.36-2.45 6.2-5.06 8.14l7.9 6.1c4.6-4.26 7.25-10.54 7.25-17.24z"
              />
              <path
                fill="#FBBC05"
                d="M10.36 28.58c-1.46-4.32-1.46-9.06 0-13.38l-7.9-6.14c-4.05 8.1-4.05 17.46 0 25.56l7.9-6.04z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.2 0 11.7-2.06 16.1-5.58l-7.9-6.1c-2.3 1.56-5.18 2.46-8.2 2.46-6.3 0-11.7-3.56-14.44-8.78l-7.9 6.04C6.4 42.6 14.66 48 24 48z"
              />
            </svg>
            <span>Войти через Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <SignInButton />
    </GoogleOAuthProvider>
  );
}
