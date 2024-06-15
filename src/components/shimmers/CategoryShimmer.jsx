function CategoryShimmer() {
    return <>
        {
            [1, 2, 3, 4].map((i) => {
                return <div key={i} className="aspect-[171/228] w-full h-full">
                    <div className="relative w-full h-full rounded-md bg-gray-300 animate-pulse ">
                        <div className="w-full h-full flex flex-col gap-1 ">
                            <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                                <div className="bg-gray-400 w-32 h-6 "></div>
                                <div className="bg-gray-400 w-24 h-10 "></div>
                            </div>
                        </div>
                    </div>
                </div>
            })
        }
    </>
}

export default CategoryShimmer;
