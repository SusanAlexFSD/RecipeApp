import { clerkMiddleware } from "@clerk/nextjs/server";

export const middleware = clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|webp|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};