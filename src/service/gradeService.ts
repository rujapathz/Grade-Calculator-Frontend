import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";


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


export const gradeService = createApi({
  reducerPath: "gradeService",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000"}),
  endpoints: (builder) => ({

    getAllGrades: builder.query<GradeEntity[], void>({
      query: () => ({
        url: "/grades",
        method: "GET"

      })
    }),

    getGradeByName: builder.query<GradeEntity | null, string>({
      query: (name) => `/grades?name=${encodeURIComponent(name)}`,
  transformResponse: (res: GradeEntity[]) =>
    res.length > 0 ? res[0] : null,
    }),

    createGrade: builder.mutation({
      query: (newGrade) => ({
        url: "/grades",
        method: "POST",
        body: newGrade,

      })

    }),

    updateGrade: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `/grades/${id}`,
        method: "PATCH",
        body: patch
      })
    }) ,

    deleteGrade:  builder.mutation({
      query: ({id}) => ({
        url: `/grades/${id}`,
        method: "DELETE",

      }),
    }),
  }),
})
export const {
  useGetAllGradesQuery,
  useLazyGetGradeByNameQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation
} = gradeService





  





  


