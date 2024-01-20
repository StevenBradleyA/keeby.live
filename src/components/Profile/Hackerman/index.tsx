import { useEffect, useRef, useState } from "react";

interface Command {
    fullText: string;
    displayedText: string;
}
const scripts: string[] = [
    "Performing DNS Lookups for Data Structure",
    "fake hack initializing...",
    "poggers detected...",
    "engaging pogchamp mode...",
    " Authorizing...",
];

export default function HackermanConsoleCommands() {
    // State to hold an array of Command objects
    const [outputText, setOutputText] = useState<Command[]>([]);

    // State to track the current index of the script being displayed
    const [currentScriptIndex, setCurrentScriptIndex] = useState(0);

    // Ref to keep a reference to the console output div for scrolling purposes
    const consoleOutputRef = useRef<HTMLDivElement | null>(null);

    // Maximum number of commands to display in the console
    const maxCommands = 100;

    // useEffect hook to handle the addition of new commands
    useEffect(() => {
        // Function to add a new command to the console
        const addOutputText = () => {
            // Get the current script, or use a default script if undefined
            const script = scripts[currentScriptIndex] || "Default script";

            // Create a new command object with the script
            const newCommand: Command = {
                fullText: script,
                displayedText: script,
            };

            // Update the outputText state to include the new command
            setOutputText((prev) => {
                let newOutput = [...prev, newCommand];
                // If the number of commands exceeds maxCommands, remove the oldest
                if (newOutput.length > maxCommands) {
                    newOutput = newOutput.slice(-maxCommands);
                }
                return newOutput;
            });

            // Update the script index for the next cycle
            setCurrentScriptIndex(
                (prevIndex) => (prevIndex + 1) % scripts.length
            );

            // Scroll the console output to the bottom
            if (consoleOutputRef.current) {
                consoleOutputRef.current.scrollTop =
                    consoleOutputRef.current.scrollHeight;
            }
        };

        // Set an interval to regularly call addOutputText
        const interval = setInterval(addOutputText, 500);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [currentScriptIndex]);

    return (
        <div
            className="scroll hide-scrollbar h-full overflow-auto"
            ref={consoleOutputRef}
        >
            {outputText.map((command, index) => (
                <p key={index}>{command.displayedText}</p>
            ))}
        </div>
    );
}
