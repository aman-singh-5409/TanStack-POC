import { useQuery } from "@tanstack/react-query";
import { api } from "../api/apiClient";
import { User } from "../types/User";
import { FetchCartsRes } from "../types/Carts";
import { getRandomColor } from "../utils/colors";
import Loader from "../components/Loader";

const DependentQuery = () => {
  const userId = "6";

  const getUserById = async (id: string) => {
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

  const getUserCarts = async (id: string) => {
    try {
      const res = await api.get<FetchCartsRes>(`/users/${id}/carts`);

      if (res.status === 200) {
        return res.data.carts;
      }

      throw new Error("Failed to fetch user");
    } catch (error) {
      throw error;
    }
  };

  const { data: user, isFetching: userFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const { data: carts, isFetching: cartFetching } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getUserCarts(userId),
    enabled: !!user,
  });

  console.log({ user, carts });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">User Carts</h1>
      <div className="flex items-center gap-4">
        {userFetching && (
          <div
            className="py-1 px-2 rounded-full w-max text-black text-xs font-semibold border-2 border-black"
            style={{ backgroundColor: getRandomColor() }}
          >
            Fetching User
          </div>
        )}
        {cartFetching && (
          <div
            className="py-1 px-2 rounded-full w-max text-black text-xs font-semibold border-2 border-black"
            style={{ backgroundColor: getRandomColor() }}
          >
            Fetching Cart
          </div>
        )}
      </div>
      <div className="w-full flex-1 flex flex-col gap-4">
        {userFetching || cartFetching ? (
          <Loader />
        ) : (
          <>
            <div className="flex items-center gap-2 bg-[#222] rounded-xl">
              <img src={user?.image} alt="profileImg" />
              <div className="">
                <h1 className="text-lg font-semibold">{user?.firstName}</h1>
                <p className="text-sm font-thin">Email: {user?.email}</p>

                <p>Card No: {user?.bank.cardNumber}</p>
                <p>Card Exp: {user?.bank.cardExpire}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Cart Items</h1>
              {carts?.[0].products.map((cartProduct) => (
                <div className="bg-[#222] flex-1 rounded-xl p-4 flex flex-col gap-4">
                  <p className="text-sm font-bold">
                    {cartProduct.id}. {cartProduct.title}
                  </p>
                  <div className="flex items-center gap-5">
                    <div
                      className="border-2 border-black p-2 rounded-xl font-bold text-black"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      Price: {cartProduct.price}
                    </div>
                    <div
                      className="border-2 border-black p-2 rounded-xl font-bold text-black"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      Quantity: {cartProduct.quantity}
                    </div>
                    <div
                      className="border-2 border-black p-2 rounded-xl font-bold text-black"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      Total: {cartProduct.total}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DependentQuery;
