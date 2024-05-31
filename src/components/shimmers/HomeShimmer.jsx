function HomeShimmer({ loaded }) {
    return (
        <div
            style={{ display: loaded ? "none" : "flex" }}
            className={`flex flex-col gap-4 w-full h-full`}>
            <div className='w-full h-full aspect-[700/320] bg-gray-300 animate-pulse'></div>
            <div className={`flex flex-col justify-center items-center mobile:flex-row mobile:justify-start gap-8 w-full h-full px-6`}>
                {
                    [1, 2].map((i) => {
                        return <div key={i} className="w-full mobile:max-w-[222px] flex aspect-[400/550]">
                            <div className="relative w-full h-full  bg-gray-300 rounded-md animate-pulse ">
                                <div className="w-full h-full flex flex-col gap-1">
                                    <div className="w-full absolute bottom-4 left-4 flex flex-col gap-2">
                                        <div className="bg-gray-400 w-7/12 h-8"></div>
                                        <div className="bg-gray-400 w-8/12 h-8 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="mx-6 bg-gray-300 rounded-md w-32 h-8"></div>
            <div className="mx-6 bg-gray-300 rounded-md w-32 h-8"></div>
            <div className={`w-full px-6 grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,max-content))] justify-start gap-4`}>
                {
                    [1, 2].map((i) => {
                        return <div key={i} className="aspect-[8/12] flex max-h-[390px] min-h-[300px] w-full h-full rounded-md overflow-hidden">
                            <div className="w-full bg-gray-200 animate-pulse ">
                                <div className="w-full h-full flex flex-col gap-1 ">
                                    <div className="relative w-full h-64 sm:h-96 bg-gray-300">
                                        <div className="bg-gray-400 w-12 h-4 absolute top-4 left-0"></div>
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
            </div>
        </div>
    )
}

export default HomeShimmer;