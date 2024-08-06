export type ThemeName =
    | "KEEBY"
    | "PIGGY"
    | "PRIMEAGEN"
    | "BANANA"
    | "HIPYO"
    | "KEEBYRED"
    | "HACKERMAN";

interface ThemeStyle {
    title: string;
    baseColor: string;
    secondaryBase: string;
    backgroundColor: string;
    menuInputBackground: string;
    border: string;
    cursor: string;
    hoverText: string;
    hit: string;
    miss: string;
    pause: string;
    textColor: string;
    graphBackground: string;
    graphBorder: string;
    graphHighlight: string;
    keebTextColor: string;
    keebCaseTop: string;
    keebCaseBottom: string;
    keebCaseSide: string;
    keebKeycapBackground: string;
    keebKeycapTop: string;
    keebKeycapSide: string;
    keebKeycapBottom: string;
    keebSpecialBackground: string;
    keebSpecialSide: string;
    keebSpecialTop: string;
    keebSpecialBottom: string;
    screen: string;
    mousepad: string;
}

export const themeStyles: Record<ThemeName, ThemeStyle> = {
    KEEBY: {
        title: "",
        baseColor: "bg-dark",
        secondaryBase: "bg-darkGray",
        backgroundColor: "bg-green-300",
        border: "border-green-300",
        textColor: "text-mediumGray",
        hoverText: "hover:text-green-300",
        cursor: "bg-green-300",
        menuInputBackground: "bg-white/30",
        pause: "text-green-300",
        hit: "text-white",
        miss: "text-red-500",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",
        keebTextColor: "text-black",
        keebCaseTop: "border-t-[#668866]",
        keebCaseBottom: "border-b-[#88aa88]",
        keebCaseSide: "border-x-[#778877]",
        keebKeycapBackground: "bg-[#e8f0e6]",
        keebKeycapTop: "#e8f4e4",
        keebKeycapSide: "#dae8d6",
        keebKeycapBottom: "#c4e4c4",
        keebSpecialBackground: "bg-[#738474]",
        keebSpecialSide: "#697a6f",
        keebSpecialTop: "#748478",
        keebSpecialBottom: "#66756d",
        screen: "screen-keeby",
        mousepad: "deskmat-keeby",
    },
    KEEBYRED: {
        title: "",
        baseColor: "bg-dark",
        secondaryBase: "bg-darkGray",
        backgroundColor: "bg-red-500",
        border: "border-red-500",
        textColor: "text-mediumGray",
        hoverText: "hover:text-red-500",
        cursor: "bg-red-500",
        menuInputBackground: "bg-white/30",
        pause: "text-red-500",
        hit: "text-white",
        miss: "text-red-800",
        graphBackground: "rgba(239, 68, 68, 0.3)",
        graphBorder: "rgba(239, 68, 68, 0.5)",
        graphHighlight: "rgba(239, 68, 68)",
        keebTextColor: "text-white",
        keebCaseTop: "border-t-[#C0C0C0]",
        keebCaseBottom: "border-b-[#A9A9A9]",
        keebCaseSide: "border-x-[#BEBEBE]",
        keebKeycapBackground: "bg-[#d32f2f]",
        keebKeycapTop: "#e53935",
        keebKeycapSide: "#c62828",
        keebKeycapBottom: "#b71c1c",
        keebSpecialBackground: "bg-[#d32f2f]",
        keebSpecialSide: "#c62828",
        keebSpecialTop: "#e53935",
        keebSpecialBottom: "#b71c1c",
        screen: "screen-red",
        mousepad: "deskmat-keeby-red",
    },
    // matrix
    // --bg-color: #000000;
    //   --main-color: #15ff00;
    //   --caret-color: #15ff00;
    //   --sub-color: #006500;
    //   --sub-alt-color: #032000;
    //   --text-color: #d1ffcd;
    //   --error-color: #da3333;
    //   --error-extra-color: #791717;
    //   --colorful-error-color: #da3333;
    //   --colorful-error-extra-color: #791717;
    HACKERMAN: {
        title: "png-hackerman",
        baseColor: "bg-[#000000]",
        secondaryBase: "bg-darkGray",
        backgroundColor: "bg-black",
        border: "border-[#15ff00]",
        textColor: "text-mediumGray",
        hoverText: "hover:text-mediumGray",
        cursor: "bg-[#15ff00]",
        menuInputBackground: "bg-white/30",
        pause: "text-mediumGray",
        hit: "text-[#15ff00]",
        miss: "text-red-800",
        graphBackground: "rgba(21, 255, 0, 0.3)",
        graphBorder: "rgba(21, 255, 0, 0.5)",
        graphHighlight: "rgba(21, 255, 0, 1)",
        keebTextColor: "text-[#0F0]",
        keebCaseTop: "border-t-[#1A1A1A]",
        keebCaseBottom: "border-b-[#333333]",
        keebCaseSide: "border-x-[#1A1A1A]",
        keebKeycapBackground: "bg-[#121212]",
        keebKeycapTop: "#1A1A1A",
        keebKeycapSide: "#333333",
        keebKeycapBottom: "#1A1A1A",
        keebSpecialBackground: "bg-[#003300]",
        keebSpecialSide: "#004d00",
        keebSpecialTop: "#006400",
        keebSpecialBottom: "#004d00",
        screen: "screen-hackerman",
        mousepad: "deskmat-sliding-grid",
    },
    PIGGY: {
        title: "png-white",
        baseColor: "bg-[#fcd5ce]",
        secondaryBase: "bg-[#f8edeb]",
        backgroundColor: "bg-[#f9dcc4]",
        border: "border-[#ffff]",
        textColor: "text-[#383838]",
        hoverText: "hover:text-[#fab4a9]",
        cursor: "bg-[#ffffff]",
        menuInputBackground: "bg-[#f8edeb]/30",
        pause: "text-[#fab4a9]",
        hit: "text-[#ffffff]",
        miss: "text-[#db7093]",
        graphBackground: "rgba(0, 0, 0, 0.1)",
        graphBorder: "rgba(255, 225, 225)",
        graphHighlight: "rgba(255, 225, 225)",
        keebTextColor: "text-[#4A4A4A]",
        keebCaseTop: "border-t-[#FFFFFF]",
        keebCaseBottom: "border-b-[#FFFFFF]",
        keebCaseSide: "border-x-[#FFFFFF]",
        keebKeycapBackground: "bg-[#FFC0CB]",
        keebKeycapTop: "#FFE4E1",
        keebKeycapSide: "#FFD1DC",
        keebKeycapBottom: "#FFDDDD",
        keebSpecialBackground: "bg-[#FFB6C1]",
        keebSpecialSide: "#FFC0CB",
        keebSpecialTop: "#FFFFFF",
        keebSpecialBottom: "#FFDDDD",
        screen: "screen-pink",
        mousepad: "deskmat-piggy",
    },
    PRIMEAGEN: {
        title: "png-primeagen",
        baseColor: "bg-[#1f1d27]",
        secondaryBase: "bg-darkGray",
        backgroundColor: "bg-[#9ccfd8]",
        border: "border-[#e0def4]",
        textColor: "text-[#c4a7e7]",
        hoverText: "hover:text-[#f6c177]",
        cursor: "bg-[#f6c177]",
        menuInputBackground: "bg-white/30",
        pause: "text-[#9ccfd8]",
        hit: "text-[#e0def4]",
        miss: "text-[#eb6f92]",
        graphBackground: "rgba(224, 222, 244, 0.3)",
        graphBorder: "rgba(224, 222, 244, 0.5)",
        graphHighlight: "rgba(156, 207, 216)",
        keebTextColor: "text-black",
        keebCaseTop: "border-t-[#3c3546]",
        keebCaseBottom: "border-b-[#5a4e68]",
        keebCaseSide: "border-x-[#4e415b]",
        keebKeycapBackground: "bg-[#c4a7e7]",
        keebKeycapTop: "#e0def4",
        keebKeycapSide: "#b0a6c5",
        keebKeycapBottom: "#9487a3",
        keebSpecialBackground: "bg-[#e0def4]",
        keebSpecialSide: "#b0a6c5",
        keebSpecialTop: "#c4a7e7",
        keebSpecialBottom: "#9487a3",
        screen: "screen-purple",
        mousepad: "deskmat-primeagen",
    },
    HIPYO: {
        title: "png-hipyo",
        baseColor: "bg-[#6A4C93]",
        secondaryBase: "bg-[#9C77B0]",
        backgroundColor: "bg-[#BAB1D7]",
        border: "border-[#9575CD]",
        textColor: "text-[#D1C4E9]",
        hoverText: "hover:text-[#B39DDB]",
        cursor: "bg-[#B39DDB]",
        menuInputBackground: "bg-white/30",
        pause: "text-[#EDE7F6]",
        hit: "text-[#9575CD]",
        miss: "text-[#F06292]",
        graphBackground: "rgba(189, 168, 212, 0.3)",
        graphBorder: "rgba(173, 158, 202, 0.5)",
        graphHighlight: "rgba(209, 196, 233)",

        keebTextColor: "text-[#a7e12b]",
        keebCaseTop: "border-t-[#1f1d27]",
        keebCaseBottom: "border-b-[#1a1a1a]",
        keebCaseSide: "border-x-[#141414]",
        keebKeycapBackground: "bg-[#4b4067]",
        keebKeycapTop: "#5b5077",
        keebKeycapSide: "#3b3057",
        keebKeycapBottom: "#2b2047",
        keebSpecialBackground: "bg-[#1a1a1a]",
        keebSpecialSide: "#0f0f0f",
        keebSpecialTop: "#2a2a2a",
        keebSpecialBottom: "#1a1a1a",
        screen: "screen-hackerman",
        mousepad: "deskmat-light-purple",
    },
    BANANA: {
        title: "png-white",
        baseColor: "bg-[#FDF4C9]",
        secondaryBase: "bg-[#F9F0AC]",
        backgroundColor: "bg-[#FFFBEA]",
        border: "border-[#ffff]",
        textColor: "text-[#8A6201]",
        hoverText: "hover:text-[#fdd835]",
        cursor: "bg-[#fdd835]",
        menuInputBackground: "bg-white/30",
        pause: "text-[#AED581]",
        hit: "text-[#FEE528]",
        miss: "text-[#FF7043]",
        graphBackground: "rgba(255, 250, 205, 0.3)",
        graphBorder: "rgba(255, 235, 59, 0.5)",
        graphHighlight: "rgba(246, 232, 177)",
        keebTextColor: "text-[#8B4513]",
        keebCaseTop: "border-t-[#EED9C4]",
        keebCaseBottom: "border-b-[#EED9C4]",
        keebCaseSide: "border-x-[#EED9C4]",
        keebKeycapBackground: "bg-[#F0EAD6]",
        keebKeycapTop: "#FFFDF5",
        keebKeycapSide: "#EED9C4",
        keebKeycapBottom: "#E4DCCD",
        keebSpecialBackground: "bg-[#FFE135]",
        keebSpecialSide: "#FFE135",
        keebSpecialTop: "#FFE135",
        keebSpecialBottom: "#FFE135",
        screen: "screen-light-brown",
        mousepad: "deskmat-banana",
    },
};
// night runner
// --bg-color: #212121;
// --main-color: #feff04;
// --caret-color: #feff04;
// --sub-color: #5c4a9c;
// --sub-alt-color: #1a1a1a;
// --text-color: #e8e8e8;
// --error-color: #da3333;
// --error-extra-color: #791717;
// --colorful-error-color: #da3333;
// --colorful-error-extra-color: #791717;

