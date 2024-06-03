// pages/protected.tsx
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Session } from "../types";

interface ProtectedProps {
  session: Session | null;
}

const Protected: React.FC<ProtectedProps> = ({ session }) => {
  if (!session) {
    return <p>Access Denied</p>;
  }
  return <p>Protected content for {session.user.email}</p>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export default Protected;
