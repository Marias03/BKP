import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'marias03',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { publicId } = await req.json();
  const expiresAt = Math.floor(Date.now() / 1000) + 600; // 10 mins

  const url = cloudinary.url(publicId, {
    sign_url: true,
    expires_at: expiresAt,
  });

  return NextResponse.json({ url });
}
