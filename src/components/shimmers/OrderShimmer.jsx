const OrderShimmer = () => {
    return (
        <>
            {
                [1, 2, 3].map((i) => {
                    return <div key={i} className="w-full flex flex-col rounded-md">
                        <div className="w-full bg-gray-200 rounded-lg p-4 animate-pulse shadow-lg">
                            <div className="w-full flex flex-row gap-4">
                                <div className="w-6/12 h-full aspect-square bg-gray-300 rounded"></div>
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-full h-4 bg-gray-300 rounded"></div>
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="w-2/12 h-4 bg-gray-300"></div>
                                        <div className="w-2/12 h-4 bg-gray-300"></div>
                                        <div className="w-2/12 h-4 bg-gray-300"></div>
                                    </div>
                                    <div className="w-7/12 h-4 bg-gray-300"></div>
                                    <div className="w-8/12 h-4 bg-gray-300"></div>
                                    <div className="w-full h-4 bg-gray-300"></div>
                                    <div className="w-full h-8 bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    );
};

export default OrderShimmer;