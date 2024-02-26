import YouTube from "react-youtube";

interface YouTubePlayerOptions {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1;
        controls: 0 | 1;
    };
}

interface DisplayYouTubePostPreview {
    link: string;
}

const calculateResponsiveSize = () => {
    // Example calculation, adjust according to your needs
    const width = Math.min(1260, window.innerWidth - 40); // Ensure video is not wider than the screen minus some margin
    const height = (width * 9) / 16; // Maintain a 16:9 aspect ratio
    return { width: width.toString(), height: height.toString() };
};

export default function DisplayYouTubePostPreview({
    link,
}: DisplayYouTubePostPreview) {
    const videoId = extractVideoIdFromLink(link);

    const opts: YouTubePlayerOptions = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 0,
            controls: 1,
        },
    };

    return (
        <div className="h-full w-full">
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
