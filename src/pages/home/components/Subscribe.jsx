import { useDispatch } from 'react-redux';
import subscribe from '../../../assets/subscribe.jpg';
import { setMessage, clearMessage } from '../../../store/slices/messageSlice';

function Subscribe() {
    const dispatch = useDispatch()
    function handleSubscribe() {
        dispatch(setMessage('Not implemented!'));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 2000)
    }
    return <section id="subscribe-section" className="w-full pt-6 flex flex-col md:grid md:grid-cols-2">
        <img alt='subscribe banner' className="object-cover h-[25rem]" src={subscribe} />
        <div className="w-full h-[25rem] bg-black none flex flex-col justify-center items-center gap-8">
            {/* <p className="text-white text-4xl">GET ON OUR LIST</p> */}
            <label htmlFor='subscribe_input' className='text-white text-4xl'>GET ON OUR LIST</label>
            <div className="relative w-10/12 ">
                <input id='subscribe_input' className='w-full h-10 border-2 px-2 rounded-md border-white bg-transparent text-white' placeholder='eg. john@gmail.com'></input>
                <button onClick={handleSubscribe} className="bg-white text-center px-6 absolute top-0 bottom-0 right-0 rounded-md border-2 border-white hover:bg-slate-900 hover:text-white transition-colors duration-300">SUBMIT</button>
            </div>
        </div>
    </section>
}
export default Subscribe;