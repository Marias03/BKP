import { NextFetchEvent, NextResponse } from "next/server";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";

// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

type Environment = "production" | "development" | "other";

const authMiddleware = withAuth({
  pages: {
    signIn: "/en/auth/sign-in",
  },
});

const authPathsScopes = ["/profile", "citas", "documents", "necesarios"];

async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  const currentEnv = process.env.NODE_ENV as Environment;

  // if()
  // createMiddleware(routing);

  if (
    currentEnv === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get("host")}${request.nextUrl.pathname}`,
      301
    );
  }

  const path = request.nextUrl.pathname;

  if (
    authPathsScopes.some(
      (authPath) => path.startsWith(authPath) || path.endsWith(authPath)
    )
  ) {
    return authMiddleware(request, event);
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
