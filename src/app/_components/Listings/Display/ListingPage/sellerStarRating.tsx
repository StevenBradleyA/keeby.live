"use client";

interface SellerStarRatingProps {
    avgRating?: number | null;
    totalRatings?: number | null;
}

export default function SellerStarRating({
    avgRating,
    totalRatings,
}: SellerStarRatingProps) {
    const getStarFill = (starIndex: number) => {
        if (!avgRating) return { offset: 0, color: "#616161" };

        const averageRating = Math.round(avgRating * 10) / 10;
        const ratingForStar = averageRating - starIndex;

        if (ratingForStar >= 1) return { offset: 100, color: "#22C55E" };
        if (ratingForStar <= 0) return { offset: 0, color: "#616161" };

        return { offset: ratingForStar * 100, color: "#22C55E" };
    };

    return (
        <div className="flex flex-col text-mediumGray pl-3">
            <p>
                {avgRating && totalRatings
                    ? `${totalRatings} review${totalRatings === 1 ? "" : "s"} (${avgRating.toFixed(1)}) `
                    : "unreviewed seller"}
            </p>
            <div className="flex gap-1">
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((index) => {
                        const { offset, color } = getStarFill(index);
                        return (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <defs>
                                    <linearGradient
                                        id={`star-gradient-${index}`}
                                    >
                                        <stop
                                            offset={`${offset}%`}
                                            stopColor={color}
                                        />
                                        <stop
                                            offset={`${offset}%`}
                                            stopColor="#616161"
                                        />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill={`url(#star-gradient-${index})`}
                                    d="M11.27 4.41c.23-.52.35-.78.5-.86.14-.07.3-.07.44 0 .15.08.27.34.5.86l1.84 4.14c.07.15.1.23.16.29.05.06.11.1.18.13.07.03.15.04.32.05l4.5.48c.57.06.85.09 1 .23.11.11.16.27.14.43-.03.18-.24.37-.66.75l-3.36 3.03c-.13.12-.19.18-.23.26-.03.06-.05.13-.06.2-.01.08.01.16.04.33l.94 4.43c.12.56.18.84.1 1-.07.14-.2.23-.35.25-.18.03-.43-.14-.92-.43l-3.92-2.26c-.14-.08-.21-.12-.29-.14-.07-.02-.14-.02-.22 0-.08.02-.15.06-.29.14l-3.92 2.26c-.49.29-.74.46-.92.43-.15-.02-.28-.11-.35-.25-.08-.16-.02-.44.1-1l.94-4.43c.04-.17.05-.25.04-.33-.01-.07-.03-.14-.06-.2-.04-.08-.1-.14-.23-.26L3.82 10.88c-.42-.37-.63-.57-.66-.75-.02-.16.03-.32.14-.43.15-.14.43-.17 1-.23l4.5-.48c.17-.02.25-.03.32-.05.07-.03.13-.07.18-.13.05-.06.1-.15.16-.29l1.84-4.14z"
                                    stroke={`url(#star-gradient-${index})`}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
