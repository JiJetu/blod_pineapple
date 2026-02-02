import { baseApi } from "../../api/base.api";


export const certificateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCertificateStatics: build.query({
      query: () => '/certificate/statics/',
      providesTags: ['Certificates'],
    }),
    
    getEligibleStudents: build.query({
      query: () => '/certificate/eligible_student/list/',
      providesTags: ['Certificates'],
    }),
    
    getEligibleStudentsByYear: build.query({
      query: (year_id) => `/certificate/eligible-student/${year_id}/filter/`,
      providesTags: ['Certificates'],
    }),
    
    downloadEligibleStudentsExcel: build.mutation({
      query: (data) => ({
        url: '/certificate/eligible-student/excel/download/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export the hooks
export const {
  useGetCertificateStaticsQuery,
  useGetEligibleStudentsQuery,
  useGetEligibleStudentsByYearQuery,
  useDownloadEligibleStudentsExcelMutation,
} = certificateApi;