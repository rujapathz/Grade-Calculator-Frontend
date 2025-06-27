import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface StepResultProps {
  name: string;
  startingScore: number | null; 
  onBackToStart: () => void; 
  onUpdateGrade: (name: string, newScore: number) => Promise<void>;
  onUpdateName: (newName: string) => Promise<void>;
  onDeleteGrade: () => Promise<void>;
  existGradeData?: any;

}

export default function StepResult({
  name,
  startingScore, 
  onBackToStart,
  onUpdateGrade,
  onUpdateName,
  onDeleteGrade,
  existGradeData,
}: StepResultProps) {
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentScore, setCurrentScore] = useState(startingScore); 
  const [tempScore, setTempScore] = useState<string>(String(startingScore ?? "")); 
  const [tempName, setTempName] = useState<string>(name);
  const [isEditingName, setIsEditingName] = useState(false);


  useEffect(() => {
    setCurrentScore(startingScore); 
    setTempScore(String(startingScore ?? '')); 
    setIsEditing(false); 
  }, [startingScore]);

  
  const getGrade = (s: number): string => {
    if (s >= 80) return 'A';
    if (s >= 70) return 'B';
    if (s >= 60) return 'C';
    if (s >= 50) return 'D';
    return 'F';
  };

  const grade = getGrade(currentScore ?? 0);

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSaveClick = async () => {
    const numericTempScore = Number(tempScore);
    if (isNaN(numericTempScore) || numericTempScore < 0 || numericTempScore > 100) {
      setErrorMessage("Please enter your name.");
      return; 
    }
    try {
      await onUpdateGrade(name, numericTempScore);
      setCurrentScore(numericTempScore); 
      setIsEditing(false); 
      setErrorMessage("");
      Swal.fire({ icon: 'success', text: 'Change Score Succesful' });
    } catch (error) {
      return;
    }
  };

  const handleCancelClick = () => {
   setTempScore(String(currentScore ?? ''));; 
    setIsEditing(false); 
  };

  const handleDeleteClick = async () => {
    const decisionResult = await Swal.fire({
      text: `Are you sure you want to delete "${name}"`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: false, 
      customClass: { 
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md'
      },
      buttonsStyling: false 
    });
    if (decisionResult.isConfirmed) {
      try {
        await onDeleteGrade();
        Swal.fire({ icon: 'success', text: 'Delete Successful' });
        onBackToStart();
      } catch (error) {
        return;
      }
    }
  };
  const handleEditNameClick = () => {
  setIsEditingName(true);
};
const handleSaveNameClick = async () => {
  if (!tempName.trim()) {
    setErrorMessage("Please enter a name.");
    return;
  }
  try {
    await onUpdateName(tempName);
    setIsEditingName(false);
    Swal.fire({ icon: 'success', text: 'Change Name Successful' });
  } catch (error) {
    return;
  }
};

const handleCancelNameClick = () => {
  setTempName(name);
  setIsEditingName(false);
};


return (
  <>
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Your Grade</h2>
    <p className="text-4xl font-extrabold mb-4 text-center text-black">{grade}</p>

    <div className="mb-4">
  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
    Name
  </label>
  <div className="relative flex items-center w-full">
    {isEditingName ? (
      <input
        id="name"
        type="text"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-3 w-full text-lg pr-10 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
    ) : (
      <input
        id="name"
        type="text"
        value={name}
        disabled
        className="rounded-md py-2 px-3 w-full text-lg disabled:opacity-100 disabled:text-gray-900 disabled:bg-transparent"
      />
    )}
    {existGradeData && !isEditingName && (
      <button
        onClick={handleEditNameClick}
        className="absolute right-2 p-1 hover:bg-gray-100 rounded"
        aria-label="Edit Name"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.1 2.1 0 113.03 3.031L6.772 19.638a4.2 4.2 0 01-1.748 1.06l-2.642.757.757-2.642a4.2 4.2 0 011.06-1.748L16.862 3.487z"
          />
        </svg>
      </button>
    )}
  </div>
</div>

{isEditingName && (
  <div className="flex space-x-2 justify-start mt-2">
    <button
      onClick={handleSaveNameClick}
      className="py-1 px-2 rounded text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      Save
    </button>
    <button
      onClick={handleCancelNameClick}
      className="py-1 px-2 rounded text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-50"
    >
      Cancel
    </button>
  </div>
)}

   
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="score">
        Score
      </label>

    <div className="relative flex items-center w-full">
    {isEditing ? (
      <input
        id="score"
        type="number"
        value={tempScore}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*\.?\d*$/.test(value) || value === '') {
            setTempScore(value);
            setErrorMessage('');
          } else {
            setErrorMessage('Please enter numbers only.');
          }
        }}
        className="no-spinner border border-gray-300 rounded-md py-2 px-3 w-full text-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
    ) : (
      <input
        id="score"
        type="text"
        value={currentScore ?? 'N/A'}
        disabled
        className="rounded-md py-2 px-3 w-full text-lg disabled:opacity-100 disabled:text-gray-900 disabled:bg-transparent"
      />
    )}
    
    {existGradeData && !isEditing && (
      <button
        onClick={handleEditClick}
        className="absolute right-2 p-1 hover:bg-gray-100 rounded"
        aria-label="Edit Score"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.1 2.1 0 113.03 3.031L6.772 19.638a4.2 4.2 0 01-1.748 1.06l-2.642.757.757-2.642a4.2 4.2 0 011.06-1.748L16.862 3.487z"
          />
        </svg>
      </button>
    )}
    {isEditing && tempScore !== '' && (
      <button
        onClick={() => {
          setTempScore('');
          setErrorMessage('');
        }}
        className="absolute right-3 text-xl text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>
    )}
  </div>
</div>

    {isEditing && (
      <div className="flex space-x-2 justify-start">
        <button
          onClick={handleSaveClick}
          className="py-1 px-2 rounded text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          onClick={handleCancelClick}
          className="py-1 px-2 rounded text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-50"
        >
          Cancel
        </button>
      </div>
    )}

    <div className="flex justify-between space-x-4">
      <button
        onClick={onBackToStart}
        className="flex-1 py-2 px-4 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Start New
      </button>
      <button
        onClick={handleDeleteClick}
        className="flex-1 py-2 px-4 rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Clear data
      </button>
    </div>
  </>
);
};
