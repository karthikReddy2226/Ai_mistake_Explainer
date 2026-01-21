"use client";

import { useState } from "react";

// Subject types
type Subject =
  | "Science"
  | "Social"
  | "English"
  | "Python"
  | "Java"
  | "Data Science"
  | "Analytics"
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "Cloud";

// Explanation levels
type Level = "Simple" | "Medium" | "Detailed";

// Question data structure
interface QuestionData {
  question: string;
  wrongAnswer: string;
  img: string;
  color: string;
}

// Example questions with subject colors for playful UI
const exampleQuestions: Record<Subject, QuestionData> = {
  Science: {
    question: "What is the boiling point of water?",
    wrongAnswer: "50°C",
    img: "https://cdn-icons-png.flaticon.com/512/2622/2622113.png",
    color: "bg-yellow-200"
  },
  Social: {
    question: "Who was the first President of India?",
    wrongAnswer: "Mahatma Gandhi",
    img: "https://cdn-icons-png.flaticon.com/512/1995/1995616.png",
    color: "bg-green-200"
  },
  English: {
    question: "What is the past tense of 'go'?",
    wrongAnswer: "goed",
    img: "https://cdn-icons-png.flaticon.com/512/3013/3013204.png",
    color: "bg-pink-200"
  },
  Python: {
    question: "How do you print 'Hello World' in Python?",
    wrongAnswer: "echo('Hello World')",
    img: "https://cdn-icons-png.flaticon.com/512/1822/1822899.png",
    color: "bg-blue-200"
  },
  Java: {
    question: "How do you declare an integer variable in Java?",
    wrongAnswer: "int number = '10';",
    img: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    color: "bg-red-200"
  },
  "Data Science": {
    question: "Which Python library is used for data analysis?",
    wrongAnswer: "matplotlib only",
    img: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    color: "bg-purple-200"
  },
  Analytics: {
    question: "What is a KPI in business analytics?",
    wrongAnswer: "Key Product Indicator",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    color: "bg-teal-200"
  },
  Frontend: {
    question: "Which language is primarily used for styling web pages?",
    wrongAnswer: "JavaScript only",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    color: "bg-orange-200"
  },
  Backend: {
    question: "Which language can be used to build server-side applications?",
    wrongAnswer: "HTML only",
    img: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    color: "bg-indigo-200"
  },
  "Full Stack": {
    question: "Which skills are required for a Full Stack developer?",
    wrongAnswer: "Frontend only",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    color: "bg-cyan-200"
  },
  Cloud: {
    question: "Which is a popular cloud platform?",
    wrongAnswer: "GitHub",
    img: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    color: "bg-lime-200"
  }
};

export default function Home() {
  const [subject, setSubject] = useState<Subject>("Science");
  const [question, setQuestion] = useState(exampleQuestions["Science"].question);
  const [wrongAnswer, setWrongAnswer] = useState(exampleQuestions["Science"].wrongAnswer);
  const [level, setLevel] = useState<Level>("Simple");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function selectSubject(subj: Subject) {
    setSubject(subj);
    setQuestion(exampleQuestions[subj].question);
    setWrongAnswer(exampleQuestions[subj].wrongAnswer);
    setResult("");
  }

  async function explainMistake() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, wrongAnswer, subject, level }),
    });

    const data = await res.json();
    setResult(data.explanation);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-100 flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-6 text-center text-purple-700 animate-pulse">
        🌟 AI Learning Buddy 🌟
      </h1>

      {/* Subject Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl mb-6">
        {Object.keys(exampleQuestions).map((subj) => {
          const s = subj as Subject;
          return (
            <div
              key={s}
              onClick={() => selectSubject(s)}
              className={`cursor-pointer flex flex-col items-center p-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 ${
                subject === s ? "ring-4 ring-purple-400" : ""
              } ${exampleQuestions[s].color}`}
            >
              <img src={exampleQuestions[s].img} alt={s} className="w-16 h-16 mb-2 animate-bounce" />
              <span className="text-lg font-bold text-gray-800">{s}</span>
            </div>
          );
        })}
      </div>

      {/* Level Selector */}
      <div className="flex gap-4 mb-6">
        {["Simple", "Medium", "Detailed"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl as Level)}
            className={`px-4 py-2 rounded-full font-semibold shadow-lg transform transition duration-300 ${
              level === lvl ? "bg-purple-500 text-white scale-105" : "bg-white text-purple-700 hover:bg-purple-200"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Input Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-6 mb-6 border-2 border-purple-300 relative">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4 text-center">
          ✏️ Enter Your Question & Wrong Answer
        </h2>

        <textarea
          className="w-full p-4 mb-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 resize-none h-24 text-black"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <textarea
          className="w-full p-4 mb-4 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 resize-none h-24 text-black"
          placeholder="Enter Wrong Answer"
          value={wrongAnswer}
          onChange={(e) => setWrongAnswer(e.target.value)}
        />

        <button
          onClick={explainMistake}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          {loading ? "Explaining..." : `Explain Mistake (${level})`}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div className="w-full max-w-2xl bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 rounded-3xl shadow-lg p-6 border-2 border-blue-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            ✅ Explanation ({level})
          </h2>
          <pre className="bg-white p-4 rounded-xl whitespace-pre-wrap shadow-inner text-gray-700 text-lg">
            {result}
          </pre>
        </div>
      )}

      <p className="mt-6 text-center text-gray-600 italic">
        💡 Select a subject, choose explanation level, enter your question and wrong answer, and get a detailed explanation!
      </p>
    </main>
  );
}
