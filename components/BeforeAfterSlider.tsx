import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Wrench } from 'lucide-react';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel = "INPUT SOURCE",
    afterLabel = "DREAM RESULT",
    className = ""
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        let clientX;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as MouseEvent).clientX;
        }

        const newPos = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, newPos)));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove as any);
            window.addEventListener('touchmove', handleMove as any);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove as any);
            window.removeEventListener('touchmove', handleMove as any);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden select-none cursor-ew-resize group ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* Before Image (Background) */}
            <img
                src={beforeImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />

            {/* After Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
                <img
                    src={afterImage}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-contain"
                />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-gray-300">
                    <Wrench className="w-3 h-3 text-gray-500" />
                    {beforeLabel}
                </div>
            </div>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md border border-[#00FF41]/30 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                    {afterLabel}
                    <Sparkles className="w-3 h-3" />
                </div>
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform">
                    <div className="w-1 h-3 bg-gray-400 rounded-full mx-0.5" />
                    <div className="w-1 h-3 bg-gray-400 rounded-full mx-0.5" />
                </div>
            </div>
        </div>
    );
};
