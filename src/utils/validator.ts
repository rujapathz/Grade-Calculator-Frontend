export function isNumericInput(value: string): boolean {
  return /^\d*\.?\d*$/.test(value);
}

export function isValidScore(score: number): boolean {
  return !isNaN(score) && score >= 0 && score <= 100;
}

export function validateScoreInput(input: string): {
  valid: boolean;
  score: number | null;
  message: string;
} {
  const value = input.trim(); 

  if (value === '') {
    return { 
        valid: true, 
        score: null, 
        message: '' 
    };
  }

  if (!isNumericInput(value)) {
    return { 
        valid: false, 
        score: null, 
        message: 'Please enter numbers only.' 
    };
  }

  const score = parseFloat(value); 

  if (!isValidScore(score)) {
    return { 
        valid: false, 
        score: null, 
        message: 'Score must be 0–100.' 
    };
  }

  return { 
    valid: true, 
    score, message: '' 
};
}