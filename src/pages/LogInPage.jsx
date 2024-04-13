import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BottomAlert from '../components/BottomAlert'
import { login } from "../store/slices/authSlice";
import { clearMessage } from "../store/slices/messageSlice";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LogInPage() {
  const navigate = useNavigate();
  let { state } = useLocation();

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const [input, setInput] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!input.email || !input.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!input.password || !input.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (input.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const logInHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(login(input))
        .unwrap()
        .then(() => {
          if (state && state?.type === 'ADD_TO_CART' && state?.productId) {
            navigate(`/product/${state?.productId}`, {
              state: state,
            })
          } else {
            navigate("/shop");
          }
        })
    };
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
      <div className="max-w-2xl w-full p-4 flex flex-col items-start gap-4 mt-10">
        <h1 className="font-extrabold text-5xl font-raleway">Login</h1>
        <p className="font-thin text-md font-raleway">
          Don't have an account?
          <Link to="/sign-up" className="underline px-1">
            Sign up here
          </Link>
        </p>
        <div className="w-full flex flex-col justify-center items-center">
          <form className="w-full flex flex-col gap-4 font-light">
            <input
              onChange={onChangeHandler}
              name="email"
              type="email"
              placeholder="Email"
              className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <div className='relative flex flex-col justify-center'>
              <input
                onChange={onChangeHandler}
                name="password"
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`p-1 pr-8 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.password && 'border-red-500'}`}
              />
              <FontAwesomeIcon className='absolute right-2' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </form>

        </div>
        <div className="flex flex-col w-full md:flex-row justify-between">
          <button
            onClick={logInHandler}
            className="px-6 py-2 bg-black text-white font-light"
          >
            Sign In
          </button>
          <div className="mt-2 md:mt-0 flex flex-row justify-between items-center gap-2">
            <Link to="/" className="underline font-light self-center text-sm">
              Return to store
            </Link>
            <div className="flex flex-col gap-6 font-light ">
              <a href="" className="underline font-light text-sm self-center">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
      </div>
      {message && <BottomAlert message={message} />}
    </>
  );
}

export default LogInPage;
