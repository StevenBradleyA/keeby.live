"use client";
import { setCookie } from "cookies-next";
import type { ThemeStyle } from "../Theme/themeStyles";

interface CategoryModalProps {
    setScholarType: (mode: string) => void;
    scholarType: string;
    closeCategoryModal: () => void;
    styles: ThemeStyle;
}

export default function CategoryModal({
    scholarType,
    setScholarType,
    closeCategoryModal,
    styles,
}: CategoryModalProps) {
    const handleCategoryChange = (newScholarType: string) => {
        setCookie("scholarType", newScholarType, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setScholarType(newScholarType);
        closeCategoryModal();
    };

    //  history
    // space and astronomy
    // Quotes -- famous quotes
    // Mythology
    // Inventions
    // Video Games
    // Biology

    return (
        <>
            <div
                className={`flex gap-2 w-[300px] h-[500px] flex-col overflow-y-auto px-5  text-white`}
            >
                <button
                    onClick={() => handleCategoryChange("animals")}
                    className={` w-full items-center rounded-lg ease-in flex justify-between  ${styles.hoverBackground} ${scholarType === "animals" ? `border-2 ${styles.border}` : ""} p-2`}
                >
                    animals
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        version="1.1"
                    >
                        <g fill="none" fillRule="evenodd">
                            <g
                                id="ic_fluent_teddy_24_regular"
                                fill="currentColor"
                                fillRule="nonzero"
                            >
                                <path d="M17.5,3.875 C19.7782,3.875 21.625,5.72183 21.625,8 C21.625,9.2471 21.0714,10.36501 20.1971,11.12122 C20.4748,11.86972 20.625,12.66939 20.625,13.5 C20.625,15.89 19.382,18.0188 17.4446,19.4143 C17.1624,19.6176 16.8653,19.8054 16.5551,19.9763 L16.5183,19.9964 C15.2037,20.7125 13.6559,21.125 12,21.125 C10.34411,21.125 8.79628,20.7124 7.48166,19.9964 C7.1745,19.8291 6.88004,19.6452 6.59991,19.4462 L6.55539,19.4143 C4.61803,18.0188 3.375,15.89 3.375,13.5 C3.375,12.66939 3.52525,11.86971 3.80294,11.12122 C2.92856,10.36501 2.375,9.2471 2.375,8 C2.375,5.72183 4.22183,3.875 6.5,3.875 C8.07432,3.875 9.44244,4.75696 10.1376,6.05321 C10.73749,5.9365 11.36069,5.875 12,5.875 C12.6393,5.875 13.2625,5.9365 13.8624,6.05321 C14.5576,4.75696 15.9257,3.875 17.5,3.875 Z M13.5225,16.3968 C13.4126,16.6012 13.2228,16.7712 12.99,16.8943 C12.7145,17.04 12.3705,17.125 12,17.125 C11.62961,17.125 11.28562,17.0401 11.01014,16.8944 C10.77744,16.7713 10.58761,16.6014 10.47768,16.3971 C9.33578,16.8209 8.41869,17.7081 7.95497,18.8301 C9.1128,19.4892 10.50081,19.875 12,19.875 C13.4993,19.875 14.8874,19.4892 16.0453,18.8299 C15.7958,18.2257 15.4115,17.6816 14.9154,17.2378 C14.5045,16.8703 14.0326,16.586 13.5225,16.3968 Z M12,7.125 C7.88428,7.125 4.625,10.02458 4.625,13.5 C4.625,15.2987 5.49533,16.9402 6.9074,18.1082 C7.80618,16.1978 9.74847,14.875 12,14.875 C13.4399,14.875 14.7538,15.4162 15.7487,16.3061 C16.3092,16.8075 16.7686,17.4196 17.0926,18.1082 C18.5047,16.9402 19.375,15.2987 19.375,13.5 C19.375,10.02458 16.1157,7.125 12,7.125 Z M6.5,5.125 C4.91218,5.125 3.625,6.41218 3.625,8 C3.625,8.73272 3.90091,9.41662 4.37336,9.93541 C5.34066,8.32097 6.94287,7.05326 8.88195,6.38844 C8.35812,5.61513 7.47532,5.125 6.5,5.125 Z M17.5,5.125 C16.5254,5.125 15.6424,5.6143 15.1181,6.38845 C17.0571,7.05327 18.6593,8.32095 19.6266,9.93534 C20.1002,9.41558 20.375,8.73173 20.375,8 C20.375,6.41218 19.0878,5.125 17.5,5.125 Z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleCategoryChange("vocab")}
                    className={` w-full items-center rounded-lg ease-in flex justify-between  ${styles.hoverBackground} ${scholarType === "vocab" ? `border-2 ${styles.border}` : ""} p-2`}
                >
                    vocab
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M8.316 2.07a.75.75 0 00-.632 0l-7 3.25a.75.75 0 000 1.36l1.434.666A.746.746 0 002 7.75V11a.75.75 0 00.158.46L2.75 11l-.592.46.001.002.001.001.003.004.008.01a1.882 1.882 0 00.103.12c.068.076.165.178.292.299.254.24.63.555 1.132.866C4.706 13.388 6.217 14 8.25 14c2.037 0 3.44-.615 4.345-1.266a5.32 5.32 0 00.977-.902 3.916 3.916 0 00.322-.448l.007-.012.003-.004v-.002h.001c0-.001 0-.002-.655-.366l.655.365A.754.754 0 0014 11V7.75a.747.747 0 00-.118-.404l1.434-.666a.75.75 0 000-1.36l-7-3.25zM12.5 7.988L8.316 9.93a.75.75 0 01-.632 0L3.5 7.988v2.723a5.585 5.585 0 00.99.776c.804.5 2.043 1.013 3.76 1.013 1.713 0 2.81-.51 3.468-.984a3.812 3.812 0 00.782-.745V7.988zM8 8.423L2.781 6 8 3.577 13.219 6 8 8.423z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => handleCategoryChange("keyboards")}
                    className={` w-full items-center rounded-lg ease-in flex justify-between  ${styles.hoverBackground} ${scholarType === "keyboards" ? `border-2 ${styles.border}` : ""} p-2`}
                >
                    keyboards
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </>
    );
}
