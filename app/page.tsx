"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import questionsData from "@/data/questions.json";
import Landing from "@/components/Landing";
import Quiz from "@/components/Quiz";
import Result from "@/components/Result";
import { calculateResult, shuffleQuestions } from "@/lib/scoring";
import type { Answer, AppScreen, Question } from "@/lib/types";

const ALL_QUESTIONS = questionsData as Question[];

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [questions, setQuestions] = useState<Question[]>(ALL_QUESTIONS);

  const result = useMemo(
    () => calculateResult(questions, answers),
    [questions, answers],
  );

  const beginQuiz = useCallback(() => {
    setQuestions(shuffleQuestions(ALL_QUESTIONS));
    setIndex(0);
    setAnswers({});
    setScreen("quiz");
  }, []);

  const reset = useCallback(() => {
    setIndex(0);
    setAnswers({});
    setScreen("landing");
  }, []);

  const handleAnswer = useCallback(
    (answer: Answer) => {
      const q = questions[index];
      setAnswers((prev) => ({ ...prev, [q.id]: answer }));

      if (index >= questions.length - 1) {
        setScreen("result");
      } else {
        setIndex((i) => i + 1);
      }
    },
    [index, questions],
  );

  const handleBack = useCallback(() => {
    if (index === 0) {
      setScreen("landing");
      return;
    }
    setIndex((i) => i - 1);
  }, [index]);

  useEffect(() => {
    if (screen !== "quiz") return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "y" || e.key === "Y" || e.key === "1") {
        e.preventDefault();
        handleAnswer("yes");
      } else if (e.key === "n" || e.key === "N" || e.key === "2") {
        e.preventDefault();
        handleAnswer("no");
      } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, handleAnswer, handleBack]);

  if (screen === "landing") {
    return <Landing onStart={beginQuiz} />;
  }

  if (screen === "quiz") {
    return (
      <Quiz
        questions={questions}
        index={index}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    );
  }

  return <Result result={result} onRetake={reset} />;
}
