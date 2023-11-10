"use client";

import React, { useState } from "react";

const Description = ({ text }: { text: string }) => {
    const [isReadMore, setIsReadMore] = useState(true);

    //This function will take 25% of the text and hide it for there on out
    const displayText = isReadMore
        ? text.slice(0, Math.ceil(text.length * 0.25))
        : text;

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div className="container mx-auto p-4">
            <p className="text-gray-700 text-base">
                {displayText}
                {/* This will show '...' only when the text is clamped */}
                {isReadMore && text.length > displayText.length && "..."}
            </p>
            <button
                onClick={toggleReadMore}
                className="text-blue-600 hover:text-blue-800 mt-2 hover:underline text-md"
            >
                {isReadMore ? "Read More" : "Read Less"}
            </button>
        </div>
    );
};

export default Description;
