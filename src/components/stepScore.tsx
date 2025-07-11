import React, { useState } from 'react';
import { validateScoreInput } from '../utils/validator';

interface StepScoreProps {
  name: string; 
  score: number | null;
  setScore: (score: number | null) => void;
  onBack: () => void;
  onNext: () => void; 
}

export default function StepScore({ name, score, setScore, onBack, onNext }: StepScoreProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleScoreSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value; 

    const { valid, score, message } = validateScoreInput(value);

  if (!valid) {
    setErrorMessage(message);
    setScore(null);
    return;
  }

  setScore(score);
  setErrorMessage('');
};

    const value = e.target.value.trim(); 

    if ( value === '' ){
      setScore(null);
      setErrorMessage("");
        return;
    } 

    if (!/^\d*\.?\d*$/.test(value)) {
      setErrorMessage("Please enter numbers only");
      setScore(null);
      return;
    }

    const parsedValue = parseFloat(value); 

    if (parsedValue > 100) {
    setErrorMessage("Score must not be exceed than 100."); 
    setScore(null);
    return;
  }
    setScore(parsedValue); 
    setErrorMessage("");
  };

    

  const handleNext = () => {
    if (score === null) {
      setErrorMessage("Score must be a number between 0 and 100.");
      return;
    }
    onNext();
  };

  const isNextDisabled = score === null;

  return (
    <div>
      <p className="text-gray-700 text-lg mb-4 text-center">
        <span className="font-semibold">{name || "Your Name"}</span>
      </p>

      <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2">
        Score
      </label>
      <input
        type="text"
        id="score"
        value={score ?? ''}
        onChange={handleScoreSubmit}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
        placeholder="Enter your score"
      />

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}

      <div className="flex justify-between mt-6 space-x-4">
        <button
          onClick={onBack}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
            ${isNextDisabled 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2'}
            focus:outline-none focus:ring-2`}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
