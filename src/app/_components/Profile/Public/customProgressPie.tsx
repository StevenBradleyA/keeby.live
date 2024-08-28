import { motion } from "framer-motion";

export default function CustomProgressPie({
    size,
    strokeWidth,
    rating,
}: {
    size: number;
    strokeWidth: number;
    rating: number;
}) {
    const percentage = (rating / 5) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage / 100);

    const variants = {
        initial: {
            strokeDashoffset: circumference,
        },
        animate: {
            strokeDashoffset: strokeDashoffset,
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="relative mt-3">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
            >
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#616161"
                    strokeWidth="4"
                    fill="none"
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#22C55E"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center text-3xl">
                {rating.toFixed(1)}
            </div>
        </div>
    );
}
