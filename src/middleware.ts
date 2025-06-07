import { NextFetchEvent, NextResponse } from "next/server";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intMiddleware = createMiddleware(routing);

type Environment = "production" | "development" | "other";

const authMiddleware = withAuth({
  pages: {
    signIn: "/en/auth/sign-in",
  },
});

const authPathsScopes = ["profile", "citas", "documents", "necesarios"];

async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  const intlResponse = intMiddleware(request);

  // if (
  //   authPathsScopes.some(
  //     (authPath) => path.startsWith(authPath) || path.endsWith(authPath)
  //   )
  // ) {
  //   const newUrl = request.nextUrl.clone();
  //   newUrl.pathname = `/en/auth/sign-in/`;

  //   return NextResponse.redirect(newUrl);
  // }

  return intlResponse;
}

export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|auth|.*\\..*).*)",
  ],
};
