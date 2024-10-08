"use client";
import { useEffect, useState } from "react";

interface TitleScriptsProps {
    page: string;
}

export default function TitleScripts({ page }: TitleScriptsProps) {
    const [title, setTitle] = useState("");
    // 01101000 01100001 01100011 01101011 00100000 01110100 01101001 01101101 01100101 --- hacktime in binary
    // 01101000 01100001 01100011 01101011 -- hack
    // "Quantum Computing in 3, 2, 1...",
    // "C:\\> Hello, World!",
    // "Calculating Quantum Nostalgia",
    // "Insert Coin to Continue",
    // "Defragmenting Memories",
    // "Initializing Time-Traveling Circuits",
    // "Pogchamp Error 404: Cringe Not Found",
    //  "Welcome, Time Traveler! Please Prove Your Identity",
    //   "Initiating Login Sequence... Brace for Time Travel",
    // "Loading 8-bit Security Wall... Please Authenticate",
    //  "Initiating Login Sequence... Brace for Time Travel",
    // "Ctrl + Alt + Authenticate: What's the Magic Word?",
    // "Time Hack Sequence Complete",
    //             "checking systems",
    //             "deleting hard drive",
    //             "jk",
    //             "your profile",

    // System Prompt:

    // Query: "Execute command: Confirm/Abort?"
    // Options: "Execute" / "Abort"
    // Vintage Terminal Style:

    // Query: "Proceed with operation? (Y/N)"
    // Options: "Y" / "N"
    // Matrix-Inspired:

    // Query: "Enter the Matrix? Red pill/Blue pill?"
    // Options: "Red pill" / "Blue pill"
    // Old-School Computer Dialogue:

    // Query: "Load next sequence? Confirm/Deny"
    // Options: "Confirm" / "Deny"
    // Classic DOS Style:

    // Query: "Run program now? Yes/No"
    // Options: "Yes" / "No"
    // Vintage Gaming Style:

    // Query: "Start new adventure? Ready/Not ready"
    // Options: "Ready" / "Not ready"
    // Retro Sci-Fi Computer:

    // Query: "Initiate time warp? Engage/Standby"
    // Options: "Engage" / "Standby"
    // Early Internet Era:

    // Query: "Connect to the Web? Connect/Disconnect"
    // Options: "Connect" / "Disconnect"
    // Old Computer Boot-up:

    // Query: "Boot system now? Boot/Halt"
    // Options: "Boot" / "Halt"
    // Classic Text Adventure:

    // Query: "Open the mysterious door? Open/Leave"
    // Options: "Open" / "Leave"

    useEffect(() => {
        if (page === "createListing") {
            const phrases = [
                "Please Stand By",
                "Scanning for Thock",
                "ಠ_ಠ none found",
                "Create a Listing",
            ];
            const delay = [0, 2000, 4000, 6000, 8000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }
        if (page === "editListing") {
            const phrases = [
                "Please Stand By",
                "Scanning for Thock",
                "ಠ_ಠ none found",
                "Edit a Listing",
            ];
            const delay = [0, 2000, 4000, 6000, 8000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }

        // "Prove Your Identity - Then Announce, Im In",
        if (page === "login") {
            const phrases = [
                "Initiating Login Sequence",
                "Accessing Mainframe",
                "Access Granted",
                "Welcome back you've been missed",
            ];
            const delay = [0, 2000, 4000, 6000, 8000, 10000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }
        if (page === "loginPlus") {
            const phrases = [
                "User Authentication Complete",
                "Booting Login Protocol",
                "Almost done just a few more",
                "Choose your identity",
            ];
            const delay = [0, 2000, 4000, 6000, 8000, 10000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }
        if (page === "keebdex") {
            const phrases = [
                "Insert Coin to Continue",
                "Defragmenting Memories",
                "Scanning Groupbuys",
                "Pogchamp Error 404: Cringe Not Found",
                "Keeb Dex",
            ];
            const delay = [0, 2000, 4000, 6000, 8000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }

        if (page === "profile") {
            const phrases = [
                "Time Hack Sequence Complete",
                "checking systems",
                "deleting hard drive",
                "jk",
                "Profile",
            ];
            const delay = [0, 2000, 4000, 6000, 8000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }

        if (page === "publicProfile") {
            const phrases = [
                "C:\\> Initiating profile sequence",
                "checking systems",
                "deleting hard drive",
                "jk",
                "Public Profile",
            ];
            const delay = [0, 2000, 4000, 6000, 8000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }

        if (page === "offerSeller") {
            const phrases = [
                "Awaiting Buyer Verification",
                "Taking longer than a group buy",
                "Keeby will notify you when they verify",
                "Waiting on Buyer",
            ];
            const delay = [0, 4000, 8000, 12000, 16000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }
        if (page === "offerBuyer") {
            const phrases = [
                "Awaiting Seller Response",
                "Taking longer than a group buy",
                "Keeby will notify you if they accept",
                "Waiting on Seller",
            ];
            const delay = [0, 4000, 8000, 12000, 16000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i]),
            );
        }
    }, [page]);

    return <h2 className="moving-title">{title}</h2>;
}
