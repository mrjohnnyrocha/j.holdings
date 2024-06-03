import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }

  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
