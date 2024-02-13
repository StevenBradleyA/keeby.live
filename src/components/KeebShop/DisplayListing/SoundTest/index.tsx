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

    // TODO am going to have to create a variable that changes the height and width sent to youtube
    // based off of screen size I like the
    // love the 800/360 style a lil thinner than a 16;9 but looks clean we want 1/2 width basically
// do some screen size testing without passing a height and width ...
    const videoId = extractVideoIdFromLink(soundTest);

    const opts: YouTubePlayerOptions = {
        height: "500",
        width: "1260",
        playerVars: {
            autoplay: 0,
            controls: 1,
        },
    };

    return (
        <div className="flex justify-center rounded-xl bg-keebyGray p-5">
            {videoId && (
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    // className="rounded-3xl text-green-500"
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
