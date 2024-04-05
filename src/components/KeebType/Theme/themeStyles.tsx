export type ThemeName = "KEEBY" | "PIGGY" | "PRIMEAGEN" | "BANANA" | "HIPYO" | "KEEBYRED";

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
}

export const themeStyles: Record<ThemeName, ThemeStyle> = {
    KEEBY: {
        title: "",
        baseColor: "bg-dark",
        secondaryBase: "bg-keebyGray",
        backgroundColor: "bg-green-300",
        border: "border-green-300",
        textColor: "text-darkGray",
        hoverText: "hover:text-green-300",
        cursor: "bg-green-300",
        menuInputBackground: "bg-white/30",
        pause: "text-green-300",
        hit: "text-white",
        miss: "text-red-500",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",
    },
    KEEBYRED: {
        title: "",
        baseColor: "bg-dark",
        secondaryBase: "bg-keebyGray",
        backgroundColor: "bg-red-500",
        border: "border-red-500",
        textColor: "text-darkGray",
        hoverText: "hover:text-red-500",
        cursor: "bg-red-500",
        menuInputBackground: "bg-white/30",
        pause: "text-red-500",
        hit: "text-white",
        miss: "text-red-800",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",
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
    },
    PRIMEAGEN: {
        title: "png-primeagen",
        baseColor: "bg-[#1f1d27]",
        secondaryBase: "bg-keebyGray",
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
    },
    HIPYO: {
        title: "png-hipyo",
        baseColor: "bg-[#6A4C93]", 
        secondaryBase: "bg-[#9C77B0]",
        backgroundColor: "bg-[#BAB1D7]", //#EDE7F6 #CEC5EB
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
