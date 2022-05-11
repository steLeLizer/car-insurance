import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import wrongWay from "../../assets/wrong-way.png";

const NotFound: FunctionComponent = () => {
  return (
    <div className="h-full mx-auto mt-52">
      <img
        className="w-52 md:animate-bounce mb-3"
        src={wrongWay}
        alt="Wrong way"
      />
      <button
        className="transition ease-in-out ml-8 delay-150 p-3 rounded-md drop-shadow-xl bg-white text-blue-500 text-lg hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300">
        <Link to="/">Go back home</Link>
      </button>
    </div>
  );
};

export default NotFound;
