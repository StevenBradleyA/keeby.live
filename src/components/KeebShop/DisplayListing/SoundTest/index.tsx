import YouTube from "react-youtube";

interface ListingSoundTestProps {
    soundTest: string;
}

interface YouTubePlayerOptions {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1;
        controls: 0 | 1;
    };
}

export default function ListingSoundTest({ soundTest }: ListingSoundTestProps) {
    // npm install react-youtube
    // TODO when LIVE  check console warnings

    const videoId = extractVideoIdFromLink(soundTest);

    const opts: YouTubePlayerOptions = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 0,
            controls: 1,
        },
    };

    return (
        <div className="flex h-full w-full justify-center rounded-xl bg-keebyGray p-5">
            {videoId && (
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    className="h-full w-full"
                />
            )}
        </div>
    );
}

const extractVideoIdFromLink = (link: string): string | null => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);

    if (match && match[2] && match[2].length === 11) {
        return match[2];
    }

    return null;
};
