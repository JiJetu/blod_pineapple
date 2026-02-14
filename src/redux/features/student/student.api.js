import { baseApi } from "../../api/base.api";


export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all students
    getStudents: builder.query({
      query: () => ({
        url: "/student/students/",
        method: "GET",
      }),
      providesTags: ["Students"],
    }),

    // Filter students
    filterStudents: builder.query({
      query: (params) => ({
        url: "/student/students/filter/",
        method: "GET",
        params,
      }),
      providesTags: ["Students"],
    }),

    // Get student awards
    getStudentAwards: builder.query({
      query: (studentId) => ({
        url: `/student/students/${studentId}/awards/`,
        method: "GET",
      }),
      providesTags: ["StudentAwards"],
    }),

    // Create student
    createStudent: builder.mutation({
      query: (studentData) => ({
        url: "/student/students/create/",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["Students"],
    }),

    // Add award to student
    addStudentAward: builder.mutation({
      query: ({ studentId, awardData }) => ({
        url: "/student/students/awards/add/",
        method: "POST",
        body: { student_id: studentId, ...awardData },
      }),
      invalidatesTags: ["Students", "StudentAwards"],
    }),

    // Archive student
    archiveStudent: builder.mutation({
      query: (studentId) => ({
        url: `/student/students/${studentId}/archive/`,
        method: "POST",
      }),
      invalidatesTags: ["Students", "Archive"],
    }),

    // Edit student
    editStudent: builder.mutation({
      query: ({ studentId, studentData }) => ({
        url: `/student/students/${studentId}/edit/`,
        method: "PUT",
        body: studentData,
      }),
      invalidatesTags: ["Students"],
    }),

    // Delete student
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `/student/students/${studentId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),

    // Bulk import students via Excel
    bulkImportStudents: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/student/students/bulk-import/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Students", "Years", "Rooms", "Factions"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useFilterStudentsQuery,
  useGetStudentAwardsQuery,
  useCreateStudentMutation,
  useAddStudentAwardMutation,
  useArchiveStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
  useBulkImportStudentsMutation,
} = studentsApi;
