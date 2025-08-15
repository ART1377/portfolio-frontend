"use client";
import React, { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number; 
  deletingSpeed?: number; 
  pauseTime?: number; 
  postDeletePause?: number;
  loop?: boolean;
  className?: string;
}

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
  postDeletePause = 500,
  loop = true,
  className = "",
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaitingAfterDelete, setIsWaitingAfterDelete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const currentWord = words[currentWordIndex];

    if (isWaitingAfterDelete) {
      // Wait before starting next word
      timeout = setTimeout(() => {
        setIsWaitingAfterDelete(false);
        setIsDeleting(false);
        setCurrentWordIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= words.length) {
            return loop ? 0 : prev;
          }
          return nextIndex;
        });
      }, postDeletePause);
    } else if (!isDeleting && displayedText.length < currentWord.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      // Pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // After deleting, wait before typing next word
      setIsWaitingAfterDelete(true);
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    isWaitingAfterDelete,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    postDeletePause,
    loop,
  ]);

  return (
    <span className={`${className}`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
