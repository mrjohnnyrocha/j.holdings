import { Session } from "next-auth";

interface GenerateChatIdParams {
  session: Session | null;
  tab: string;
}

export const generateChatId = ({ session, tab }: GenerateChatIdParams): string => {
  const timestamp = Date.now();
  const userId = session?.user?.email || "guest";
  return `${userId}_${tab}_${timestamp}`;
};
