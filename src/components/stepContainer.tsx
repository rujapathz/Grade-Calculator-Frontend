import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  GradeEntity,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
  useLazyGetGradeByNameQuery,
} from '../service/gradeService';
import StepName from './stepName';
import StepScore from './stepScore';
import StepResult from './stepResult';
import { calculateGrade } from '../utils/grade';

type stepContainerProps = {
  allGrades: GradeEntity[];
};

const StepContainer: React.FC<stepContainerProps> = ({ allGrades }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [userScore, setUserScore] = useState<number | null>(null);
  const [existGradeData, setExistGradeData] = useState<GradeEntity | null>(null);

  const [createGrade] = useCreateGradeMutation();
  const [updateGrade] = useUpdateGradeMutation();
  const [deleteGrade] = useDeleteGradeMutation();
  const [fetchGradeByName] = useLazyGetGradeByNameQuery();

  const resetState = () => {
    setUserName('');
    setUserScore(null);
    setExistGradeData(null);
    setCurrentStep(0);
  };

  const handleNext = async () => {
    if (currentStep === 0 && userName.trim()) {

      try {
        const result = await fetchGradeByName(userName.trim()).unwrap();
        if (result) {
          setExistGradeData(result);
          setUserScore(result.score);
          setCurrentStep(2);
        } else {
          setExistGradeData(null);
          setCurrentStep(1);
        }
      } catch (err) {
      }
    } else if (currentStep === 1) {
    await handleSaveOrUpdate();
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSaveOrUpdate = async (newScore?: number) => {
    const scoreToUse = newScore ?? userScore;
    if (scoreToUse === null || scoreToUse < 0 || scoreToUse > 100) return;

    const userGrade = calculateGrade(scoreToUse);

    try {
      if (existGradeData) {
        
        await updateGrade({
          id: existGradeData.id,
          name: userName,
          score: scoreToUse,
          grade: userGrade,
        }).unwrap();

      } else {

        await createGrade({
          name: userName,
          score: scoreToUse,
          grade: userGrade,
        }).unwrap();
      }
      setCurrentStep(2);
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Failed to save data' });
    }
  };

  const handleDelete = async () => {
    if (!existGradeData) return;
    try {
      await deleteGrade({ id: existGradeData.id }).unwrap();
      setUserName('');
      setUserScore(null);
      setExistGradeData(null);
      setCurrentStep(0);
    } catch (err: any) {
      Swal.fire({ icon: 'error', text: err.message || 'Failed to delete' });
    }
  };

  const handleUpdateName = async (newName: string) => {
    if (!existGradeData || newName.trim() === existGradeData.name) return;
    try {
      const res = await fetch(`http://localhost:4000/grades?name=${encodeURIComponent(newName)}`);
      const data: GradeEntity[] = await res.json();

      if (data.length > 0 && data[0].id !== existGradeData.id) {
      
      throw new Error("This name is already taken.");
        }

      await updateGrade({ id: existGradeData.id, name: newName }).unwrap();
      setUserName(newName);
       
       Swal.fire({ icon: 'success', text: 'Change Name Successful' });
    } catch (err) {
      throw err;
      
    }
  };

  const handleUpdateScoreOnly = async (_: string, newScore: number) => {
    if (newScore < 0 || newScore > 100) {
    Swal.fire({ icon: 'error', text: 'Score must be between 0 and 100' });
    return;
    }
    
    try {
      await handleSaveOrUpdate(newScore);
      Swal.fire({ icon: 'success', text: 'Change Score Successful' });
    } catch (error: any) {
      Swal.fire({ icon: 'error', text: error.message || 'Error updating score' });
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
            <StepName name={userName} setName={setUserName} onNext={handleNext} />
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
              onNext={handleSaveOrUpdate}
            />
          </>
        );
      case 2:
        return (
          <StepResult
            name={userName}
            startingScore={userScore}
            onBackToStart={resetState}
            onUpdateGrade={handleUpdateScoreOnly}
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
};

export default StepContainer;
