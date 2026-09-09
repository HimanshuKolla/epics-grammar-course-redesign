

// ══════════════════════════════════════
// GCR — Grammar Correction Realm
// scriptGames.js
// ══════════════════════════════════════
// ══════════════════════════════════════
// GCR — Conciseness
// ══════════════════════════════════════


// ══════════════════════════════════════
// Conciseness 
// ══════════════════════════════════════
const wordsBank = [
    {
        roundName: "Scenerio 1",
        roundDescription: "You are an engineer explaining a design choice to your team.",
        wordsForRound1: ["I", "kind of", "chose", "this", "design", "because", 
            "it", "seemed", "better", "and", "it", "would", "probably", "work", 
            "more", "efficiently", "for", "what", "we", "need", "."],
        wordsForRound2: ["I", "chose", "this", "design", "because", "it", 
            "improves", "system", "efficiency", "."],
        wordsForRound3: ["This", "design", "was", "selected", "to", "improve", 
            "system", "efficiency", "."]
    },
    {
        roundName: "Scenerio 2",
        roundDescription: "You are an engineer requesting a meeting with a superior to discuss your current progress. Your goal is to set a date and summarize what you’ll be discussing. This scenario is not about conciseness, but saying everything you need to.",
        wordsForRound1: ["I", "would", "like", "to", "meet", "with", "you", 
            "to", "decide", "what", "to", "do", "next", ".", "Does", "today", 
            "at", "3pm", "seem", "fine", "?"],
        wordsForRound2: ["I", "would", "like", "to", "meet", "with", "you", "to",
            "discuss", "future", "plans", "for", "my", "project", ".", "Does",
            "today", "at", "3pm", "work", "?"],
        wordsForRound3: ["It", "would", "be", "beneficial", "for", "my",
            "project", "to", "discuss", "future", "plans", ".", "I", "am",
            "available", "at", "3pm", "and", "4pm", "today", "."]
    }, 
    {
        roundName: "Scenerio 3",
        roundDescription: "You are a software engineer documenting a system with a bug for your team. Your goal is to clearly explain what the issue is, when it occurs, and why it matters.",
        wordsForRound1: ["The", "system", "basically", "fails", "when", "the", 
            "user", "inputs", "invalid", "data", ",", "and", "it", "kind of", 
            "causes", "a", "really", "slow", "response", "."],
        wordsForRound2: ["The", "system", "fails", "when", "the", "user",
            "inputs", "invalid", "data", ",", "causing", "a", "slow", "response", 
            "."],
        wordsForRound3: ["The", "system", "fails", "when", "invalid", "inputs", 
            "are", "processed", ",", "resulting", "in", "delayed", "response", 
            "time", "."]
    }
];

