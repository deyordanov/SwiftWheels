//types
import * as starTypes from "../../utilities/types/star.types";

export const Star = ({
    filled,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: starTypes.propTypes) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer ${
                filled ? "text-yellow-300" : "text-gray-400"
            }`}
            fill={filled ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth="1.5"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <path
                strokeLinecap="round"
                stroke={filled ? "black" : "currentColor"}
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.653-.921 1.953 0l1.406 4.33c.15.461.501.8.973.9l4.55.662c1.01.147 1.412 1.382.683 2.092l-3.295 3.207c-.364.355-.53.869-.442 1.377l.778 4.539c.171 1-.846 1.746-1.71 1.28l-4.085-2.147c-.456-.24-.996-.24-1.452 0l-4.085 2.147c-.864.466-1.88-.28-1.71-1.28l.778-4.539c.088-.508-.078-1.022-.442-1.377l-3.295-3.207c-.729-.71-.327-1.945.683-2.092l4.55-.662c.472-.1.823-.439.973-.9l1.406-4.33z"
            />
        </svg>
    );
};
