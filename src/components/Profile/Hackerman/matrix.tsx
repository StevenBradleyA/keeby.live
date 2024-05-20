import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { act } from "@react-three/fiber";

// npm install gsap

// interface DigitalRainOptions {
//     size: number | (() => number);
//     glyphs: string;
//     rows?: number;
//     fps: number;
//     columns?: number;
//     fontSize?: number;
//     family: string;
//     hue: number;
// }
// interface Column {
//     len?: number;
//     destination?: number;
//     lastDestination?: number;
//     lastLen?: number;
//     chars?: (string | undefined)[];
//     cacheChars?: (string | undefined)[];
//     tailEnd?: number;
//     tailCounter?: number;
//     row?: number;
//     hue?: number;
//     tailOff?: number;
// }

// class DigitalRain {
//     public canvas: HTMLCanvasElement;
//     public context: CanvasRenderingContext2D;
//     public size: number | (() => number);
//     public glyphs: string[];
//     public __ratio: number;
//     public rows: number;
//     public columns: number;
//     public tracker: Column[];
//     public renderMatrix: () => void;
//     public resetOnSize: () => void;
//     public pause!: () => void;
//     public play!: () => void;
//     public options: DigitalRainOptions;
//     public fontSize = 0;
//     public characters = 0;

//     constructor(canvasElement: HTMLCanvasElement, options: DigitalRainOptions) {
//         console.log("Constructing DigitalRain");
//         if (canvasElement.tagName !== "CANVAS") {
//             throw new Error("Need a canvas element");
//         }

//         this.__ratio = window.devicePixelRatio || 1;
//         console.log(`Device pixel ratio: ${this.__ratio}`);
//         this.canvas = canvasElement;
//         this.size = options.size;
//         this.glyphs = options.glyphs.split("");
//         this.context = this.canvas.getContext("2d")!;
//         this.rows = options.rows ?? 1;
//         this.columns = options.columns ?? 1;
//         this.options = options;
//         this.tracker = [];
//         this.renderMatrix = () => this.render();
//         this.resetOnSize = () => this.reset();
//         this.setSize();
//         this.setTracker();
//         this.init();
//     }

//     // updated set col
//     public setColumn(column: Column = {}): Column {
//         console.log("Setting column", column);
//         const { glyphs } = this;
//         const len = gsap.utils.random(6, this.rows, 1);
//         const lastLen = column.len || len;
//         const destination = gsap.utils.random(
//             this.rows * 0.1,
//             this.rows + len,
//             1
//         );
//         const lastDestination = column.destination || destination;
//         const tailEnd = lastDestination + lastLen;
//         let chars = column.chars || [];
//         const cacheChars = [...chars];

//         chars = new Array(Math.max(destination, chars.length))
//             .fill(null)
//             .map((entry, index) => {
//                 if (index <= destination) {
//                     return glyphs[gsap.utils.random(0, glyphs.length - 1, 1)];
//                 } else {
//                     return cacheChars[index];
//                 }
//             });

//         const row = gsap.utils.random(-this.rows, -1, 1);
//         console.log(
//             `Column set: {destination: ${destination}, row: ${row}, len: ${len}}`
//         );
//         return {
//             ...column,
//             chars,
//             cacheChars,
//             destination,
//             lastDestination,
//             lastLen,
//             tailEnd,
//             tailCounter: lastDestination,
//             row,
//             len,
//         };
//     }

//     // upated
//     public setTracker(): void {
//         console.log("Setting tracker");
//         this.tracker = new Array(this.columns)
//             .fill(null)
//             .map(() => this.setColumn());
//         console.log(`Tracker set with ${this.tracker.length} columns`);
//     }
//     // updated
//     public reset(): void {
//         console.log("Resetting DigitalRain");
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         this.setSize();
//         this.setTracker();
//     }
//     // updated
//     public init(): void {
//         console.log("Initializing DigitalRain");
//         this.renderMatrix = () => this.render();
//         this.resetOnSize = () => this.reset();
//         window.addEventListener("resize", this.resetOnSize);
//         gsap.ticker.add(this.renderMatrix);
//         gsap.ticker.fps(this.options.fps);

