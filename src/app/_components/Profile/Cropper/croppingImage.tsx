"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

interface CroppedImageProps {
    imageFiles: File[];
    setImageFiles: (imageFiles: File[]) => void;
    setShowCropper: (cropper: boolean) => void;
}

export default function CroppedImage({
    imageFiles,
    setImageFiles,
    setShowCropper,
}: CroppedImageProps) {
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null,
    );

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const getCroppedImg = (imageSrc: string, crop: Area): Promise<File> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    return reject(new Error("Failed to get canvas context"));
                }

                canvas.width = crop.width;
                canvas.height = crop.height;

                ctx.drawImage(
                    image,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    crop.width,
                    crop.height,
                );

                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject(new Error("Failed to create blob"));
                    }
                    if (imageFiles && imageFiles[0]) {
                        const croppedFile = new File(
                            [blob],
                            imageFiles[0].name,
                            {
                                type: "image/jpeg",
                            },
                        );
                        resolve(croppedFile);
                    }
                }, "image/jpeg");
            };

            image.onerror = (error) => reject(error);
        });
    };
    const handleCrop = async () => {
        if (imageFiles && imageFiles[0] && croppedAreaPixels) {
            const croppedFile = await getCroppedImg(
                URL.createObjectURL(imageFiles[0]),
                croppedAreaPixels,
            );
            setImageFiles([croppedFile]); // Update the imageFiles array with the cropped file
            setShowCropper(false);
        }
    };

    return (
        <div className="w-full h-full absolute left-0 right-0 top-0 bottom-0 p-5">
            {imageFiles && imageFiles[0] && (
                <div className="relative w-full h-full z-40">
                    <Cropper
                        image={URL.createObjectURL(imageFiles[0])}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        style={{
                            containerStyle: {
                                background: "rgba(0, 0, 0, 0.8)",
                                borderRadius: "15px",
                                overflow: "hidden",
                            },
                        }}
                    />
                </div>
            )}
            <div className="w-full flex justify-center absolute -bottom-10">
                <button
                    className=" px-8  py-3 bg-green-500 shadow-2xl rounded-lg mt-5 flex justify-center hover:opacity-80 items-center gap-1"
                    style={{
                        boxShadow: "0 0 20px #22C55E",
                    }}
                    onClick={() => void handleCrop()}
                >
                    Crop
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 "
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M5.5 2a1 1 0 00-2 0v2H2a1 1 0 000 2h12v7h2V5a1 1 0 00-1-1H5.5V2zm-2 5v8a1 1 0 001 1H14v2a1 1 0 102 0v-2h2a1 1 0 100-2H5.5V7h-2z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
