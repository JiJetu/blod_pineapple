import { baseApi } from "../../api/base.api";

export const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get certificate statistics
    getCertificateStats: builder.query({
      query: () => ({
        url: "/certificate/statics/",
        method: "GET",
      }),
      providesTags: ["Students", "CertificateStats"],
    }),

    // Get eligible students list
    getEligibleStudents: builder.query({
      query: () => ({
        url: "/certificate/eligible_student/list/",
        method: "GET",
      }),
      providesTags: ["Students"],
    }),

    // Filter eligible students by year
    filterEligibleStudents: builder.query({
      query: (yearId) => ({
        url: `/certificate/eligible-student/${yearId}/filter/`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),


    // Download Excel file
    downloadExcel: builder.mutation({
      query: (studentIds) => ({
        url: "/certificate/eligible-student/excel/dwonload/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          student_ids: studentIds || [],
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
    
    // Download students by selected factions
    downloadStudentsByFaction: builder.mutation({
      query: (factionIds) => ({
        url: "/certificate/download/students/by_faction/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          factions_ids: factionIds || [],
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
    
    // Download students by selected years
    downloadStudentsByYear: builder.mutation({
      query: (yearIds) => ({
        url: "/certificate/download/students/by_year/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          year_ids: yearIds || [],
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetCertificateStatsQuery,
  useGetEligibleStudentsQuery,
  useFilterEligibleStudentsQuery,
  useDownloadExcelMutation,
  useDownloadStudentsByFactionMutation,
  useDownloadStudentsByYearMutation,
} = certificateApi;
