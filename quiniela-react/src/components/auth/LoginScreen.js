import React from "react";
import { login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "../../actions/user";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { getCurrentWeek } from "../../actions/currentWeek";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    dispatch(login(email, password))
      .then(() => {
        dispatch(getCurrentWeek());
        dispatch(getUserData()).then(() => {
          Swal.close();
        });
      })
      .catch((error) => {
        Swal.close();
        const message =
          error.length <= 0 ? "Error please try again" : error[0].message;
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <div className="h-screen items-center flex bg-blue-900">
      <div className="w-full content-center items-center flex flex-col">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed"
              type="submit"
              disabled={email.trim().length <= 0 || password.trim().length <= 0}
            >
              Sign In
            </button>
            <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
