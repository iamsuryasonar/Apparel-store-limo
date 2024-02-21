const AddressShimmer = () => {
    return (
        <>
            {
                [1, 2, 3].map((i) => {
                    return <div key={i} className="w-full flex flex-col gap-4">
                        <div className="w-full  animate-pulse flex flex-row justify-between rounded-md bg-slate-50 p-4 shadow-lg gap-4">
                            <div className="w-full  flex flex-col gap-2">
                                <div className="w-7/12  h-6 bg-gray-300 rounded"></div>
                                <div className="w-9/12 h-4 bg-gray-300 rounded"></div>
                                <div className="w-6/12  h-4 bg-gray-300 rounded"></div>
                                <div className="w-5/12 h-4 bg-gray-300 rounded"></div>
                                <div className="w-6/12 h-4 bg-gray-300 rounded"></div>
                                <div className="w-7/12 h-4 bg-gray-300 rounded"></div>
                                <div className="w-full flex gap-2">
                                    <div className="w-4/12 h-10 bg-gray-300"></div>
                                    <div className="w-3/12 h-10 bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    </div >
                })
            }</>
    );
};

export default AddressShimmer;