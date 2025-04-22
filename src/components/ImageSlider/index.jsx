import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';

import Image from '../Image';

function ImageSlider({ images = [] }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [percentSlide, setPercentSlide] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        activeStep !== 0 ? setPercentSlide(100 * activeStep) : setPercentSlide(0);
    }, [activeStep, maxSteps]);

    return (
        <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${percentSlide}%)`,
                    }}
                >
                    {images.map((step, index) => (
                        <div className="flex-shrink-0 w-full h-[300px] overflow-hidden" key={index}>
                            <Image
                                src={
                                    step?.url ||
                                    'https://bizweb.dktcdn.net/100/229/172/products/bow-wow-pho-mai-cuon-ga-1709195207055.jpg?v=1709440731433'
                                }
                                alt=""
                                className="w-full h-full object-cover"
                                style={{
                                    imageRendering: 'auto', // Ensure image sharpness
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                className="w-full mt-2"
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );
}

export default ImageSlider;
