import axios from "axios";
import logo from "../../assets/logo-qover_v-white.svg";
import { useState, useEffect, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import LoginProps from "../../interfaces/loginProps";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.user) {
      navigate("/");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = () => {
    axios
      .post<LoginProps>(`http://localhost:3001/authentication/login` || "", {
        email,
        password,
        rememberMe
      })
      .then((response) => {
        setLoginStatus("");
        navigate("/");

        /* eslint-disable @typescript-eslint/no-unsafe-argument*/
        window.localStorage.setItem("user", response?.data.accessToken);
      })
      .catch((reason) => {
        setLoginStatus("Unable to authenticate. Please try again.");
        console.log(reason);
      });
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-300 flex flex-grow justify-center sm:py-9">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <img className="mx-auto h-28 my-8" src={logo} alt="Qover" />
        <div className="bg-white shadow-xl w-full rounded-lg divide-y divide-gray-200">
          <h1 className="text-center p-5 text-blue-400 font-semibold text-xl">
            Welcome to{" "}
            <span className="animate-pulse text-blue-600"> Qover </span>
          </h1>
          <div className="px-5 py-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-500 pb-1 block"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="border border-t-0 cursor-text border-l-0 border-r-0 px-3 py-2 mt-1 mb-5 text-sm w-full"
                onChange={(e) => {
                  setLoginStatus("");
                  setEmail(e.target.value);
                }}
                required
              />
              <label
                htmlFor="password"
                className="font-semibold text-sm text-gray-500 pb-1 block"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="border border-t-0 cursor-text border-l-0 border-r-0 px-3 py-2 mt-1 mb-5 text-sm w-full"
                onChange={(e) => {
                  setLoginStatus("");
                  setPassword(e.target.value);
                }}
                required
              />
              <h2 className="text-red-600 font-normal text-center animate-bounce text-sm">
                {loginStatus}
              </h2>
              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <div
                      className="transition duration-200 py-4 font-normal text-sm rounded-lg text-gray-500 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <span>
                        <input
                          type="checkbox"
                          className="rounded-lg cursor-pointer"
                          onChange={(e) => setRememberMe(e.target.value)}
                        />
                      </span>
                      <span className="inline-block ml-1">Remember me</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-right  whitespace-nowrap">
                    <div
                      className="transition duration-200 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <span className="inline-block ml-1">
                        Forgot your password?
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="cursor-pointer drop-shadow-md transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 duration-300 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="text-center">Sign in to your account</span>
              </button>
            </form>
          </div>
        </div>
        <div className="py-5">
          <div>
            <div className="text-center sm:text-left whitespace-nowrap">
              <button
                className="border transition duration-200 mx-auto px-5 py-4 cursor-pointer font-normal text-sm rounded-sm text-white hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ring-inset">
                <span className="inline-block mx-11">
                  Dont have an account?
                  <u>
                    <strong>Ask for access</strong>
                  </u>
                  .
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
