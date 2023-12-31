
function ProductCart({ title, price }) {
    return <div className="flex flex-col justify-center items-center">
        <div className="aspect-square">
            <img className="object-cover w-full h-full" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
        </div>
        <p className="text-lg">{title}</p>
        <p className="text-lg">${price}</p>
    </div>
}
function CategoryComponent({ categoryName }) {
    
    let title = 'Too Cool Purple - Pants & Tee Set';
    let price = '1222';

    return <div>
        <main className="flex flex-col items-center w-full">
            <div className="w-full">
                <img className="w-screen h-[28rem] object-cover" src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className="w-11/12 ">
                <h1 className="pt-6 place-self-start text-3xl font-bold">{categoryName}</h1>
                <div className="py-6 w-full grid lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCart title={title} price={price} />
                    <ProductCart title={title} price={price} />
                    <ProductCart title={title} price={price} />
                    <ProductCart title={title} price={price} />
                    <ProductCart title={title} price={price} />
                </div>
            </div>
        </main>
    </div >
}
export default CategoryComponent;