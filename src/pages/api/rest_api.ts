export type GradeEntity = {
    id: number;
    name: string;
    score: number ; 
    grade: string;
};

export interface CreateGradeDto { 
  name: string;
  score: number;
  grade: string;
}

export interface UpdateGradeDto { 
  name?: string; 
  score?: number;
  grade?: string;
}



export async function getGrades(): Promise<GradeEntity[]> {
    try{
      const res = await fetch("http://localhost:4000/grades");
      const data = await res.json();

      if (res.ok){
        return data;
        
      } else {
        throw new Error("Failed to fetch data:" + res.status)
      }
    } catch (error) {
        throw error;
    }
}

export async function checkNameExists(nameToCheck: string): Promise<GradeEntity | null > {
    try{
      const res = await fetch(`http://localhost:4000/grades?name=${encodeURIComponent(nameToCheck)}`);
      
      
      if (!res.ok) {

      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return null;
    }

    const data: GradeEntity[] = await res.json();

    if (data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    return null;
  }
}
export async function createGrade(createGradeData: Omit<GradeEntity, 'id'>): Promise<GradeEntity> {

  const res = await fetch('http://localhost:4000/grades', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createGradeData),
  });
  if (!res.ok) {
    const errorBody = await res.text();  
    throw new Error(`Failed to create grade: ${res.status}`);
  }
  return res.json();
}

export async function updateGrade(id: number, updatedData: Partial<Omit<GradeEntity, 'id'>>): Promise<GradeEntity> {
    const res = await fetch(`http://localhost:4000/grades/${id}`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || `Failed to update grade: ${res.status}`);
    }
    return res.json();
}

export async function deleteGrade(id: number): Promise<void> {
    const res = await fetch(`http://localhost:4000/grades/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || `Failed to delete grade: ${res.status}`);
    }
}


