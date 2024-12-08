import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useScrollToTop from '../hooks/useScrollToTop'
import Button from '../components/Button';
import ButtonBnW from "../components/ButtonBnW";

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
      <div className="max-w-md w-full p-4 flex flex-col items-center justify-center gap-3">
        <h1 className="font-bold text-xl font-raleway">Log in</h1>
        <div className="w-full flex flex-col justify-center items-center">
          <form className="w-full flex flex-col gap-3 font-light">
            <div>
              <label htmlFor="email" className="text-sm text-slate-500">Email</label>
              <input
                id='email'
                onChange={onChangeHandler}
                name="email"
                type="email"
                value={input.email}
                placeholder="eg. me@example.com"
                className={`p-1 border-[1px] rounded-md border-slate-200 w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <div>
              <label htmlFor="password" className="text-sm text-slate-500">Password</label>
              <div className='relative flex flex-col justify-center'>
                <input
                  id='password'
                  onChange={onChangeHandler}
                  name="password"
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  value={input.password}
                  placeholder="eg. skajdfhgb87dfsa9"
                  className={`p-1 pr-8 border-[1px] rounded-md border-slate-200 w-full placeholder:p-2 ${errors.password && 'border-red-500'}`}
                />
                <FontAwesomeIcon className='absolute right-2 text-slate-500' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
              </div>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </form>
        </div>
        <div className="flex flex-col w-full justify-between gap-2">
          <ButtonBnW dark={true} onClick={logInHandler}>Log in</ButtonBnW>
          <div className="flex flex-col justify-between items-end gap-2">
            <a href="" className="underline font-light text-sm text-black/70 hover:text-[#4ba7d1]">
              Forgot your password
            </a>
            <button className='place-self-end underline font-light text-sm text-black/70 hover:text-[#4ba7d1]' onClick={handleAutoFillGuestCreds}>Auto fill guest credentials</button>
          </div>
        </div>
        <div className="h-[1px] bg-slate-200 w-full"></div>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="font-thin text-md font-raleway">
            Don't have an account?
          </p>
          <Link to="/sign-up" className="border-[1px] border-black hover:border-black hover:bg-black hover:text-white rounded-full w-full p-1 text-center">
            Sign up
          </Link>
        </div>
      </div>

    </>
  );
}

export default LogInPage;
