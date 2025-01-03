function CategoryShimmer() {
    return <>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                return <div key={i} className="aspect-square w-full h-full">
                    <div className="relative w-full h-full bg-gray-100 animate-pulse ">
                        <div className="w-full h-full flex flex-col gap-1 ">
                            <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                                <div className="bg-gray-200 w-24 h-8 "></div>
                            </div>
                        </div>
                    </div>
                </div>
            })
        }
    </>
}

export default CategoryShimmer;
