import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  // publicRoutes: ["/", "/api/dataHeaderAntrol", "/api/dataHeaderVclaim"],
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
    "/(api|trpc)(.*)",
    // "/(api|trpc)/(:path*)",
  ],
};

// export function middleware() {
//   // retrieve the current response
//   const res = NextResponse.next();

//   // add the CORS headers to the response
//   res.headers.append("Access-Control-Allow-Credentials", "true");
//   res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
//   res.headers.append(
//     "Access-Control-Allow-Methods",
//     "GET,DELETE,PATCH,POST,PUT"
//   );
//   res.headers.append(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );

//   return res;
// }

// specify the path regex to apply the middleware to
// export const config = {
//   matcher: '/api/:path*',
// }
