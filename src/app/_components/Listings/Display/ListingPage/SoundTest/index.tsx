"use client";

interface ListingSoundTestProps {
    soundTest: string;
}

export default function ListingSoundTest({ soundTest }: ListingSoundTestProps) {
    const videoId = extractVideoIdFromLink(soundTest);

    return (
        <div className="flex h-full w-full justify-center rounded-xl bg-darkGray p-5">
            {videoId && (
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                ></iframe>
            )}
        </div>
    );
}

const extractVideoIdFromLink = (link: string): string | null => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);

    if (match && match[2] && match[2].length === 11) {
        return match[2];
    }

    return null;
};
