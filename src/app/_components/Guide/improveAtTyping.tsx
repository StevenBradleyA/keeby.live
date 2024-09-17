import { useRef } from "react";

export default function ImproveAtTyping() {
    // Create refs for each category
    const postureRef = useRef(null);
    const touchTypingRef = useRef(null);
    const chunkingRef = useRef(null);
    const layoutsRef = useRef(null);

    // Function to scroll to a specific section
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <>
            <div className="w-[50vw] laptop:w-[35vw] h-[60vh] text-lg flex flex-col px-5 overflow-y-auto">
                <div className="flex w-full justify-center">
                    <h1 className="flex items-center">
                        How to Type Faster
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            viewBox="0 0 50.8 50.8"
                            fill="none"
                        >
                            <g>
                                <path
                                    d="M12.965 29.31h10.92l-1.55 15.013c-.052.784.348.955.941 0l14.55-22.834"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                />

                                <path
                                    d="M37.826 21.49h-10.92l1.549-15.013c.052-.784-.348-.955-.941 0l-14.55 22.834"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                />
                            </g>
                        </svg>
                    </h1>
                </div>
                <div className="h-full  text-sm">
                    <p className="mt-5 text-sm">
                        Liking mechanical keyboards means you can type really
                        fast right? 🤨 RIGHT??? Here are some tips that helped
                        take me from 50 to 120 wpm.
                    </p>
                    <div className="bg-black/30 text-green-500 rounded-lg p-3 text-xs mt-3 flex gap-2 flex-wrap">
                        <button
                            onClick={() => scrollToSection(postureRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · Posture
                        </button>
                        <button
                            onClick={() => scrollToSection(touchTypingRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · Touch Typing
                        </button>
                        <button
                            onClick={() => scrollToSection(chunkingRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · Chunking
                        </button>
                        <button
                            onClick={() => scrollToSection(layoutsRef)}
                            className="hover:opacity-80 ease-In"
                        >
                            · Layouts
                        </button>
                    </div>

                    <h2 className="text-lg mt-3">Basics</h2>
                    <h3
                        className="text-lg mt-3 text-green-500"
                        ref={postureRef}
                    >
                        Posture
                    </h3>

                    <p>
                        Proper posture can actually make a big difference in
                        your typing speed and preventing repetitive strain
                        injuries.
                    </p>
                    <ul className="flex flex-col gap-2 mt-3">
                        <li>
                            <span className="text-white/50">
                                Chair and Desk Setup:
                            </span>{" "}
                            Adjust your chair so that your feet are flat on the
                            floor, your knees are at a 90-degree angle, and your
                            back is straight. Your desk should be at a height
                            where your elbows are also at a 90-degree angle when
                            your hands are on the keyboard.
                        </li>
                        <li>
                            <span className="text-white/50">
                                Hand Positioning:
                            </span>{" "}
                            Keep your wrists elevated slightly above the
                            keyboard and avoid resting them on the desk while
                            typing. Your fingers should hover over the home row
                            (ASDF for the left hand, JKL; for the right hand).
                        </li>
                        <li>
                            <span className="text-white/50">
                                Screen Placement:
                            </span>{" "}
                            Position your screen at eye level, about 18-24
                            inches away from your face. This helps reduce neck
                            strain and keeps your posture upright.
                        </li>
                    </ul>

                    <p className="mt-3">
                        If you've struggled with wrist pain you should try an
                        Alice or Split keyboard. These layouts are amazing for
                        forcing better wrist positioning. They have a learning
                        curve but are worth it if you type a lot.
                    </p>

                    <h3
                        className="text-lg mt-3 text-green-500"
                        ref={touchTypingRef}
                    >
                        Touch Typing
                    </h3>

                    <p>
                        Touch typing is the ability to type without looking at
                        the keyboard. Learning it allows for faster and more
                        accurate typing because your fingers instinctively know
                        where each key is located. Here's how to get started
                        with touch typing:
                    </p>
                    <ul className="flex flex-col gap-2 mt-3">
                        <li>
                            <span className="text-white/50">
                                Home Row Technique:
                            </span>{" "}
                            Begin by placing your fingers on the home row keys.{" "}
                            <span className="text-white/50">Left hand:</span>{" "}
                            Index finger on F, middle on D, ring on S, and pinky
                            on A.{" "}
                            <span className="text-white/50">Right hand:</span>{" "}
                            Index finger on J, middle on K, ring on L, and pinky
                            on ;
                        </li>
                        <li>
                            <span className="text-white/50">
                                Finger Movement:
                            </span>{" "}
                            Each finger is responsible for a specific set of
                            keys. Practice moving each finger to its assigned
                            keys without looking at the keyboard. For example,
                            the left index finger should cover R, T, F, G, V,
                            and B.
                        </li>
                        <li>
                            <span className="text-white/50">Gaming:</span> WASD
                            can mess with your touch typing if you are a big
                            gamer. Consider switching to ESDF, you will have to
                            set your binds in every game you play but you will
                            gain cracked muscle memory and more keys at your
                            disposal.
                        </li>
                    </ul>

                    <h2 className="text-lg mt-3">Advanced</h2>
                    <h3
                        className="text-lg mt-3 text-green-500"
                        ref={chunkingRef}
                    >
                        Chunking
                    </h3>

                    <p>
                        Instead of thinking about each letter individually,
                        think about the entire word as a single unit. Your brain
                        will start to associate the pattern of finger movements
                        with the word itself. Avoid backspacing and correcting
                        errors while practicing this technique. Focus on
                        maintaining a fluid motion, even if it means making
                        mistakes. Correcting errors interrupts your flow, so aim
                        for consistency first, and then refine your accuracy.
                    </p>

                    <h3 className="text-lg mt-3 text-green-500">
                        Reading Ahead
                    </h3>

                    <p>
                        As you get really good at word chunking, you need to be
                        able to read the next word quickly. Practice by focusing
                        on the next word while typing the current one. This
                        skill allows you to maintain a smooth flow and type
                        faster with fewer pauses.
                    </p>

                    <h3
                        className="text-lg mt-3 text-green-500"
                        ref={layoutsRef}
                    >
                        Layouts
                    </h3>

                    <p>
                        Layouts can significantly improve your typing speed, but
                        there are a lot of downsides to consider when adopting
                        new layouts. QWERTY is the most widely used keyboard
                        layout today, but it wasn't designed with efficiency in
                        mind. The arrangement was primarily designed to prevent
                        the mechanical typewriter hammers from jamming. Commonly
                        used letter pairs were placed far apart to slow down
                        typing slightly, reducing the chance of jams.
                    </p>

                    <ul className="flex flex-col gap-2 mt-3">
                        <li>
                            <span className="text-white/50">Dvorak:</span> The
                            layout aims to reduce finger movement by placing
                            frequently used letters and combinations in
                            easy-to-reach positions. This can lead to faster
                            typing speeds and less strain on the fingers and
                            hands.
                        </li>

                        <li>
                            <span className="text-white/50">Colemak:</span> A
                            modern alternative to QWERTY that retains many of
                            its key placements while rearranging some less
                            frequently used keys. It aims to be easier to learn
                            than Dvorak while still providing increased typing
                            speed and comfort.
                        </li>

                        <li>
                            <span className="text-white/50">Workman:</span>{" "}
                            Optimized for comfort and to minimize finger strain.
                            It reduces lateral finger movement by placing the
                            most commonly used keys under the strongest fingers
                            and aims to balance load between hands.
                        </li>
                        <li>
                            <span className="text-white/50">
                                Stenotype (Stenograph):
                            </span>{" "}
                            Used by court reporters and stenographers to type at
                            extremely high speeds. It uses a chorded keyboard
                            where multiple keys are pressed simultaneously to
                            form words and sounds, allowing for rapid
                            transcription.
                        </li>
                    </ul>

                    <p className="mt-3">
                        Switching to a new keyboard layout takes a lot of time
                        and effort. It might take you weeks or even months to
                        get as good as you were with QWERTY. Most places, like
                        public spaces and workplaces, use QWERTY keyboards, so
                        using other layouts can be tricky, especially if you
                        share keyboards with others. Plus, setting up your key
                        binds for gaming on a new layout can be a bit of a
                        hassle. If you find yourself going back and forth
                        between QWERTY and the new layout, it can get confusing
                        and might even slow you down in the long run.
                    </p>
                </div>
            </div>
        </>
    );
}
