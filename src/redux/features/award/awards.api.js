import { baseApi } from "../../api/base.api";

export const awardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get award rules
    getAwardRules: builder.query({
      query: () => ({
        url: "/award/rules/",
        method: "GET",
      }),
      providesTags: ["AwardRules", "Awards"],
    }),

     // Get all students
    getStudents: builder.query({
      query: () => ({
        url: "/award/students/list/",
        method: "GET",
      }),
      providesTags: ["Students"],
    }),

    // Filter students
    filterStudents: builder.mutation({
      query: (filters) => ({
        url: "/award/students/filter/",
        method: "GET",
        params: filters,
      }),
    }),

     // Assign award to student
    assignAward: builder.mutation({
      query: (awardData) => ({
        url: "/award/add/",
        method: "POST",
        body: {
          student_id: awardData.studentId?.toString().trim() || "",
          award_type: awardData.awardType,
          quantity: awardData.quantity,
          reason: awardData.reason?.toString().trim() || "",
        },
      }),
      invalidatesTags: ["Students", "StudentAwards"],
    }),

    // Awards management
    getAwards: builder.query({
      query: () => ({
        url: "/settings/awards/",
        method: "GET",
      }),
      providesTags: ["Awards"],
    }),

    createAward: builder.mutation({
      query: (formData) => ({
        url: "/settings/awards/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Awards"],
    }),

    deleteAward: builder.mutation({
      query: (id) => ({
        url: `/settings/awards/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Awards"],
    }),
  }),
});

export const {
  useGetAwardsQuery,
  useCreateAwardMutation,
  useDeleteAwardMutation,
  useGetAwardRulesQuery,
  useGetStudentsQuery,
  useFilterStudentsMutation,
  useAssignAwardMutation,
} = awardsApi;
