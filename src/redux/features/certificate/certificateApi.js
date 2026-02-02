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
      query: (studentIds) => {
        // Convert to array of numbers for the API
        const studentIdsArray = Array.isArray(studentIds) 
          ? studentIds.map(id => {
              const numId = Number(id);
              return isNaN(numId) ? 0 : numId;
            }).filter(id => id > 0)
          : [];
        
        console.log("Sending to download API:", { student_ids: studentIdsArray });
        
        return {
          url: "/certificate/eligible-student/excel/download/",
          method: "POST",
          body: {
            student_ids: studentIdsArray
          },
          headers: {
            'Content-Type': 'application/json',
          },
          responseHandler: (response) => response.blob(),
        };
      },
    }),
  }),
});

export const {
  useGetCertificateStatsQuery,
  useGetEligibleStudentsQuery,
  useFilterEligibleStudentsQuery,
  useDownloadExcelMutation,
} = certificateApi;