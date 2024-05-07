// import React, { useState, useEffect } from "react";

// function Key({ char, isWide, onPress, onRelease }) {
//     const keyClass = `key ${isWide ? "key--wide" : ""} ${
//         onPress ? "key--down" : ""
//     }`;
//     return <div className={keyClass}>{char}</div>;
// }

// export default function FreeplayKeyboard() {
//     const [pressedKeys, setPressedKeys] = useState({});

//     useEffect(() => {
//         function handleKeyDown(event) {
//             setPressedKeys((prev) => ({ ...prev, [event.key]: true }));
//         }

//         function handleKeyUp(event) {
//             setPressedKeys((prev) => {
//                 const newState = { ...prev };
//                 delete newState[event.key];
//                 return newState;
//             });
//         }

//         window.addEventListener("keydown", handleKeyDown);
//         window.addEventListener("keyup", handleKeyUp);

//         return () => {
//             window.removeEventListener("keydown", handleKeyDown);
//             window.removeEventListener("keyup", handleKeyUp);
//         };
//     }, []);

//     const keys = [
//         { char: "Q", isWide: false },
//         { char: "W", isWide: false },
//         // Add other keys as needed
//     ];

//     return (
//         <div className="keyboard">
//             {keys.map((key) => (
//                 <Key
//                     key={key.char}
//                     char={key.char}
//                     isWide={key.isWide}
//                     onPress={pressedKeys[key.char.toLowerCase()]}
//                 />
//             ))}
//         </div>
//     );
// }
