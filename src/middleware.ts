import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", '/api/uploadthing'],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", ],
};
