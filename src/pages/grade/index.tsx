import React from 'react';
import { GetServerSideProps } from 'next';
import { getGrades, GradeEntity } from '../api/rest_api'; 
import StepContainer from '@/components/stepContainer';

type GradePageProps = { 
  allGrades: GradeEntity[];
  error: string | null;
};

export const getServerSideProps: GetServerSideProps<GradePageProps> = async (context) => { 
  let allGrades: GradeEntity[] = [];
  let error: string | null = null;

  try {
    allGrades = await getGrades(); 
  } catch (error: any) {

    error = error.message || "Failed to load initial grades.";
  }

  return {
    props: {
      allGrades,
      error,
    },
  };
};

const GradePage: React.FC<GradePageProps> = ({ allGrades, error }) => { 
  if (error) {
    return (
      <div style={{textAlign: 'center' }}>
        <p>Error loading Grade Calculator: {error}</p>
      </div>
    );
  }

  return (
    <>
      <h1>Grade Calculator App</h1>
      <StepContainer allGrades={allGrades} />
    </>
  );
};

export default GradePage;