//         this.pause = () => {
//             gsap.ticker.remove(this.renderMatrix);
//             console.log("DigitalRain paused");
//         };
//         this.play = () => {
//             gsap.ticker.add(this.renderMatrix);
//             console.log("DigitalRain played");
//         };
//     }

//     // updated
//     public getColor(x: number, y: number, column: Column): string {
//         const { hue, row, len, lastLen, lastDestination, tailCounter } = column;
//         const lower = 0.1;
//         const upper = 1;
//         let alpha = 0.1;

//         if (row && len && y <= row) {
//             alpha = gsap.utils.clamp(
//                 lower,
//                 upper,
//                 gsap.utils.mapRange(-len, 0, lower, upper)(y - row)
//             );
//             console.log(
//                 `Calculating color above row: y = ${y}, row = ${row}, alpha = ${alpha}`
//             );
//         } else if (
//             row &&
//             lastDestination &&
//             lastLen &&
//             tailCounter &&
//             y > row &&
//             y <= lastDestination
//         ) {
//             alpha = gsap.utils.clamp(
//                 lower,
//                 upper,
//                 gsap.utils.mapRange(-lastLen, 0, lower, upper)(y - tailCounter)
//             );
//             console.log(
//                 `Alpha for row < y <= lastDestination: y=${y}, lastDestination=${lastDestination}, alpha=${alpha}`
//             );
//         } else if (lastDestination && y > lastDestination) {
//             alpha = lower;
//             console.log(
//                 `Alpha for y > lastDestination: y=${y}, lastDestination=${lastDestination}, alpha=${alpha}`
//             );
//         }
//         return `hsl(${hue || this.options.hue}, 100%, ${
//             row === y ? 100 : 70
//         }%, ${alpha})`;
//     }

//     // render
//     public render(): void {
//         console.log("Rendering called");
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         console.log(`Characters: ${this.characters}, Columns: ${this.columns}`);
//         for (let c = 0; c < this.characters; c++) {
//             const x = c % this.columns;
//             const y = Math.floor(c / this.columns);
//             const column = this.tracker[x];
//             console.log(`Char[${c}]: Pos(${x}, ${y})`);
//             console.log(`Drawing at (${x}, ${y}) with index ${c}`);
//             if (column && column.row && y === 0 && Math.random() > 0.1) {
//                 column.row += 1;
//             }

//             if (
//                 column &&
//                 column.tailCounter &&
//                 column.tailCounter !== column.tailOff &&
//                 y === 0
//             ) {
//                 column.tailCounter += 1;
//             }
//             if (column) {
//                 const row = column.row;

//                 if (row) {
//                     const chars: (string | undefined)[] | undefined =
//                         column[y > row ? "cacheChars" : "chars"];

//                     this.context.fillStyle = this.getColor(x, y, column);

//                     if (chars) {
//                         if (
//                             chars[y] &&
//                             typeof chars === "string" &&
//                             column.cacheChars &&
//                             column.chars &&
//                             column.destination &&
//                             column.len
//                         ) {
//                             if (Math.random() > 0.999 && y > row) {
//                                 column.cacheChars[y] = column.chars[y] = "";
//                             }
//                             if (
//                                 Math.random() > 0.99 &&
//                                 y < row &&
//                                 y < column.destination &&
//                                 y > column.destination - column.len
//                             ) {
//                                 column.cacheChars[y] = column.chars[y] =
//                                     this.glyphs[
//                                         gsap.utils.random(
//                                             0,
//                                             this.glyphs.length - 1,
//                                             1
//                                         )
//                                     ];
//                             }
//                             this.context.fillText(
//                                 chars[y],
//                                 (x + 0.5) * this.fontSize,
//                                 (y + 1) * this.fontSize
//                             );
//                         }
//                         if (
//                             column &&
//                             column.destination &&
//                             row > column.destination
//                         ) {
//                             this.tracker[x] = this.setColumn(column);
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     // updated setsize
//     public setSize(): void {
//         console.log("Setting size of canvas");
//         const { height, width } = this.canvas.getBoundingClientRect();
//         const actualSize =
//             typeof this.options.size === "function"
//                 ? this.options.size()
//                 : this.options.size;

