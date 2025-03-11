import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Star = ({ marked, starId, iconSize = 30 }) => {
    return (
        <button data-star-id={starId}>
            {marked ? <AiFillStar className="pointer-events-none text-yellow-500" size={iconSize} /> : <AiOutlineStar className="pointer-events-none text-yellow-500" data-star-id={starId} size={iconSize} />}
        </button>
    );
};

const StarRating = ({ type = 'SHOW', rating, setRating, total, iconSize }) => {
    const [selection, setSelection] = useState(0);

    const onHover = (event) => {
        if (type === 'SHOW') return;

        let val = 0;
        if (event && event.target && event.target.getAttribute("data-star-id")) {
            val = event.target.getAttribute("data-star-id");
        }
        setSelection(val);
    };

    return (
        <div
            className="flex flex-row"
            onMouseLeave={() => onHover(null)}
            onMouseOver={onHover}
            onClick={(e) => {
                if (type === 'SHOW') return;
                setRating(e.target.getAttribute("data-star-id") || rating)
            }
            }
        >
            {Array.from({ length: total }, (_, index) => {
                return (
                    <Star
                        marked={selection ? selection >= index + 1 : rating >= index + 1}
                        starId={index + 1}
                        key={`star_${index}`}
                        iconSize={iconSize}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;