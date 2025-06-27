import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { GradeEntity, checkNameExists, createGrade, updateGrade, deleteGrade } from '../pages/api/rest_api';
import StepName from './stepName';
import StepScore from './stepScore';
import StepResult from './stepResult';

type stepContainerProps = {
  allGrades: GradeEntity[]; 
}


const StepContainer: React.FC<stepContainerProps> = ({ allGrades = [] }) => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [userName, setUserName] = useState('');
  const [userScore, setUserScore] = useState<number | null>(null); 
  const [existGradeData, setExistGradeData] = useState<GradeEntity | null>(null);

  const calculateGrade = (score: number) => {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };
  
  const handleNext = async () => { 
    if (currentStep === 0) {
      const trimName = userName.trim();
      if (!trimName) { 
        return; 
      }

    const foundName = await checkNameExists(trimName);

    if (foundName) { 
      setExistGradeData(foundName); 
      setUserScore(foundName.score); 
      setCurrentStep(2); 
    } else { 
      setExistGradeData(null);
      setUserScore(null); 
      setCurrentStep(1);
    }
    } else if (currentStep === 1) {
      if (userScore === null || userScore < 0 || userScore > 100) {
        return; 
      }
      await handleSaveOrUpdate();
    }
  };

  const handleBack = () => { 
    setCurrentStep((prev) => prev -1);
  }

  const handleSaveOrUpdate = async (newScore?: number) => { 
    const scoreToUse = newScore !== undefined ? newScore : userScore;
    if (scoreToUse === null || scoreToUse < 0 || scoreToUse > 100) {
      return;
    } 
  
  const userGrade = calculateGrade(scoreToUse);

  try {
    if (existGradeData){
      await updateGrade(existGradeData.id , { 
        name : userName,
        score : scoreToUse as number, 
        grade: userGrade
        
      });
      Swal.fire( {icon: 'success', text: 'Change Score Successful'})
      setCurrentStep(2) 

    } else { 
      
      await createGrade({
        name : userName,
        score : scoreToUse as number, 
        grade: userGrade,
      });
      
      setCurrentStep(2)  
    }
  } catch (error) {
    Swal.fire({ icon: 'error', text: 'An error occurred while saving the data.' });
  }
};

    const handleDelete = async () => {
    if (!existGradeData?.id) {
      return;
    }
    try {
      await deleteGrade(existGradeData.id);
      Swal.fire({icon: 'success', text: 'Delete Successful'})
      setUserName('');
      setUserScore(null);
      setExistGradeData(null);
      setCurrentStep(0);
    } catch(error) {
    }


  };
  const handleUpdateName = async (newName: string) => {
  if (!existGradeData) return;

  try {
    const updatedData = {
      ...existGradeData,
      name: newName,
    };
    await updateGrade(existGradeData.id, updatedData);
    setUserName(newName);
    Swal.fire({ icon: 'success', text: 'Name Updated Successfully' });
  } catch (error) {
    Swal.fire({ icon: 'error', text: 'An error occurred while updating the name.' });
  }
};


  const renderStepContent = () => {

    const gpxTitle = (
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Grade Point Average ( GPX )
      </h1>
    );

    switch (currentStep) {
      case 0:
        return (
          <>
          {gpxTitle}
          <StepName
            name={userName}
            setName={setUserName}
            onNext={handleNext} 
          />
          </>
        );
      case 1:
        return (
          <>
          {gpxTitle}
          <StepScore
            name={userName} 
            score={userScore}
            setScore={setUserScore}
            onBack={handleBack} 
            onNext={handleNext} 
          />
          </>
        );
      case 2: 
        return (
          <StepResult
            name={userName}
            startingScore={userScore}
            onBackToStart={() => { 
              setUserName(""); 
              setUserScore(null); 
              setExistGradeData(null);
              setCurrentStep(0); 
            }}
              onUpdateGrade={async (nameToUpdate, newScore) =>
              await handleSaveOrUpdate(newScore)
              } 
               onUpdateName={handleUpdateName}
                onDeleteGrade={handleDelete}
                existGradeData={existGradeData} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto">

        {renderStepContent()}
      </div>
    </div>
  );
  }

  export default StepContainer
