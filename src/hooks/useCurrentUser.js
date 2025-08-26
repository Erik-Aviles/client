import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useCurrentUser() {
  const { data: session, status } = useSession();
  const {
    data: userDB,
    error,
    isLoading,
  } = useSWR(session ? `/api/users/${session.user.id}` : null, fetcher);

  const user = {
    ...session?.user,
    ...userDB,
  };

  return {
    user,
    isLoading: isLoading,
    error,
    isAuthenticated: status === "authenticated",
  };
}
