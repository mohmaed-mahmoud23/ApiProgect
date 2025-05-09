import { useState } from "react";
import Asuntacketded from "../Hooks/Authenticated";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Home = () => {
  const storageKey = "logedn";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  //handler
  const [isOpen, setIsOpen] = useState(false);

  //

  const TOgelModel = () => {
    setIsOpen((prve) => !prve);
  };

  // fetch data from API
  const { data, isLoading } = Asuntacketded({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  if (isLoading)
    return <h3 className="text-center text-3xl"> Loding.........</h3>;

  return (
    <div className=" max-w-4xl mx-auto p-4">
      {data.todos.length ? (
        data.todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 bg-gray-100 p-3 rounded shadow justify-between"
          >
            {todo.title}
            <div className="flex space-x-5">
              <button
                onClick={TOgelModel}
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3>data not found</h3>
      )}

      <Modal isOpen={isOpen} closeModal={TOgelModel} title=" mohamde">
        <Input placeholder="mohamed" />

        <div className="flex justify-center space-x-5 py-2 my-2 ">
          <Button onClick={TOgelModel}>Cancel</Button>
          <Button>Edite</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
