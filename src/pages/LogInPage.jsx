import { Link } from "react-router-dom";
import { clearMessage } from "../store/slices/messageSlice";
import { login } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { setLoading } from "../store/slices/loadingSlice";

function LogInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.message);
  const [input, setInput] = useState({});

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const logInHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(input))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="max-w-2xl w-full p-4 flex flex-col justify-center items-center gap-4">
        <h1 className="font-extrabold text-5xl font-raleway">Login</h1>
        <p className="font-thin text-md font-raleway">
          Don't have an account?{" "}
          <Link to="/sign-up" className="underline">
            Sign up here
          </Link>
        </p>
        <div className="w-full flex flex-col justify-center items-center">
          <form className="w-full flex flex-col gap-6 font-light ">
            <input
              onChange={onChangeHandler}
              name="email"
              type="email"
              placeholder="Email"
              className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
            ></input>
            <input
              onChange={onChangeHandler}
              name="password"
              type="password"
              placeholder="Pasword"
              className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
            ></input>
          </form>
          <div className="w-full mt-2 flex flex-col gap-6 font-light ">
            <a href="" className="underline font-light text-sm md:self-end">
              Forgot Password
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full md:flex-row justify-between">
          <button
            onClick={logInHandler}
            className="px-6 py-2 bg-black text-white font-light"
          >
            Sign In
          </button>
          <a href="" className="underline font-light self-start text-sm md:self-end">
            Return to store
          </a>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
