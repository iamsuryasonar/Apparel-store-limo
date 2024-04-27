
const BottomAlert = ({ message }) => {
    return (
        <p className={`z-50 fixed rounded-t-md bottom-0 left-0 right-0 px-4 py-1 text-white text-sm bg-green-400 animated-message animate-slideFromBottom`}>{message}</p>
    )
};

export default BottomAlert;