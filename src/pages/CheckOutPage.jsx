import { useState, useMemo, useEffect } from 'react';
import razorpay from '../assets/logos/razorpay.png'
import visa from '../assets/logos/visa.png'
import mastercard from '../assets/logos/mastercard.png'
import upi from '../assets/logos/upi.png'
import next_page_svg from '../assets/next_page.svg'
import AddAddressForm from '../components/AddAddressForm'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import AddressService from '../services/address.services'
import PaymentServices from '../services/payment.services'
import { get_all_cart_items } from '../store/slices/cartSlice';

function CheckOutPage() {
    let { state } = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);
    const [addressFormVisible, setAddressFormVisible] = useState(false)
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [creatingOrder, setCreatingOrder] = useState(false);

    const totalPrice = useMemo(() => {
        return state?.reduce((acc, item) => {
            return acc + item?.sizevariant?.selling_price * item?.quantity;
        }, 0);
    }, [state]);

    const getAddresses = async () => {
        const result = await AddressService.getAllAddresses();
        setAddresses(result);
    }

    useEffect(() => {
        getAddresses()
    }, [])

    const checkOutHandler = async (e) => {
        setProcessingPayment(true);
        let order = await PaymentServices.orderPayment();
        let options = {
            "key": import.meta.env.VITE_KEY,
            "amount": order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Limo store",
            "description": "Test Transaction",
            "image": "https://ipfs.filebase.io/ipfs/QmZzZG2hQxTStym74yhoye5CzYY9Z4NJ8FJQapVmNttsdk",
            "order_id": order?.id,
            "remember_customer": false,

            "modal": {
                ondismiss: async function () {
                    setProcessingPayment(false);
                    setCreatingOrder(false);
                },
            },
            "handler": async function (response) {
                setCreatingOrder(true);
                const res = await PaymentServices.validatePayment({
                    addressId: addresses[selectedAddress]?._id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                });

                dispatch(get_all_cart_items());

                if (res.code == 200 || res.code == 201) {
                    navigate(`/order-placed?order_id=${response.razorpay_order_id}`)
                }
            },
            "theme": {
                "color": "#20E8F4"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.reason);
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }

    return <>
        {
            !processingPayment && !creatingOrder && <div className="max-w-7xl m-4 w-full flex flex-col md:flex-row gap-4">
                <div className='w-full flex flex-col gap-2'>
                    <div className="flex flex-col items-start ">
                        <p>Account</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="w-full h-[1px] bg-black"></div>
                    <div className="flex flex-row justify-between">
                        <p>Delivery</p>
                        <p onClick={() => setAddressFormVisible(true)} className="cursor-pointer text-blue-500">Add new address...</p>
                    </div>

                    {addressFormVisible &&
                        <AddAddressForm setAddressFormVisible={setAddressFormVisible} />
                    }

                    {addresses &&
                        <div className='flex flex-col bg-slate-50 p-2 rounded-sm'>
                            <p>{addresses[selectedAddress]?.name}, {addresses[selectedAddress]?.contact_number}, {addresses[selectedAddress]?.pin}, {addresses[selectedAddress]?.city}, {addresses[selectedAddress]?.state}, {addresses[selectedAddress]?.country}...</p>
                        </div>
                    }

                    {addresses &&
                        <p onClick={() => {
                            setShowAllAddresses(!showAllAddresses);
                        }} className={`text-blue-500 ${showAllAddresses ? 'text-red-400' : ''} underline underline-offset-2 cursor-pointer`}>select from addresses...</p>
                    }

                    {showAllAddresses &&
                        <div className='flex flex-col gap-2'>
                            {addresses?.map((address, index) => {
                                return <div key={address?._id} onClick={() => {
                                    setSelectedAddress(index)
                                    setShowAllAddresses(false)
                                }} className='bg-slate-50 p-2 rounded-sm cursor-pointer' > {console.log(address)}
                                    <p> {address?.name}, {address?.contact_number}, {address?.pin}, {address?.city}, {address?.state}, {address?.country}...</p>
                                </div>
                            })}
                        </div >
                    }

                    <div className="w-full h-[1px] bg-black"></div>
                    <p>Payment</p>
                    <div className=' bg-slate-100'>
                        <div className='flex flex-row p-2 border border-black'>
                            <p>Cards,UPI,Internet Banking</p>
                            <div className='flex flex-row gap-2'>
                                <div className='w-8 h-6 bg-slate-50 grid place-content-center'><img className='' src={razorpay} /></div>
                                <div className='w-8 h-6 bg-slate-50 grid place-content-center'><img className='' src={upi} /></div>
                                <div className='w-8 h-6 bg-slate-50 grid place-content-center'><img className='' src={visa} /></div>
                                <div className='w-8 h-6 bg-slate-50 grid place-content-center'><img className='' src={mastercard} /></div>
                            </div>
                        </div>
                        <div className='border p-2 flex flex-col items-center justify-center'>
                            <img src={next_page_svg} className='w-1/3' />
                            <p className='text-xs text-center'>
                                After clicking “Pay now”, you will be redirected to Cards, UPI, NB, Wallets, BNPL by PayU India to complete your purchase securely.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2 bg-slate-50 p-4'>
                    <p>Order summary</p>
                    <div className='flex flex-col gap-2 '>
                        {state?.map((item) => {
                            return (
                                <div key={item._id} className=' flex flex-row justify-between p-2 gap-2 '>
                                    <div className='relative w-32'>
                                        <img className=' aspect-square' src={item?.colorvariant.images[0].url}></img>
                                        <p className='absolute w-6 text-center top-0 right-0 rounded-full bg-black text-white'>{item?.quantity}</p>
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <p>{item?.product?.name}</p>
                                        <p>size: {item?.sizevariant?.name}</p>
                                    </div>
                                    <p className=''>Rs. {item?.sizevariant?.selling_price}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className='flex flex-row gap-2'>
                        <input
                            value=''
                            onChange={() => { }}
                            name="coupon"
                            type="text"
                            placeholder="Discount Code"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <button className='px-4 py-2 bg-black text-white'>Apply</button>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Total</p>
                        <p>Rs. {totalPrice}</p>
                    </div>
                    <button onClick={checkOutHandler} className='w-full px-4 py-2 bg-black text-white'>Pay now</button>
                </div>
            </div >
        }
        {
            processingPayment && <div className='fixed top-0 bottom-0 right-0 left-0  bg-white z-50 flex flex-col justify-center items-center overflow-y-hidden'>
                <div className='flex flex-col items-center gap-4'>
                    <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
                    <div className='flex flex-col items-center'>
                        <p className='text-slate-800 font-bold text-2xl'>Processing payment...</p>
                        <p>This may take a few seconds, please don't close this page.</p>
                    </div>
                </div>
            </div>
        }
        {
            creatingOrder && <div className='fixed top-0 bottom-0 right-0 left-0  bg-white z-50 flex flex-col justify-center items-center overflow-y-hidden'>
                <div className='flex flex-col items-center gap-4'>
                    <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
                    <div className='flex flex-col items-center'>
                        <p className='text-slate-800 font-bold text-2xl'>Validating payment & placing order...</p>
                        <p>This may take a few seconds, please don't close this page.</p>
                    </div>
                </div>
            </div>
        }
    </>
}
export default CheckOutPage;

