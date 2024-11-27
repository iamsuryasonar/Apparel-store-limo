import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ContactUsServices from '../services/contactUs.services'
import { setMessage, clearMessage } from '../store/slices/messageSlice'
import useScrollToTop from '../hooks/useScrollToTop'
import Button from '../components/Button';

const OPTIONS = [
    {
        id: 1,
        value: 'Business Inquiry',
        title: 'Business Inquiry',
    },
    {
        id: 2,
        value: 'General Inquiry',
        title: 'General Inquiry',
    },
    {
        id: 3,
        value: 'Bulk Orders',
        title: 'Bulk Orders',
    },
    {
        id: 4,
        value: 'Order Tracking',
        title: 'Order Tracking',
    },
    {
        id: 5,
        value: 'Returns and Refunds',
        title: 'Returns and Refunds',
    },
    {
        id: 6,
        value: 'Feedback',
        title: 'Feedback',
    },
]


function ContactPage() {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        query: 'Business Inquiry',
    });


    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }

        if (Object.keys(errors).length === 0) {
            await ContactUsServices.sendEmail(formData);
            dispatch(setMessage('Email sent...'))

            setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);

            setFormData({
                name: '',
                email: '',
                message: '',
                query: 'Business Inquiry',
            });
        } else {
            setErrors(errors);
        }
    };

    useScrollToTop()

    return (
        <>
            <div className="max-w-6xl w-full flex flex-col items-center">
                <div className="w-5/6 h-[8rem] md:h-[12rem] my-10 flex flex-col justify-start md:flex-row md:justify-between md:items-center  gap-6">
                    <div className="flex flex-col justify-center items-start ">
                        <p className="font-light">EMAIL US</p>
                        <p className="font-bold"> customercare@limostore.in</p>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <p className="font-light">REACH US</p>
                        <p className="font-bold">LIMO STORE</p>
                        <p>NOONMATI, GANESH MANDIR PATH</p>
                        <p>GUWAHATI, ASSAM - 781002, INDIA</p>
                    </div>
                </div>
                <div className="w-5/6 md:h-[4rem] my-4 flex flex-col justify-start md:flex-row md:justify-between md:items-center  gap-6">
                    <div className="flex flex-col justify-center items-start ">
                        <p className="font-light">WHATSAPP US</p>
                        <p className="font-bold">+91-99999-99999</p>
                    </div>
                </div>
                <div className="w-5/6 my-10 flex flex-col items-center gap-6">
                    <form className="w-11/12 md:w-4/6 flex flex-col gap-6 font-light ">
                        <input
                            onChange={onChangeHandler}
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.name && 'border-red-500'}`}
                            value={formData.name}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                        <input
                            onChange={onChangeHandler}
                            type="text"
                            name="email"
                            placeholder="Email"
                            className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.email && 'border-red-500'}`}
                            value={formData.email}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <textarea
                            onChange={onChangeHandler}
                            type="text"
                            name="message"
                            placeholder="Message"
                            className={`p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 ${errors.message && 'border-red-500'}`}
                            value={formData.message}
                        />
                        {errors.message && <p className="text-red-500">{errors.message}</p>}
                        <div className="flex flex-col justify-start">
                            <p className="py-2">Optional</p>
                            <label>Select Query type</label>
                            <select onChange={onChangeHandler} name="query" className="border-[1px] rounded-sm border-black font-light p-1 bg-white">
                                {
                                    OPTIONS.map((item) => {
                                        return <option key={item.id} className="font-light" value={item.value}>{item.title}</option>
                                    })
                                }
                            </select>
                        </div>
                        <Button onClick={handleFormSubmit}>SEND</Button>
                    </form>

                </div >
            </div >
        </>
    )
}

export default ContactPage;