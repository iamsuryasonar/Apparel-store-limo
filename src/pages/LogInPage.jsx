import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useScrollToTop from '../hooks/useScrollToTop'

function LogInPage() {
  const navigate = useNavigate();
  let { state } = useLocation();

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    console.log(input)
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

  function handleAutoFillGuestCreds() {
    setInput({
      email: 'guest@gmail.com',
      password: 'sadfasfhjt65fsd',
    })
  }

  useScrollToTop()

  return (
    <>
      <div className="max-w-2xl w-full p-4 flex flex-col items-start gap-4 mt-10">
        <h1 className="font-extrabold text-5xl font-raleway">Log in</h1>
        <p className="font-thin text-md font-raleway">
          Don't have an account?
          <Link to="/sign-up" className="underline px-1">
            Sign up here
          </Link>
        </p>
        <div className="w-full flex flex-col justify-center items-center">
          <form className="w-full flex flex-col gap-4 font-light">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id='email'
                onChange={onChangeHandler}
                name="email"
                type="email"
                value={input.email}
                placeholder="eg. me@example.com"
                className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <div>
              <label htmlFor="password">Password</label>
              <div className='relative flex flex-col justify-center'>
                <input
                  id='password'
                  onChange={onChangeHandler}
                  name="password"
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  value={input.password}
                  placeholder="eg. skajdfhgb87dfsa9"
                  className={`p-1 pr-8 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.password && 'border-red-500'}`}
                />
                <FontAwesomeIcon className='absolute right-2' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
              </div>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </form>

        </div>
        <div className="flex flex-col w-full md:flex-row justify-between">
          <button
            onClick={logInHandler}
            className="px-6 py-2 bg-black text-white font-light"
          >
            Log in
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
        <button
          className="bg-slate-950 text-white px-2 py-1 place-self-end"
          onClick={handleAutoFillGuestCreds}>Auto fill guest credentials
        </button>
      </div>
    </>
  );
}

export default LogInPage;
