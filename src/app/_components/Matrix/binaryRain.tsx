"use client";

import { useEffect, useRef } from "react";

interface BinaryRainProps {
    textColor: string;
    fontSize: number;
    letters: string;
}

export default function BinaryRain({
    textColor,
    fontSize,
    letters,
}: BinaryRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // const letters = "010110";
        // const font_size = 10;
        const lettersArr = letters.split("");
        let height = (canvas.height = window.innerHeight);
        let width = (canvas.width = window.innerWidth);
        const columns = width / fontSize;
        const drops: number[] = Array.from({ length: columns }, () => 1);

        let frame = 1;

        const clear = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);
        };

        const showLetters = () => {
            ctx.fillStyle = textColor;
            ctx.font = `${fontSize}px Gotham`;

            drops.forEach((drop, i) => {
                const text =
                    lettersArr[Math.floor(Math.random() * lettersArr.length)];

                if (drop !== undefined && text !== undefined) {
                    const textPosY = drop * fontSize;
                    ctx.fillText(text, i * fontSize, textPosY);

                    if (textPosY > height && Math.random() > 0.956) {
                        drops[i] = 0;
                    }

                    if (drops[i] !== undefined) drops[i]++;
                }
            });
        };

        const draw = () => {
            if (frame === 1) {
                clear();
                showLetters();
            } else if (frame === 2) {
                frame = 0;
            }

            frame++;
            window.requestAnimationFrame(draw);
        };

        window.requestAnimationFrame(draw);

        const resizeHandler = () => {
            height = canvas.height = window.innerHeight;
            width = canvas.width = window.innerWidth;
        };

        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [textColor, fontSize, letters]);

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    );
}
