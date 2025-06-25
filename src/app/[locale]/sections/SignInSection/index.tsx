"use client";
"use client";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { Card, CardBody, CardHeader } from "@heroui/card";
import SigninForm from "@/components/forms/SignInForm";
import Navbar from "@/components/ui/Navbarsingin";
import { Link } from "@/i18n/navigation";

export default function SignInSection({
  sessionCallback,
  redirectAdmin,
}: {
  sessionCallback: string;
  redirectAdmin?: string;
}) {
  return (
    <div className="min-h-screen relative">
      {/* Contenedor del fondo con múltiples fallbacks */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/fondosing.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar />

        <AuthFormWrapper>
          <Card className="w-[550px] shadow-lg p-6 bg-white/90 backdrop-blur-sm">
            <CardHeader className="flex flex-col justify-center items-center mt-6 mb-4">
              <h1 className="text-3xl font-semibold text-gray-800">Welcome</h1>
              <p className="text-sm font-normal text-gray-600">
                Sign in to your account {!redirectAdmin && "Login As admin"}
              </p>
            </CardHeader>

            <CardBody className="flex justify-center">
              <SigninForm label="Login" callback={sessionCallback} />
              {redirectAdmin && (
                <Link href="/auth/admin-sign-in">
                  <button className="text-blue-800 hover:underline">
                    Login As admin
                  </button>
                </Link>
              )}
            </CardBody>
          </Card>
        </AuthFormWrapper>
      </div>

      {/* Verificación en consola */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const img = new Image();
            img.src = '/fondosing.jpg';
            img.onload = function() {
              console.log('Background image loaded successfully');
            };
            img.onerror = function() {
              console.error('Error loading background image - check file path and name');
              document.querySelector('.bg-error-fallback').style.display = 'flex';
            };
          `,
        }}
      />
    </div>
  );
}
