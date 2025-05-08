import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../config/axios.config";

const Home = () => {
  const storageKey = "logedn";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // fetch data from API

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axiosinstance.get("users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      return data;
    },
  });
  console.log({ data });
  if (isLoading) return;
  <h3> loding...</h3>;

  return (
    <div className=" max-w-4xl mx-auto p-4">
      {data.todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-3 bg-gray-100 p-3 rounded shadow justify-between"
        >
          {todo.title}
          <div className="flex space-x-5">
            <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">
              Edit
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
