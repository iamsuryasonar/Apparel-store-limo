import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderShimmer from '../../../components/shimmers/OrderShimmer';
import OrderServices from "../../../services/order.services";

function OrderHistoryComponent() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState(null);

    const getOrders = async () => {
        const results = await OrderServices.getAllOrders();
        setOrders(results);
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <div className="my-4 flex flex-col gap-4">
            <p className="text-5xl font-bold">Order History</p>
            <div className="flex flex-col gap-4">
                {!orders && <OrderShimmer />}
                {orders && orders?.length < 1 && <p>You haven't placed any orders yet.</p>}
                {orders?.map((order) => {
                    return (
                        <div key={order._id} className="flex items-start rounded-md bg-slate-50 p-4 shadow-lg gap-4 cursor-pointer"
                            onClick={() => {
                                const colorVariantId = order?.item?.colorvariant?._id;
                                const sizeVariantId = order?.item?.sizevariant?._id;
                                const productId = order?.item.product._id;

                                navigate(`/product/${order?.item.product._id}`, {
                                    state: { colorVariantId, sizeVariantId, productId }
                                })
                            }}
                        >
                            <div className="w-52  bg-white">
                                <img alt='product' className='aspect-square object-cover' src={order.item.colorvariant.images[0].url}></img>
                            </div>
                            <div className="">
                                <p className="text-xl font-medium">{order.item.product.name}</p>
                                <div className="flex flex-row justify-between">
                                    <p>₹ {order.lockedprice}</p>
                                    <p>size: {order.item.sizevariant.name}</p>
                                    <p>QTY: {order.item.quantity}</p>
                                </div>
                                <p> Total: ₹ {order.totalamount}</p>
                                <p>Address Info</p>
                                <span>{order.name}, </span>
                                <span>{order.contact_number}, </span>
                                <span>{order.house_number}, </span>
                                <span>{order.city}, </span>
                                <span>{order.pin}, </span>
                                <span>{order.state} ...</span>
                                <p className="bg-green-500 px-2 py-1 text-white">{order.status}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OrderHistoryComponent;