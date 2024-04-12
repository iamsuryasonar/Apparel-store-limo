import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clearMessage } from '../store/slices/messageSlice'
import { register } from '../store/slices/authSlice'
import BottomAlert from '../components/BottomAlert'
import useScrollToTop from '../hooks/useScrollToTop'

function RegisterPage() {

    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);

    const [input, setInput] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

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
        <div className="max-w-2xl w-full p-4 flex flex-col items-start gap-4 mt-10">
            <h1 className="font-extrabold text-5xl font-raleway">Sign Up</h1>
            <p className="font-light text-md">Have an account? <Link to='/sign-in' className="underline">Sign in here</Link></p>
            <div className="w-full flex flex-col justify-center items-center">
                <form className="w-full flex flex-col gap-4 font-light ">
                    <input
                        onChange={onChangeHandler}
                        name='firstName'
                        type="text"
                        placeholder='First Name'
                        className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.firstName && 'border-red-500'}`}
                    />
                    {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                    <input
                        onChange={onChangeHandler}
                        name='lastName'
                        type="text"
                        placeholder='Last Name'
                        className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.lastName && 'border-red-500'}`}
                    />
                    {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                    <input
                        onChange={onChangeHandler}
                        name='email'
                        type="email"
                        placeholder='Email'
                        className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                    <div className='relative flex  flex-col justify-center'>
                        <input
                            onChange={onChangeHandler}
                            autoComplete="off"
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className={`w-full p-1 pr-8 border-[1px] rounded-sm border-black placeholder:p-2 ${errors.password && 'border-red-500'}`}
                        />
                        <FontAwesomeIcon className='absolute right-2' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </form>
            </div>
            <div className="flex self-start items-center gap-4">
                <button onClick={registerHandler} className="px-6 py-2 bg-black text-white font-light">Create</button>
            </div>
        </div>
        {message && <BottomAlert message={message} />}
    </>)
}

export default RegisterPage;
