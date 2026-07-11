import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
  const [speaking, setSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  // Initialize theme and font size
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
  }, []);

  const applyTheme = (t) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  const applyFontSize = (size) => {
    const root = document.documentElement;
    if (size === 'large') {
      root.style.fontSize = '120%'; // A+
    } else if (size === 'small') {
      root.style.fontSize = '85%';  // A-
    } else {
      root.style.fontSize = '100%'; // Normal
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const changeFontSize = (direction) => {
    let newSize = 'normal';
    if (direction === 'up') {
      newSize = 'large';
    } else if (direction === 'down') {
      newSize = 'small';
    }
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
    applyFontSize(newSize);
  };

  const resetFontSize = () => {
    setFontSize('normal');
    localStorage.setItem('fontSize', 'normal');
    applyFontSize('normal');
  };

  // Text-To-Speech functionality
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // If already speaking, stop
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }

      // Start speaking
      const cleanText = text.replace(/<[^>]*>/g, ''); // strip HTML if any
      const newUtterance = new SpeechSynthesisUtterance(cleanText);

      // Auto-detect language
      // If text has Hindi characters, use Hindi voice if available
      if (/[\u0900-\u097F]/.test(cleanText)) {
        newUtterance.lang = 'hi-IN';
      } else if (/[\u0C80-\u0CFF]/.test(cleanText)) {
        newUtterance.lang = 'kn-IN';
      } else {
        newUtterance.lang = 'en-US';
      }

      newUtterance.onend = () => {
        setSpeaking(false);
      };
      newUtterance.onerror = () => {
        setSpeaking(false);
      };

      setUtterance(newUtterance);
      setSpeaking(true);
      window.speechSynthesis.speak(newUtterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  // Stop reading if user navigates away or context changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      fontSize,
      changeFontSize,
      resetFontSize,
      speaking,
      speak,
      stopSpeaking
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
