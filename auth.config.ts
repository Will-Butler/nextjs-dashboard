import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  //user will be redirected to our custom login page 
  //rather than nextauth.js default page
  pages: {
    signIn: '/login', 
  },
  //prevent users from accessing dashboard unless logged in
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        console.log("On Dash")
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("Logged In!")
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      console.log("not on dash or logged in")
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
