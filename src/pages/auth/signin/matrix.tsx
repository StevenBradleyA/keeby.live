import React, { useEffect, useRef } from "react";

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const letters = "0101010101";
    const font_size = 32;
    const columns =
        typeof window !== "undefined"
            ? Math.floor(window.innerWidth / font_size)
            : 0;
    const drops = Array.from({ length: columns }, () => 1);
    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            console.error("Canvas element is null.");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Canvas 2D rendering context is not available.");
            return;
        }

        let height = (canvas.height = window.innerHeight);
        let width = (canvas.width = window.innerWidth);
        const columns = width / font_size;

        letters.split("").forEach(() => {
            drops.push(1);
        });

        function draw() {
            if (frame === 1) {
                clear();
                showLetters();
            } else if (frame === 2) {
                frame = 0;
            }

            frame++;
            window.requestAnimationFrame(draw);
        }

        function showLetters() {
            ctx.fillStyle = "#48bb78";
            ctx.font = font_size + "px Gotham";

            // Increase vertical spacing by multiplying textPosY with a factor (e.g., 1.5)
            const verticalSpacingFactor = 5;

            for (let i = 0; i < drops.length; i++) {
                let text = letters[Math.floor(Math.random() * letters.length)];

                // Multiply textPosY with the vertical spacing factor
                let textPosY = drops[i] * font_size * verticalSpacingFactor;

                ctx.fillText(text, i * font_size, textPosY);

                if (textPosY > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }

                drops[i] += 0.2;
            }
        }

        function clear() {
            // Draw a semi-transparent black rectangle to create a trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            // Clear the canvas completely to start the new frame
            // ctx.clearRect(0, 0, width, height);
        }

        let frame = 1;
        draw();

        window.addEventListener("resize", function () {
            height = canvas.height = window.innerHeight;
            width = canvas.width = window.innerWidth;
        });

        return () => {
            window.removeEventListener("resize", function () {});
        };
    }, []);

    return (
        <div className="relative w-full ">


        <div className="pointer-events-none absolute left-0 top-1/3 w-[50%] h-[500px]">
            <canvas
                ref={canvasRef}
                className="h-full rounded-3xl bg-black text-green-500"
                style={{ zIndex: -1 }}
                height={100}
                width={400}
            ></canvas>
        </div>

        </div>
    );
};

export default CanvasComponent;
