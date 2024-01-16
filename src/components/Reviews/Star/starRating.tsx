import StarDisplay from ".";

interface StarRatingProps {
    rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
    const coloredStarColor = "#ffd700";
    const defaultStarColor = "#616161";

    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (

                <StarDisplay
                    key={i}
                    color={i < rating ? coloredStarColor : defaultStarColor}
                />
            ))}
        </div>
    );
}
