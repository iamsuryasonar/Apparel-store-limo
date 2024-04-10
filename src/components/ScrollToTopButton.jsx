import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = ({ scrollToElement }) => {

    const scrollToTop = () => {
        if (scrollToElement && scrollToElement?.current) {
            scrollToElement?.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div
            onClick={scrollToTop}
            className={`group fixed bottom-4 right-4 w-10 aspect-square rounded-full bg-orange-400 flex justify-center items-center`}>
            <FontAwesomeIcon className='group-hover:text-white cursor-pointer' icon={faArrowUp} />
        </div>
    );
};

export default ScrollToTopButton;
