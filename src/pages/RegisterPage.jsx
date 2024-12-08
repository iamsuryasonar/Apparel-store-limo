import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { register } from '../store/slices/authSlice'
import useScrollToTop from '../hooks/useScrollToTop'
import ButtonBnW from '../components/ButtonBnW'

function RegisterPage() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!input?.firstName) {
            newErrors.firstName = 'First name is required';
        }
        if (!input?.lastName) {
            newErrors.lastName = 'Last name is required';
        }
        if (!input?.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(input?.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!input?.password) {
            newErrors.password = 'Password is required';
        } else if (input?.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerHandler = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(register(input)).unwrap();
        }
    };

    useScrollToTop()

    return (<>
        <div className="max-w-md w-full p-4 flex flex-col items-center justify-center gap-3">
            <h1 className="font-bold text-xl font-raleway">Sign Up</h1>
            <div className="w-full flex flex-col justify-center items-center">
                <form className="w-full flex flex-col gap-3 font-light ">
                    <div>
                        <label htmlFor="firstName" className="text-sm text-slate-500">First Name</label>
                        <input
                            id='firstName'
                            onChange={onChangeHandler}
                            name='firstName'
                            type="text"
                            placeholder='eg. John'
                            className={`p-1 border-[1px] rounded-md border-slate-200 w-full placeholder:p-2 ${errors.firstName && 'border-red-500'}`}
                        />
                    </div>
                    {errors.firstName && <p aria-live='polite' className="text-red-500">{errors.firstName}</p>}
                    <div>
                        <label htmlFor="lastName" className="text-sm text-slate-500">Last Name</label>
                        <input
                            id="lastName"
                            onChange={onChangeHandler}
                            name='lastName'
                            type="text"
                            placeholder='eg. Doe'
                            className={`p-1 border-[1px] rounded-md border-slate-200 w-full placeholder:p-2 ${errors.lastName && 'border-red-500'}`}
                        />
                    </div>
                    {errors.lastName && <p aria-live='polite' className="text-red-500">{errors.lastName}</p>}
                    <div>
                        <label htmlFor="email" className="text-sm text-slate-500">Email</label>
                        <input
                            id='email'
                            onChange={onChangeHandler}
                            name='email'
                            type="email"
                            placeholder='eg. me@example.com'
                            className={`p-1 border-[1px] rounded-md border-slate-200 w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
                        />
                    </div>
                    {errors.email && <p aria-live='polite' className="text-red-500">{errors.email}</p>}
                    <div>
                        <label htmlFor="password" className="text-sm text-slate-500">Password</label>
                        <div className='relative flex  flex-col justify-center'>
                            <input
                                id='password'
                                onChange={onChangeHandler}
                                autoComplete="off"
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='eg. akshjdf9678werjh'
                                className={`w-full p-1 pr-8 border-[1px] rounded-md border-slate-200 placeholder:p-2 ${errors.password && 'border-red-500'}`}
                            />
                            <FontAwesomeIcon className='absolute right-2 text-slate-500' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
                        </div>
                    </div>
                    {errors.password && <p aria-live='polite' className="text-red-500">{errors.password}</p>}
                </form>
            </div>
            <div className="w-full flex self-start items-center gap-4">
                <ButtonBnW dark={true} onClick={registerHandler}>Sign up</ButtonBnW>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <p className="font-thin text-md font-raleway">
                    Have an account?
                </p>
                <Link to="/sign-in" className="border-[1px] border-black hover:bg-black hover:text-white rounded-full w-full p-1 text-center">
                    Sign in
                </Link>
            </div>
        </div>
    </>)
}

export default RegisterPage;
