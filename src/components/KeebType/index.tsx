import { useEffect, useRef, useState } from "react";
import TypingText from "./typingText";
import TypingStats from "./stats";

export default function KeebType() {
    // TODO add vertical bars left side different modes. Right side basic functions restart test, new test, stats

    const [paragraphs] = useState([
        "keys typing qwerty layout letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home numeric",
        "keyboards typing keys qwerty spacebar layout letters backspace shift enter capslock function arrow control alt command escape delete tab home numeric",
        "typing qwerty keys layout letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home numeric keyboards",
        "enter typing keys qwerty layout letters spacebar backspace shift capslock function arrow control alt command escape delete tab home numeric keyboards",
        "qwerty layout typing keys letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home numeric keyboards",
        "numeric keyboards typing keys qwerty layout letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home",
        "letters spacebar enthusiasts qwerty layout mechanical keyboard typing enthusiasts artisan backspace enthusiast switches keycaps function arrow control alt command escape delete custom hobby tab numeric",
        "backspace switches mechanical typing keys enthusiasts qwerty layout artisan letters enthusiasts spacebar enthusiast keycaps function arrow control alt custom command hobby escape delete tab home numeric",
        "keycaps enthusiasts qwerty layout typing keys mechanical keyboard switches artisan letters enthusiasts spacebar backspace enthusiast function arrow control alt custom command escape hobby delete tab numeric",
    ]);
    const [currentParagraph, setCurrentParagraph] = useState("");
    const [typedText, setTypedText] = useState("");
    const [typedCorrectText, setTypedCorrectText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [wpm, setWPM] = useState(0);
    const [isTestFinished, setIsTestFinished] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        loadParagraph();
    }, []);

    const loadParagraph = () => {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        setCurrentParagraph(paragraphs[randomIndex]);
        setTypedText("");
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
        setTotalTime(0);
        setWPM(0);
    };
    const handleInputChange = (event) => {
        const typedChar = event.target.value[charIndex];

        if (!isTyping) {
            const startTime = Date.now();
            setIsTyping(true);
            setTimer(startTime);
        }

        if (charIndex < currentParagraph.length) {
            if (typedChar == null) {
                if (charIndex > 0) {
                    setCharIndex((prevCharIndex) => prevCharIndex - 1);

                    if (currentParagraph[charIndex - 1] !== " ") {
                        setMistakes((prevMistakes) => prevMistakes - 1);
                    }
                }
            } else {
                if (currentParagraph[charIndex] !== typedChar) {
                    setMistakes((prevMistakes) => prevMistakes + 1);
                }

                setCharIndex((prevCharIndex) => prevCharIndex + 1);
            }
        }

        if (charIndex === currentParagraph.length - 1) {
            const endTime = Date.now();
            const elapsedTime = (endTime - timer) / 1000;
            setTotalTime(elapsedTime);
            setIsTestFinished(true);
        }

        setTypedText(event.target.value);
    };

    const resetGame = () => {
        loadParagraph();
        setIsTestFinished(false);
        inputRef.current.focus();
    };

    const words = typedCorrectText.split(" ");
    const wpm = Math.round((words.length / totalTime) * 60);

    return !isTestFinished ? (
        <div className="flex justify-center ">
            <div className="flex flex-col  ">
                <button>10</button>
                <button>20</button>
                <button>50</button>
            </div>
            <div className=" wrapper flex w-3/4 flex-wrap ">
                <div className="content-box">
                    <TypingText
                        currentParagraph={currentParagraph}
                        charIndex={charIndex}
                        typedText={typedText}
                    />
                    <div className="content">
                        <input
                            ref={inputRef}
                            className="input-field"
                            type="text"
                            value={typedText}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <button onClick={resetGame}>Try Again</button>
            </div>
        </div>
    ) : (
        <>
            <TypingStats totalTime={totalTime} />
            <div className="flex flex-col">
                <button onClick={resetGame}>Try Again</button>
            </div>
        </>
    );
}
/*


  const [sentenceLength, setSentenceLength] = useState(10); // Default sentence length
    const [generatedSentence, setGeneratedSentence] = useState("");
    const [userInput, setUserInput] = useState("");

    const basicWords = [
        "the",
        "and",
        "of",
        "to",
        "in",
        "a",
        "for",
        "is",
        "on",
        "that",
        "by",
        "this",
        "with",
        "it",
        "you",
        "he",
        "she",
        "we",
        "they",
        "at",
        "but",
        "not",
        "have",
        "had",
        "I",
        "are",
        "be",
        "from",
        "or",
        "one",
        "as",
        "an",
        "all",
        "if",
        "can",
        "will",
        "up",
        "out",
        "so",
        "what",
        "when",
        "there",
        "which",
        "do",
        "how",
        "get",
        "go",
        "make",
        "no",
        "see",
        "know",
        "come",
        "take",
        "time",
        "them",
        "some",
        "could",
        "may",
        "such",
        "like",
        "then",
        "than",
        "first",
        "more",
        "only",
        "these",
        "also",
        "new",
        "way",
        "use",
        "our",
        "about",
        "many",
        "want",
        "find",
        "her",
        "him",
        "long",
        "two",
        "been",
        "other",
        "your",
        "into",
        "its",
        "just",
        "over",
        "year",
        "last",
        "even",
        "most",
        "very",
        "name",
        "good",
        "very",
        "man",
        "woman",
        "day",
        "back",
        "work",
        "down",
        "call",
        "off",
        "home",
        "after",
        "should",
        "just",
        "than",
        "before",
        "large",
        "small",
        "big",
        "high",
        "low",
        "place",
        "part",
        "person",
        "case",
        "point",
        "week",
        "company",
        "number",
        "group",
        "problem",
        "fact",
        "question",
        "idea",
        "reason",
        "person",
        "kind",
        "fact",
        "example",
        "government",
        "system",
        "area",
        "state",
        "country",
        "world",
        "thing",
        "hand",
        "part",
        "place",
        "case",
        "child",
        "eye",
        "woman",
        "man",
        "life",
        "child",
        "government",
        "company",
        "point",
        "home",
        "school",
        "number",
        "fact",
        "question",
        "person",
        "idea",
        "fact",
        "kind",
        "reason",
        "example",
        "area",
        "system",
        "state",
        "country",
        "world",
        "thing",
        "part",
        "hand",
        "case",
        "place",
        "woman",
        "man",
        "child",
        "eye",
        "life",
        "school",
        "government",
        "company",
        "person",
        "home",
        "number",
        "question",
        "idea",
        "kind",
        "fact",
        "reason",
        "example",
        "world",
        "thing",
        "area",
        "country",
        "system",
        "state",
        "state",
        "hand",
        "place",
        "case",
        "part",
        "woman",
        "man",
        "life",
        "child",
        "person",
        "idea",
        "school",
        "home",
        "government",
        "number",
        "fact",
        "question",
        "kind",
        "reason",
        "example",
        "thing",
        "world",
        "area",
        "country",
        "system",
        "state",
        "man",
        "woman",
        "place",
        "person",
        "child",
        "case",
        "life",
        "idea",
        "fact",
        "home",
        "school",
        "government",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "world",
        "thing",
        "country",
        "area",
        "system",
        "state",
        "hand",
        "case",
        "woman",
        "part",
        "man",
        "child",
        "life",
        "person",
        "idea",
        "fact",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "thing",
        "world",
        "country",
        "area",
        "state",
        "system",
        "man",
        "woman",
        "child",
        "part",
        "case",
        "life",
        "person",
        "fact",
        "idea",
        "government",
        "home",
        "school",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "world",
        "thing",
        "country",
        "area",
        "state",
        "system",
        "hand",
        "man",
        "woman",
        "place",
        "case",
        "child",
        "life",
        "person",
        "idea",
        "fact",
        "government",
        "home",
        "school",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "world",
        "thing",
        "country",
        "system",
        "area",
        "state",
        "hand",
        "woman",
        "case",
        "place",
        "man",
        "child",
        "person",
        "life",
        "idea",
        "fact",
        "school",
        "government",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "thing",
        "world",
        "country",
        "system",
        "state",
        "man",
        "woman",
        "hand",
        "part",
        "child",
        "case",
        "place",
        "life",
        "person",
        "fact",
        "idea",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "world",
        "thing",
        "country",
        "system",
        "state",
        "hand",
        "woman",
        "case",
        "place",
        "man",
        "child",
        "life",
        "person",
        "fact",
        "idea",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "thing",
        "world",
        "country",
        "area",
        "system",
        "state",
        "woman",
        "man",
        "place",
        "person",
        "child",
        "case",
        "life",
        "idea",
        "fact",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "thing",
        "world",
        "country",
        "system",
        "state",
        "hand",
        "man",
        "woman",
        "part",
        "case",
        "child",
        "place",
        "life",
        "person",
        "idea",
        "fact",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "world",
        "thing",
        "country",
        "system",
        "area",
        "state",
        "woman",
        "hand",
        "man",
        "case",
        "place",
        "child",
        "life",
        "person",
        "fact",
        "idea",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "thing",
        "world",
        "country",
        "state",
        "system",
        "hand",
        "area",
        "man",
        "woman",
        "case",
        "place",
        "child",
        "life",
        "person",
        "fact",
        "idea",
        "government",
        "school",
        "home",
        "number",
        "question",
        "kind",
        "reason",
        "example",
        "world",
        "thing",
        "country",
        "system",
        "state",
        "hand",
        "woman",
        "man",
        "case",
        "place",
        "child",
        "life",
        "person",
        "idea",
        "fact",
    ];

    const generateRandomSentence = (length) => {
        const sentence = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * basicWords.length);
            sentence.push(basicWords[randomIndex]);
        }
        return sentence.join(" ");
    };

    useEffect(() => {
        // Generate the sentence when sentenceLength changes
        const newSentence = generateRandomSentence(sentenceLength);
        setGeneratedSentence(newSentence);
    }, [sentenceLength]);

    const handleButtonClick = (length) => {
        setSentenceLength(length);
    };

    return (
        <div className="w-3/4 text-green-400 ">
            <div className="flex gap-5">
                <button onClick={() => handleButtonClick(10)}>10</button>
                <button onClick={() => handleButtonClick(20)}>20</button>
                <button onClick={() => handleButtonClick(50)}>50</button>
            </div>
            {generatedSentence && (
                <div className="flex w-full flex-wrap">
                    <input
                        type="text"
                        value={generatedSentence}
                        className="w-full border-b-2 border-green-400 bg-transparent focus:outline-none"
                        onChange={(e) => setGeneratedSentence(e.target.value)}
                        placeholder="Start typing..."
                    />
                </div>
            )}
        </div>
    );
}




------------------------------


const paragraphs = [
        "Their politician was, in this moment, a notour paperback. The first armless grouse is, in its own way, a gear. The coat is a wash. However, a cake is the llama of a caravan. Snakelike armies show us how playgrounds can be viscoses. Framed in a different way, they were lost without the fatal dogsled that composed their waitress. Far from the truth, the cockney freezer reveals itself as a wiggly tornado to those who look. The first hawklike sack.",
        "Authors often misinterpret the lettuce as a folklore rabbi, when in actuality it feels more like an uncursed bacon. Pursued distances show us how mother-in-laws can be charleses. Authors often misinterpret the lion as a cormous science, when in actuality it feels more like a leprous lasagna. Recent controversy aside, their band was, in this moment, a racemed suit. The clutch of a joke becomes a togaed chair. The first pickled chess is.",
        "In modern times the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind. A recorder is a grade from the right perspective. A hygienic is the cowbell of a skin. Few can name a dun brazil that isn't a highbrow playroom. The unwished beast comes from a thorny oxygen. An insured advantage's respect comes with it the thought that the lucid specialist is a fix.",
        "What we don't know for sure is whether or not a pig of the coast is assumed to be a hardback pilot. The literature would have us believe that a dusky clave is not but an objective. Few can name a limbate leo that isn't a sunlit silver. The bow is a mitten. However, the drawer is a bay. If this was somewhat unclear, few can name a paunchy blue that isn't a conoid bow. The undrunk railway reveals itself as a downstage bamboo to those who look.",
        "An aunt is a bassoon from the right perspective. As far as we can estimate, some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerous llama to those who look. A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids. A gum is a trumpet from the right perspective. A freebie flight is a wrench of the mind. Some posit the croupy.",
        "A baby is a shingle from the right perspective. Before defenses, collars were only operations. Bails are gleesome relatives. An alloy is a streetcar's debt. A fighter of the scarecrow is assumed to be a leisured laundry. A stamp can hardly be considered a peddling payment without also being a crocodile. A skill is a meteorology's fan. Their scent was, in this moment, a hidden feeling. The competitor of a bacon becomes a boxlike cougar.",
        "A broadband jam is a network of the mind. One cannot separate chickens from glowing periods. A production is a faucet from the right perspective. The lines could be said to resemble zincoid females. A deborah is a tractor's whale. Cod are elite japans. Some posit the wiglike norwegian to be less than plashy. A pennoned windchime's burst comes with it the thought that the printed trombone is a supply. Relations are restless tests.",
        "In recent years, some teeming herons are thought of simply as numbers. Nowhere is it disputed that an unlaid fur is a marble of the mind. Far from the truth, few can name a glossy lier that isn't an ingrate bone. The chicken is a giraffe. They were lost without the abscessed leek that composed their fowl. An interviewer is a tussal bomb. Vanward maracas show us how scarfs can be doubts. Few can name an unguled punch that isn't pig.",
        "A cough is a talk from the right perspective. A designed tractor's tray comes with it the thought that the snuffly flax is a rainbow. Their health was, in this moment, an earthy passbook. This could be, or perhaps the swordfishes could be said to resemble healthy sessions. A capricorn is a helium from the right perspective. However, a sled is a mailman's tennis. The competitor of an alarm becomes a toeless raincoat. Their twist was, in this moment.",
        "Authors often misinterpret the flag as a wayless trigonometry, when in actuality it feels more like a bousy gold. Few can name a jasp oven that isn't a stutter grape. They were lost without the huffy religion that composed their booklet. Those waves are nothing more than pedestrians. Few can name a quartered semicolon that isn't a rounding scooter. Though we assume the latter, the literature would have us believe.",
        "This could be, or perhaps few can name a pasteboard quiver that isn't a brittle alligator. A swordfish is a death's numeric. Authors often misinterpret the mist as a swelling asphalt, when in actuality it feels more like a crosswise closet. Some posit the tonal brother-in-law to be less than newborn. We know that the sizes could be said to resemble sleepwalk cycles. Before seasons, supplies were only fighters. Their stew was, in this moment.",
        "The vision of an attempt becomes a lawny output. Dibbles are mis womens. The olden penalty reveals itself as a bustled field to those who look. Few can name a chalky force that isn't a primate literature. However, they were lost without the gamy screen that composed their beret. Nowhere is it disputed that a step-uncle is a factory from the right perspective. One cannot separate paints from dreary windows. What we don't know for sure is whether.",
        "A tramp is a siamese from the right perspective. We know that a flitting monkey's jaw comes with it the thought that the submersed break is a pamphlet. Their cream was, in this moment, a seedy daffodil. The nest is a visitor. Far from the truth, they were lost without the released linen that composed their step-sister. A vibraphone can hardly be considered a pardine process without also being an archaeology. The bay of a hyacinth becomes.",
        "The frosts could be said to resemble backstage chards. One cannot separate colleges from pinkish bacons. Far from the truth, the mom of a rooster becomes a chordal hydrogen. A tempo can hardly be considered a purer credit without also being a pajama. The first combined ease is, in its own way, a pantyhose. Extending this logic, the guides could be said to resemble reddest monkeies. Framed in a different way, an addle hemp is a van.",
        "Far from the truth, an ajar reminder without catamarans is truly a foundation of smarmy semicircles. An alike board without harps is truly a satin of fated pans. A hubcap sees a parent as a painful beautician. The zeitgeist contends that some intense twigs are thought of simply as effects. A cross is a poppied tune. The valanced list reveals itself as an exchanged wrist to those who look. Recent controversy aside.",
        "The hefty opinion reveals itself as a sterile peer-to-peer to those who look. This could be, or perhaps the watch of a diamond becomes a bosom baboon. In recent years, some posit the unstuffed road to be less than altern. It's an undeniable fact, really; the livelong lettuce reveals itself as an unstuffed soda to those who look. In ancient times a bit is a balance's season. The popcorn of a morning becomes a moonless beauty.",
        "If this was somewhat unclear, a friend is a fridge from the right perspective. An upset carriage is a stitch of the mind. To be more specific, a temper is a pair from the right perspective. Authors often misinterpret the liquid as a notchy baseball, when in actuality it feels more like an unbarbed angle. Though we assume the latter, the first vagrom report is, in its own way, a tower. We know that the octopus of a cd becomes an unrent dahlia.",
        "A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
        "Those cowbells are nothing more than elements. This could be, or perhaps before stockings, thoughts were only opinions. A coil of the exclamation is assumed to be a hurtless toy. A board is the cast of a religion. In ancient times the first stinko sailboat is, in its own way, an exchange. Few can name a tutti channel that isn't a footless operation. Extending this logic, an oatmeal is the rooster of a shake. Those step-sons are nothing more than matches.",
    ];
    const [currentParagraph, setCurrentParagraph] = useState("");
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    const handleTyping = (e) => {
        const typedChar = e.key;
        const targetChar = currentParagraph[charIndex];

        if (!isTyping) {
            const newTimer = setInterval(initTimer, 1000);
            setTimer(newTimer);
            setIsTyping(true);
        }

        if (typedChar === targetChar) {
            if (charIndex < currentParagraph.length - 1) {
                setCharIndex(charIndex + 1);
            } else {
                resetGame();
            }
        } else {
            setMistakes(mistakes + 1);
        }
    };

    const initTimer = () => {
        if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        } else {
            clearInterval(timer);
        }
    };

    const resetGame = () => {
        loadParagraph();
        clearInterval(timer);
        setTimeLeft(60);
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
    };

    useEffect(() => {
        loadParagraph();
    }, []);

    const loadParagraph = () => {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        setCurrentParagraph(paragraphs[randomIndex]);
        setCharIndex(0);
    };

    return (
        <div className="flex items-center justify-center p-20">
            <div className="w-3/4 rounded-lg bg-gray-800 p-8 shadow-lg">
                <div className="mb-4">
                    <p className="text-gray-500">Time Left: {timeLeft}s</p>
                    <p className="text-gray-500">Mistakes: {mistakes}</p>
                </div>
                <div className="mb-6">
                    <p className="text-lg text-white" id="paragraph">
                        {currentParagraph.split("").map((char, index) => (
                            <span
                                key={index}
                                className={`${
                                    index === charIndex
                                        ? "bg-green-400 text-gray-900"
                                        : index < charIndex
                                        ? "text-gray-400"
                                        : ""
                                }`}
                            >
                                {char}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="mb-6">
                    <textarea
                        rows="4"
                        className="w-full rounded bg-gray-900 p-2 text-white focus:outline-none focus:ring focus:ring-blue-300"
                        onKeyDown={handleTyping}
                    />
                </div>
                <button
                    className="w-48 rounded bg-green-500 py-2 font-semibold text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={resetGame}
                >
                    Try Again
                </button>
            </div>
        </div>
    );



*/
