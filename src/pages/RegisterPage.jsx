import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { register } from '../store/slices/authSlice'
import useScrollToTop from '../hooks/useScrollToTop'
import Button from '../components/Button';

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
        <div className="max-w-2xl w-full p-4 flex flex-col items-start gap-4 mt-10">
            <h1 className="font-extrabold text-5xl font-raleway">Sign Up</h1>
            <p className="font-light text-md">Have an account? <Link to='/sign-in' className="underline">Sign in here</Link></p>
            <div className="w-full flex flex-col justify-center items-center">
                <form className="w-full flex flex-col gap-4 font-light ">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id='firstName'
                            onChange={onChangeHandler}
                            name='firstName'
                            type="text"
                            placeholder='eg. John'
                            className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.firstName && 'border-red-500'}`}
                        />
                    </div>
                    {errors.firstName && <p aria-live='polite' className="text-red-500">{errors.firstName}</p>}
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            onChange={onChangeHandler}
                            name='lastName'
                            type="text"
                            placeholder='eg. Doe'
                            className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.lastName && 'border-red-500'}`}
                        />
                    </div>
                    {errors.lastName && <p aria-live='polite' className="text-red-500">{errors.lastName}</p>}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id='email'
                            onChange={onChangeHandler}
                            name='email'
                            type="email"
                            placeholder='eg. me@example.com'
                            className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
                        />
                    </div>
                    {errors.email && <p aria-live='polite' className="text-red-500">{errors.email}</p>}
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className='relative flex  flex-col justify-center'>
                            <input
                                id='password'
                                onChange={onChangeHandler}
                                autoComplete="off"
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='eg. akshjdf9678werjh'
                                className={`w-full p-1 pr-8 border-[1px] rounded-sm border-black placeholder:p-2 ${errors.password && 'border-red-500'}`}
                            />
                            <FontAwesomeIcon className='absolute right-2' onClick={() => { setShowPassword(!showPassword) }} icon={showPassword ? faEye : faEyeSlash} />
                        </div>
                    </div>
                    {errors.password && <p aria-live='polite' className="text-red-500">{errors.password}</p>}
                </form>
            </div>
            <div className="flex self-start items-center gap-4">
                <Button className='place-self-end' onClick={registerHandler}>Sign up</Button>
            </div>
        </div>
    </>)
}

export default RegisterPage;
