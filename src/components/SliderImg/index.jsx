import React, { useState, useEffect } from 'react';
import { images } from '~/pages/Home/Constains/index';
import noImage from '~/assets/images/No-image.png';

function SliderImg() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    return (
        <div className="relative mt-[64px]">
            <img src={images[currentIndex] || noImage} alt="Slide" className="w-full h-[500px] object-cover" />
            <div className="absolute flex items-center bottom-4 left-1/2 transform -translate-x-1/2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className="flex items-center p-2 cursor-pointer"
                    >
                        <button
                            className={`w-1 h-1 rounded-full bg-white ${
                                currentIndex === index ? 'bg-blue-500 w-2 h-2' : 'border-transparent'
                            } hover:bg-gray-300 transition-all`}
                        ></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SliderImg;
