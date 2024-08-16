import { useEffect } from "react";

interface SentenceGeneratorProps {
    gameLength: number;
    setPrompt: (prompt: string[]) => void;
}

export default function SentenceGenerator({
    gameLength,
    setPrompt,
}: SentenceGeneratorProps) {
    // todo prevent repeat words
    //
    const wordBank: string[] = [
        "the",
        "and",
        "you",
        "that",
        "was",
        "for",
        "are",
        "with",
        "his",
        "they",
        "this",
        "have",
        "from",
        "one",
        "had",
        "word",
        "but",
        "not",
        "what",
        "all",
        "were",
        "we",
        "when",
        "your",
        "can",
        "said",
        "there",
        "use",
        "each",
        "which",
        "she",
        "do",
        "how",
        "their",
        "if",
        "will",
        "up",
        "other",
        "about",
        "out",
        "many",
        "then",
        "them",
        "these",
        "so",
        "some",
        "her",
        "would",
        "make",
        "like",
        "him",
        "into",
        "time",
        "has",
        "look",
        "two",
        "more",
        "write",
        "go",
        "see",
        "number",
        "no",
        "way",
        "could",
        "people",
        "my",
        "than",
        "first",
        "water",
        "been",
        "call",
        "who",
        "oil",
        "its",
        "now",
        "find",
        "long",
        "down",
        "day",
        "did",
        "get",
        "come",
        "made",
        "may",
        "part",
        "over",
        "new",
        "sound",
        "take",
        "only",
        "little",
        "work",
        "know",
        "place",
        "years",
        "live",
        "me",
        "back",
        "give",
        "most",
        "very",
        "after",
        "thing",
        "our",
        "just",
        "name",
        "good",
        "sentence",
        "man",
        "think",
        "say",
        "great",
        "where",
        "help",
        "through",
        "much",
        "before",
        "line",
        "right",
        "too",
        "mean",
        "old",
        "any",
        "same",
        "tell",
        "boy",
        "follow",
        "came",
        "want",
        "show",
        "also",
        "around",
        "farm",
        "three",
        "small",
        "set",
        "put",
        "end",
        "does",
        "another",
        "well",
        "large",
        "must",
        "big",
        "even",
        "such",
        "because",
        "turn",
        "here",
        "why",
        "ask",
        "went",
        "men",
        "read",
        "need",
        "land",
        "different",
        "home",
        "us",
        "move",
        "try",
        "kind",
        "hand",
        "picture",
        "again",
        "change",
        "off",
        "play",
        "spell",
        "air",
        "away",
        "animal",
        "house",
        "point",
        "page",
        "letter",
        "mother",
        "answer",
        "found",
        "study",
        "still",
        "learn",
        "should",
        "world",
        "high",
        "every",
        "near",
        "add",
        "food",
        "between",
        "own",
        "below",
        "country",
        "plant",
        "last",
        "school",
        "father",
        "keep",
        "tree",
        "never",
        "start",
        "city",
        "earth",
        "eye",
        "light",
        "thought",
        "head",
        "under",
        "story",
        "saw",
        "left",
        "don't",
        "few",
        "while",
        "along",
        "might",
        "close",
        "something",
        "seem",
        "next",
        "hard",
        "open",
        "example",
        "begin",
        "life",
        "always",
        "those",
        "both",
        "paper",
        "together",
        "got",
        "group",
        "often",
        "run",
        "important",
        "until",
        "children",
        "side",
        "feet",
        "car",
        "mile",
        "night",
        "walk",
        "white",
        "sea",
        "began",
        "grow",
        "took",
        "river",
        "four",
        "carry",
        "state",
        "once",
        "book",
        "hear",
        "stop",
        "without",
        "second",
        "later",
        "miss",
        "idea",
        "enough",
        "eat",
        "face",
        "watch",
        "far",
        "Indian",
        "real",
        "almost",
        "let",
        "above",
        "girl",
        "sometimes",
        "mountain",
        "cut",
        "young",
        "talk",
        "soon",
        "list",
        "song",
        "leave",
        "family",
        "body",
        "music",
        "color",
        "stand",
        "sun",
        "questions",
        "fish",
        "area",
        "mark",
        "dog",
        "horse",
        "birds",
        "problem",
        "complete",
        "room",
        "knew",
        "since",
        "ever",
        "piece",
        "told",
        "usually",
        "didn't",
        "friends",
        "easy",
        "heard",
        "order",
        "red",
        "door",
        "sure",
        "become",
        "top",
        "ship",
        "across",
        "today",
        "during",
        "short",
        "better",
        "best",
        "however",
        "low",
        "hours",
        "black",
        "products",
        "happened",
        "whole",
        "measure",
        "remember",
        "early",
        "waves",
        "reached",
        "listen",
        "wind",
        "rock",
        "space",
        "covered",
        "fast",
        "several",
        "hold",
        "hundred",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
        "warm",
        "free",
        "minute",
        "strong",
        "special",
        "mind",
        "behind",
        "clear",
        "tail",
        "produce",
        "fact",
        "space",
        "heard",
        "best",
        "hour",
        "better",
        "true",
        "during",
        "hundred",
        "five",
        "remember",
        "step",
        "early",
        "hold",
        "west",
        "ground",
        "interest",
        "reach",
        "fast",
        "verb",
        "sing",
        "listen",
        "six",
        "table",
        "travel",
        "less",
        "morning",
        "ten",
        "simple",
        "several",
        "vowel",
        "toward",
        "war",
        "lay",
        "against",
        "pattern",
        "slow",
        "center",
        "love",
        "person",
        "money",
        "serve",
        "appear",
        "road",
        "map",
        "rain",
        "rule",
        "govern",
        "pull",
        "cold",
        "notice",
        "voice",
        "unit",
        "power",
        "town",
        "fine",
        "certain",
        "fly",
        "fall",
        "lead",
        "cry",
        "dark",
        "machine",
        "note",
        "wait",
        "plan",
        "figure",
        "star",
        "box",
        "noun",
        "field",
        "rest",
        "correct",
        "able",
        "pound",
        "done",
        "beauty",
        "drive",
        "stood",
        "contain",
        "front",
        "teach",
        "week",
        "final",
        "gave",
        "green",
        "oh",
        "quick",
        "develop",
        "ocean",
    ];
    useEffect(() => {
        const randomWords: string[] = [];
        for (let i = 0; i < gameLength; i++) {
            const randomIndex = Math.floor(Math.random() * wordBank.length);
            const randomWord: string | undefined = wordBank[randomIndex];
            if (randomWord) {
                randomWords.push(randomWord);
            }
        }
        setPrompt(randomWords);
    }, [gameLength, setPrompt]);

    return <></>;
}