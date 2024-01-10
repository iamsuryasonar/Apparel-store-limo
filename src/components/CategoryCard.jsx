function CategoryCard() {
    return (
        <>
            <div className="relative">
                <img src='https://cdn.shopify.com/s/files/1/0551/6869/6420/files/lama-co-ords.png?v=1702552705' />
                <div className="absolute left-4 bottom-4">
                    <h1 className="text-2xl  text-white sm:text-3xl">CO-ORDS</h1>
                    <div className="p-2 bg-white">
                        <p className="font-thin text-center text-base sm:text-xl">SHOP NOW</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCard;