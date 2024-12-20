function ProductsShimmer() {
    return <>
        {
            [1, 2, 3, 4, 5, 6].map((i) => {
                return <div key={i} className="flex max-h-[390px] w-full h-full overflow-hidden">
                    <div className="w-full bg-gray-200 animate-pulse ">
                        <div className="w-full flex flex-col gap-1 ">
                            <div className="relative w-full h-64 sm:h-96 bg-gray-300">
                                <div className="bg-gray-400 w-12 h-4 absolute top-1 left-1 rounded-sm"></div>
                            </div>
                            <div className="w-full flex flex-col gap-2 p-2">
                                <div className="w-full h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/3 h-4 bg-gray-300"></div>
                                <div className="w-11/12 h-4 bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            })
        }
    </>
}

export default ProductsShimmer;