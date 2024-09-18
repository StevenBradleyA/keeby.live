export default function LearnAboutKeyboards() {
    return (
        <>
            <div className="w-[50vw] laptop:w-[35vw] h-[60vh] text-sm flex flex-col px-5 overflow-y-auto">
                <div className="justify-center items-center text-xl w-full flex gap-1">
                    <h1>Welcome to Keeby </h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-9"
                        viewBox="0 0 48 48"
                        fill="none"
                    >
                        <path
                            d="M30 41.9999H42V29.9999"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M42 17.9999V5.99994H30"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M42 6L6 42"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24 23.9999L6 5.99994M31.5 31.4999L34 33.9999L39 38.9999L41.5 41.4999L42 41.9999"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {/* <div className="mt-3">
                    <div className="bg-black/30 text-green-500 rounded-lg p-3 text-xs mt-3 flex gap-2 flex-wrap">
                        <button
                            // onClick={() => scrollToSection(postureRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · Keeb Type
                        </button>
                        <button
                            // onClick={() => scrollToSection(touchTypingRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · What is Keeby?
                        </button>
                        <button
                            // onClick={() => scrollToSection(chunkingRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · Mechanical Keyboards
                        </button>
                    </div>
                </div> */}
                <h3 className="mt-3 text-lg">Keeb Type</h3>
                <p className="mt-3">
                    Keeb type is a keyboard profile based typing game with
                    different game modes.
                </p>
                <ul className="flex flex-col gap-2 mt-3">
                    <li>
                        <span className="text-white/50">Ranked:</span> Focus on
                        speed and accuracy. This mode encourages you to type
                        without going back to fix mistakes. Compete on the
                        leaderboard and choose your preferred text length.
                    </li>
                    <li>
                        <span className="text-white/50">Scholar:</span> Learn
                        while you type. Pick a category like vocabulary or
                        animal facts to improve your typing skills and knowledge
                        simultaneously.
                    </li>
                    <li>
                        <span className="text-white/50">Freeplay:</span> Type
                        anything you like, with no rules or restrictions.
                    </li>
                    <li>
                        <span className="text-white/50">Hacker:</span> You don't
                        need a neckbeard to hack, you just need to play the
                        hacker game mode.
                    </li>
                </ul>
                <p className="mt-3 bg-black/30 rounded-lg p-3 text-xs text-green-500">
                    How are things like WPM, Accuracy, and Rank calculated???
                </p>

                <ul className="flex flex-col gap-2 mt-3">
                    <li>
                        <span className="text-white/50">Wpm:</span> Total number
                        of characters in the correctly typed words (including
                        spaces), divided by 5 and adjusted to a 60-second
                        timeframe.
                    </li>
                    <li>
                        <span className="text-white/50">Pure wpm:</span> Similar
                        to WPM, but also includes incorrect words.
                    </li>
                    <li>
                        <span className="text-white/50">Ranked Score:</span> The
                        average speed across your top 10 fastest ranked games.
                    </li>
                    <li>
                        <span className="text-white/50">Accuracy:</span> The
                        percentage of keys pressed correctly.
                    </li>
                </ul>

                {/* <h3 className="mt-3 text-lg">Mechanical Keyboards</h3>
                <p className="mt-3">
                    Mechanical keyboards are a luxury that turn typing into a
                    very enjoyable experience. They not only sound and feel
                    awesome but also let you express your unique style. Are they
                    essential? Not at all. Are they fun? Absolutely! Here's a
                    simple guide to get you started with mechanical keyboards.
                </p> */}

                <h3 className="mt-3 text-lg">Keeby</h3>
                <p className="mt-3">
                    I love mechanical keyboards so I decided to build Keeby. A
                    place where you can improve your typing skills, list your
                    keyboards, share your keyboards, and find keyboard parts!
                </p>
            </div>
        </>
    );
}
