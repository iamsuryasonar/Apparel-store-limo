import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BottomAlert from '../components/BottomAlert'
import { register } from '../store/slices/authSlice'
import { clearMessage, setMessage } from '../store/slices/messageSlice'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function RegisterPage() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({});
    const { message } = useSelector((state) => state.message);
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const registerHandler = (e) => {
        e.preventDefault();

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!input?.firstName) {
            dispatch(setMessage('First name is required'));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);
            return;
        }
        if (!input?.lastName) {
            dispatch(setMessage('Last name is required'));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);
            return;
        }
        if (!emailRegex.test(input?.email)) {
            dispatch(setMessage('Please enter a valid email address'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);
            return;
        }
        if (input?.password === '' || input.password === undefined || input?.password?.length < 6) {
            dispatch(setMessage('Password must be at least 6 characters long'));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);
            return;
        }

        dispatch(register(input))
            .unwrap()
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (<>
        <div className="max-w-2xl w-full p-4 flex flex-col items-start gap-4 mt-10">
            <h1 className="font-extrabold text-5xl font-raleway">Sign Up</h1>
            <p className="font-light text-md">Have an account? <Link to='/sign-in' className="underline">Sign in here</Link></p>
            <div className="w-full flex flex-col justify-center items-center">
                <form className="w-full flex flex-col gap-4 font-light ">
                    <input onChange={onChangeHandler} name='firstName' type="text" placeholder='First Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onChangeHandler} name='lastName' type="text" placeholder='Last Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onChangeHandler} name='email' type="email" placeholder='Email' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <div className='relative flex  flex-col justify-center'>
                        <input onChange={onChangeHandler} autoComplete="off" name='password' type={showPassword ? 'text' : 'password'} placeholder='Pasword' className=" w-full p-1 pr-8 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                        <FontAwesomeIcon className='absolute right-2' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
                    </div>
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