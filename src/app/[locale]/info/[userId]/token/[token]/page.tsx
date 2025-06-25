import authenticate from "@/auth/authenticate";
import InfoSection from "@/components/info/InfoSection";
import prisma from "@/lib/prisma/client";

export default async function Info({ params }: Readonly<{
  params: Promise<{ userId: string, token: string }>;
}>) {
  const { userId, token } = await params;
  await authenticate();

  const user = await prisma.user.findUnique({
    where: {
        id: userId
    },
    include: {
      approvedState: true,
      registraciones: true,
      visas: true,
      passports: true,
    }
  })

  const qrcode = await prisma.qrcode.findUnique({
    where: {
      token,
    }
  });

  if(!user) return (
    <h1 className="text-center text-2xl font-bold text-red-500 p-8 rounded-lg bg-red-50 shadow-sm">
      User not found
    </h1>
  )
  if(!qrcode) return (
    <h1 className="text-center text-2xl font-bold text-amber-500 p-8 rounded-lg bg-amber-50 shadow-sm">
      QR Code not found
    </h1>
  )
  if(qrcode?.expiresAt && qrcode.expiresAt < new Date()) return (
    <h1 className="text-center text-2xl font-bold text-orange-500 p-8 rounded-lg bg-orange-50 shadow-sm">
      QR Code expired
    </h1>
  )

  return <InfoSection user={user}/>;
}
