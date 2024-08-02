import EachStarDisplay from "./eachStar";

interface StarRatingProps {
    rating: number;
}

export default function DisplayStarRating({ rating }: StarRatingProps) {
    const coloredStarColor = "text-green-500";
    const defaultStarColor = "text-mediumGray";

    return (
        <div className="flex gap-[2px]">
            {Array.from({ length: 5 }, (_, i) => (
                <EachStarDisplay
                    key={i}
                    color={i < rating ? coloredStarColor : defaultStarColor}
                />
            ))}
        </div>
    );
}
