import { baseApi } from "../../api/base.api";

export const archiveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get archive statistics
    getArchiveStats: builder.query({
      query: () => ({
        url: "/archived/statics/",
        method: "GET",
      }),
      providesTags: ["Archive", "Students"],
    }),

    // Get archived students list
    getArchivedStudents: builder.query({
      query: () => ({
        url: "/archived/students/list/",
        method: "GET",
      }),
      providesTags: ["Archive"],
    }),

    // Search archived students
    searchArchivedStudents: builder.query({
      query: (searchQuery) => ({
        url: "/archived/students/search/",
        method: "GET",
        params: {
          q: searchQuery,
        },
      }),
      providesTags: ["Archive"],
    }),

    // Restore archived student
    restoreArchivedStudent: builder.mutation({
      query: (studentId) => ({
        url: `/archived/student/${studentId}/restore/`,
        method: "POST",
      }),
      invalidatesTags: ["Archive"],
    }),

    // Permanently delete archived student
    deleteArchivedStudent: builder.mutation({
      query: (studentId) => ({
        url: `/archived/student/${studentId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Archive"],
    }),
  }),
});

export const {
  useGetArchiveStatsQuery,
  useGetArchivedStudentsQuery,
  useSearchArchivedStudentsQuery,
  useRestoreArchivedStudentMutation,
  useDeleteArchivedStudentMutation,
} = archiveApi;