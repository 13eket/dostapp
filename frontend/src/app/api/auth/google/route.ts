import { NextResponse } from 'next/server';

// In-memory storage for users
const users = new Map<string, any>();

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    // Verify Google token
    const googleResponse = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    );

    if (!googleResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 },
      );
    }

    const googleUser = await googleResponse.json();

    // Check if user exists
    let userStatus = 'needs_phone';
    if (users.has(googleUser.email)) {
      userStatus = 'needs_payment';
    } else {
      // Store new user
      users.set(googleUser.email, {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        created_at: new Date().toISOString(),
      });
    }

    // Generate a simple JWT (in production, use a proper JWT library)
    const JWToken = Buffer.from(
      JSON.stringify({
        email: googleUser.email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      }),
    ).toString('base64');

    return NextResponse.json({
      JWToken,
      userStatus,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