//         this.canvas.height = height * this.__ratio;
//         this.canvas.width = width * this.__ratio;

//         this.fontSize = Math.ceil(actualSize);
//         this.columns = Math.ceil(this.canvas.width / this.fontSize);
//         this.rows = Math.ceil(this.canvas.height / this.fontSize);
//         this.characters = this.rows * this.columns;
//         this.context.font = `${this.fontSize}px ${this.options.family}`;
//         this.context.textAlign = "center";
//         console.log(
//             `Canvas size set: ${this.canvas.width}x${this.canvas.height}, Font size: ${this.fontSize}, Rows: ${this.rows}, Columns: ${this.columns}`
//         );
//     }
// }
// class syntax not working unsure where to debug

// WORKING NON TYPE SAFE CODE
// const DigitalRain = function (
//     el: HTMLCanvasElement,
//     options: DigitalRainOptions
// ) {
//     if (el.tagName !== "CANVAS") return console.error("Need a canvas element");
//     const self = this;

//     self.__ratio = window.devicePixelRatio || 1;
//     self.canvas = el;
//     self.options = options;
//     self.size = options.size;
//     self.glyphs = self.options.glyphs.split("");
//     self.context = el.getContext("2d");
//     self.setSize();
//     self.setTracker();
//     self.init();
//     return self;
// };

// DigitalRain.prototype.setColumn = function (column = {}) {
//     const self = this;
//     const { glyphs } = self;
//     // Set a destination and record len && lastLen
//     const len = gsap.utils.random(6, self.rows, 1);
//     const lastLen = column.len || len;
//     // const destination = self.rows + len
//     const destination = gsap.utils.random(self.rows * 0.1, self.rows + len, 1);
//     const lastDestination = column.destination || destination;
//     // Tracking the last Destination needs a tail off to roll out the old stream
//     const tailEnd = lastDestination + lastLen;

//     // If you have column.chars reuse else reset up to destination
//     let chars = column.chars || [];

//     // When you come in, cache the last set of chars
//     let cacheChars = [...chars];

//     chars = new Array(Math.max(destination, chars.length))
//         .fill()
//         .map((entry, index) => {
//             if (index <= destination) {
//                 return self.glyphs[
//                     gsap.utils.random(0, self.glyphs.length - 1, 1)
//                 ];
//             } else {
//                 return cacheChars[index];
//             }
//         });

//     const row = gsap.utils.random(-self.rows, -1, 1);

//     return {
//         ...column,
//         chars,
//         cacheChars,
//         destination,
//         lastDestination,
//         lastLen,
//         tailEnd,
//         tailCounter: lastDestination,
//         row,
//         len,
//     };
// };

// DigitalRain.prototype.setTracker = function () {
//     const self = this;
//     self.tracker = new Array(self.columns).fill().map(() => self.setColumn());
// };

// DigitalRain.prototype.reset = function () {
//     const self = this;
//     self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
//     self.setSize();
//     self.setTracker();
// };

// DigitalRain.prototype.init = function () {
//     const self = this;
//     self.renderMatrix = () => self.render();
//     self.resetOnSize = () => self.reset();
//     window.addEventListener("resize", self.resetOnSize);
//     gsap.ticker.add(self.renderMatrix);
//     gsap.ticker.fps(self.options.fps);
//     self.pause = () => {
//         gsap.ticker.remove(self.renderMatrix);
//     };
//     self.play = () => {
//         gsap.ticker.add(self.renderMatrix);
//     };
// };

// DigitalRain.prototype.getColor = function (
//     x,
//     y,
//     { hue, row, len, lastLen, lastDestination, tailCounter }
// ) {
//     const self = this;
//     // If y > row but less than last destination, work out the color as if row === column.lastDestination
//     const lower = 0.1;
//     const upper = 1;
//     let alpha = 0.1;