// botanical

// --bg-color: #7b9c98;
// --main-color: #eaf1f3;
// --caret-color: #abc6c4;
// --sub-color: #495755;
// --sub-alt-color: #72908d;
// --text-color: #eaf1f3;
// --error-color: #f6c9b4;
// --error-extra-color: #f59a71;
// --colorful-error-color: #f6c9b4;
// --colorful-error-extra-color: #f59a71;
// }

// comfy

// --bg-color: #4a5b6e;
// --main-color: #f8cdc6;
// --caret-color: #9ec1cc;
// --sub-color: #9ec1cc;
// --sub-alt-color: #425366;
// --text-color: #f5efee;
// --error-color: #c9465e;
// --error-extra-color: #c9465e;
// --colorful-error-color: #c9465e;
// --colorful-error-extra-color: #c9465e;

// EVA
// --bg-color: #181c18;
// --main-color: #00ce7c;
// --caret-color: #00ce7c;
// --sub-color: #9578d3;
// --sub-alt-color: #131613;
// --text-color: #c2fbe1;
// --error-color: #ff5f5f;
// --error-extra-color: #d22a2a;
// --colorful-error-color: #ff5f5f;
// --colorful-error-extra-color: #d22a2a;

// gray with green highlights keeb data
// keebTextColor: "text-black",  // High readability
// keebCaseTop: "border-t-[#BBBBBB]",  // Subtle border top
// keebCaseBottom: "border-b-[#BBBBBB]",  // Subtle border bottom
// keebCaseSide: "border-x-[#BBBBBB]",  // Subtle border sides
// keebKeycapBackground: "bg-[#E0E0E0]",  // Neutral keycap background
// keebKeycapTop: "#F0F0F0",  // Lighter top for lighting effect
// keebKeycapSide: "#BBBBBB",  // Darker sides for depth
// keebKeycapBottom: "#C0C0C0",  // Shadowed bottom
// keebSpecialBackground: "bg-[#86EFAC]",  // Green for special keys
// keebSpecialSide: "#86EFAC",  // Same green for special key sides
// keebSpecialTop: "#86EFAC",  // Green top for special keys
// keebSpecialBottom: "#86EFAC",  // Consistent green for coherence

// cool gray and green board again
// keebTextColor: "text-[#a7e12b]",
// keebCaseTop: "border-t-[#2c2f33]",
// keebCaseBottom: "border-b-[#23272a]",
// keebCaseSide: "border-x-[#1c1f23]",
// keebKeycapBackground: "bg-[#3a3d43]",
// keebKeycapTop: "#4a4d53",
// keebKeycapSide: "#34373b",
// keebKeycapBottom: "#292b30",
// keebSpecialBackground: "bg-[#5a5e66]",
// keebSpecialSide: "#484b52",
// keebSpecialTop: "#62676e",
// keebSpecialBottom: "#41444a",

// OG gray board
// keebTextColor: "text-black",
// keebCaseTop: "border-t-[#666]",
// keebCaseBottom: "border-b-[#888]",
// keebCaseSide: "border-x-[#777]",
// keebKeycapBackground: "bg-[#e9e8e6]",
// keebKeycapTop: "#ece8e4",
// keebKeycapSide: "#dedad6",
// keebKeycapBottom: "#c9c4c4",
// keebSpecialBackground: "bg-[#7f8384]",
// keebSpecialSide: "#696c6f",
// keebSpecialTop: "#848789",
// keebSpecialBottom: "#676a6d",
