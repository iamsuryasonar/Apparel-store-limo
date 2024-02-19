import { Link } from 'react-router-dom'

function OrderPlacedPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    return <div className="max-w-6xl flex flex-col justify-center items-center">
        <div className="bg-slate-50 px-6 py-20 m-4 shadow-xl flex flex-col justify-center items-center gap-4 rounded-md">
            <div className="w-full h-[1px] bg-black"></div>
            <p>Thank you for your order</p>
            <div className="bg-green-200 p-4 flex flex-col justify-center items-center">
                <p>ORDER CONFIRMATION</p>
                <p>Your order #{orderId} has been sucessfully placed!</p>
                <p>Thank you for choosing Limo store. You will shortly receive a confirmation email.</p>
            </div>
            <Link to='/shop' className='px-4 py-2 text-black border'>Back to shop</Link>
        </div>
    </div>
}

export default OrderPlacedPage;