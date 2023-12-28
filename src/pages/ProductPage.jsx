function ProductPage() {
    return <>
        <div className="flex">
            <div className="p-4 w-full">
                <div className="aspect-square">
                    <img className="object-cover w-full h-full" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                </div>
                <div className=" py-4 flex flex-row gap-4">
                    <div className="aspect-square">
                        <img className="object-cover w-[200px] h-[200px]" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>
                    <div className="aspect-square">
                        <img className="object-cover w-[200px] h-[200px]" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>
                    <div className="aspect-square">
                        <img className="object-cover w-[200px] h-[200px]" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>
                    <div className="aspect-square">
                        <img className="object-cover w-[200px] h-[200px]" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <p>TOO COOL PURPLE COORDS - SHORTS & TEES SET</p>
                <p>$3,798.00</p>
                <div className="flex gap-2">
                    <div className="w-10 h-10 p-4 rounded-full bg-red-400"></div>
                    <div className="w-10 h-10 p-4 rounded-full bg-green-400"></div>
                    <div className="w-10 h-10 p-4 rounded-full bg-yellow-400"></div>
                    <div className="w-10 h-10 p-4 rounded-full bg-cyan-400"></div>
                </div>
                <div>SELECT SIZE</div>
                <div className="flex gap-2">
                    <button className="p-2 bg-black text-white">XS</button>
                    <button className="p-2 bg-black text-white">S</button>
                    <button className="p-2 bg-black text-white" >M</button>
                    <button className="p-2 bg-black text-white">L</button>
                    <button className="p-2 bg-black text-white">XL</button>
                    <button className="p-2 bg-black text-white">XXL</button>
                </div>
                <button className="py-2 px-4 bg-black text-white">ADD TO CART</button>
            </div>

        </div>
    </>
}
export default ProductPage;