"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { BASE_URL } from "@/lib/base-url";

const useCurrentUser = () => {
  // const [user, setUser] = useState<UserType | null>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const getUser = await currentUser();
  //     setUser(getUser);
  //   };

  //   fetchUser();
  // }, []);
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}api/current-user`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
