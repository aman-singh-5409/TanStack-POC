import { useQueries } from "@tanstack/react-query";
import { api } from "../api/apiClient";
import { User } from "../types/User";
import Loader from "../components/Loader";

const Queries = () => {
  const userIds = Array.from({ length: 100 }, (_, i) => i + 1);

  const getUserById = async (id: number) => {
    try {
      const res = await api.get<User>(`/users/${id}`);

      if (res.status === 200) {
        return res.data;
      }

      throw new Error("Failed to fetch user");
    } catch (error) {
      throw error;
    }
  };

  const userQueries = useQueries({
    queries: userIds.map((id) => {
      return {
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
      };
    }),
  });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">List Of Users</h1>
      <div className="w-full flex-1 overflow-auto">
        {userQueries[0].isFetching || userQueries[0].isPending ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            {userQueries?.map((userData) => (
              <UserCard user={userData.data!} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Queries;

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-2 bg-[#222] rounded-xl">
      <img src={user?.image} loading="eager" alt="profileImg" />
      <div className="">
        <h1 className="text-lg font-semibold">{user?.firstName}</h1>
        <p className="text-sm font-thin">Email: {user?.email}</p>

        <p>Card No: {user?.bank.cardNumber}</p>
        <p>Card Exp: {user?.bank.cardExpire}</p>
      </div>
    </div>
  );
};