//     if (y <= row) {
//         alpha = gsap.utils.clamp(
//             lower,
//             upper,
//             gsap.utils.mapRange(-len, 0, lower, upper)(y - row)
//         );
//     } else if (y > row && y <= lastDestination) {
//         alpha = gsap.utils.clamp(
//             lower,
//             upper,
//             gsap.utils.mapRange(-lastLen, 0, lower, upper)(y - tailCounter)
//         );
//     } else if (y > lastDestination) {
//         alpha = lower;
//     }
//     return `hsl(${hue || self.options.hue}, 100%, ${
//         row === y ? 100 : 70
//     }%, ${alpha})`;
// };

// DigitalRain.prototype.render = function () {
//     const self = this;
//     self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
//     // Need to try and iterate over every cell in the Matrix...
//     for (let c = 0; c < self.characters; c++) {
//         const x = c % self.columns;
//         const y = Math.floor(c / self.columns);
//         const column = self.tracker[x];

//         // On the first row, let's bump the index
//         if (y === 0 && Math.random() > 0.1) {
//             column.row += 1;
//         }

//         if (column.tailCounter !== column.tailOff && y === 0) {
//             column.tailCounter += 1;
//         }

//         const row = column.row;
//         const chars = column[y > row ? "cacheChars" : "chars"];

//         self.context.fillStyle = self.getColor(x, y, column);

//         if (chars[y]) {
//             if (Math.random() > 0.999 && y > row) {
//                 column.cacheChars[y] = column.chars[y] = "";
//             }
//             if (
//                 Math.random() > 0.99 &&
//                 y < row &&
//                 y < column.destination &&
//                 y > column.destination - column.len
//             ) {
//                 column.cacheChars[y] = column.chars[y] =
//                     self.glyphs[
//                         gsap.utils.random(0, self.glyphs.length - 1, 1)
//                     ];
//             }
//             self.context.fillText(
//                 chars[y],
//                 (x + 0.5) * self.fontSize,
//                 (y + 1) * self.fontSize
//             );
//         }
//         // Reset the column if we go past destination
//         if (row > column.destination) {
//             self.tracker[x] = self.setColumn(column);
//         }
//     }
// };

// DigitalRain.prototype.setSize = function () {
//     const self = this;
//     const { height, width } = self.canvas.getBoundingClientRect();
//     self.canvas.height = height * self.__ratio;
//     self.canvas.width = width * self.__ratio;
//     // Set the font size and get the rows/columns
//     self.fontSize = Math.ceil(
//         typeof self.size === "function" ? self.size() : self.size
//     );
//     self.columns = Math.ceil(self.canvas.width / self.fontSize);
//     // self.columns = 1
//     self.rows = Math.ceil(self.canvas.height / self.fontSize);
//     self.characters = self.rows * self.columns;
//     self.context.font = `${self.fontSize}px ${self.options.family}`;
//     self.context.textAlign = "center";
// };

//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const options = {
//             size: () => window.innerWidth * 0.003,
//             family: "JetBrains Mono, monospace",
//             fps: 24,
//             hue: 120,
//             limiter: 0.25,
//             glyphs: "ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//         };

//         const canvas = canvasRef.current;
//         if (canvas && canvas.tagName === "CANVAS") {
//             const rainEffect = new DigitalRain(canvas, options);
//             window.addEventListener("resize", () => rainEffect.reset());

//             return () => {
//                 window.removeEventListener("resize", () => rainEffect.reset());
//                 rainEffect.pause();
//             };
//         }
//     }, []);

//     return (
//         <canvas
//             ref={canvasRef}
//             style={{
//                 width: "100%",
//                 height: "100%",
//                 // position: "fixed",
//                 // top: 0,
//                 // left: 0,
//             }}
//         />
//     );
// };

export default function MatrixRain() {
    return (
        <>
            <video className=" h-full w-full object-cover" autoPlay loop muted>
                <source
                    src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </>
    );
}
