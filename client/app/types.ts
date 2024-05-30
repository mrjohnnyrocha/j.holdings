// types.ts
export interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
  }
  