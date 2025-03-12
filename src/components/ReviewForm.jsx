import { useState } from "react";
import ReviewServices from "../services/review.services";
import { MdClose } from "react-icons/md";
import StarRating from "./StarRating";

function ReviewForm({ type = 'ADD', review, productId, setShowReviewForm, reloadReviewCallback }) {
    const [value, setValue] = useState(review?.rating || 5);
    const [message, setMessage] = useState(review?.message || '');
    const [errors, setErrors] = useState({});

    function onMessageChangeHandler(e) {
        setErrors({});
        setMessage(e.target.value);
    }

    async function onSubmit() {
        const newErrors = {};

        if (message.trim().length > 500) {
            newErrors.message = 'message should be less than 500 character';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length !== 0) return;

        if (type === 'ADD') {
            await ReviewServices.addReview({ productId, message, rating: value });
            reloadReviewCallback();
            setShowReviewForm(false);
        } else if (type === 'EDIT') {
            await ReviewServices.updateReview({ _id: review._id, message, rating: value });
            reloadReviewCallback();
            setShowReviewForm(false);
        }
    }

    return <div className="z-50 fixed inset-0 bg-black/70 flex items-center justify-center">
        <div className="absolute m-4 p-4 bg-slate-50 flex flex-col gap-4">
            <button onClick={() => setShowReviewForm(false)} className="p-1 absolute top-0 right-0 bg-red-300 hover:bg-red-400 rounded-l-full rounded-b-full"><MdClose size={20} /></button>
            <div className="flex flex-col">
                <label htmlFor="message">Review:</label>
                <textarea value={message} onChange={onMessageChangeHandler} rows={5} className="w-full border-[1px] border-black px-2 py-1 bg-transparent" name="message" id="message" placeholder="Leave a review..." />
                {errors?.message && <p className="text-red-00 text-xs">{errors.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label >Rating:</label>
                <StarRating type={'EDIT'} rating={value} setRating={setValue} total={5} />
            </div>
            <button className="px-2 py-1 border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold" onClick={onSubmit}>Submit</button>
        </div>
    </div>
}

export default ReviewForm;