import React, { useState } from "react";

type CarouselImage = {
    src: string;
    alt?: string;
};

type PictureCarouselProps = {
    images: CarouselImage[];
    className?: string;
};

export default function PictureCarousel({
    images,
    className = "",
}: PictureCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div
                className={[
                    `relative mx-auto flex`,
                    `h-16 w-full max-w-[700px]`,
                    `items-center justify-center`,
                    `${className}`
                ].join(" ")}
            ></div>
        )
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const currentImage = images[currentIndex];

    return (
        <div className={`relative mx-auto w-full max-w-[700px] ${className}`}>
            <button
                type="button"
                onClick={goToPrevious}
                aria-label="Forrige bilde"
                className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 p-2 text-black transition hover:scale-110"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-8 w-8"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <div className={[
                "flex h-100 w-full",
                "items-center justify-center",
                "overflow-hidden rounded-sm"
            ].join(" ")}
            >
                <img
                    src={currentImage.src}
                    alt={currentImage.alt || `Bilde ${currentIndex + 1} i bildekarusell`}
                    className="h-full w-full object-cover"
                />
            </div>

            <button
                type="button"
                onClick={goToNext}
                aria-label="Neste bilde"
                className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 p-2 text-black transition hover:scale-110"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-8 w-8"
                >
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    );
}