import StepContainer from '@/components/stepContainer';
import { useGetAllGradesQuery, 
  useCreateGradeMutation, 
  useUpdateGradeMutation, 
  useDeleteGradeMutation } from '@/service/gradeService'

export default function Home() {

  const { data = [], isLoading, error } = useGetAllGradesQuery();
   if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data.</div>;


  return <StepContainer allGrades={data} />;
}

