import { baseApi } from "../../api/base.api";

export const yearsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getYears: builder.query({
      query: () => ({
        url: "/settings/years/",
        method: "GET",
      }),
      providesTags: ["Years"],
    }),
    createYear: builder.mutation({
      query: (formData) => ({
        url: "/settings/years/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Years"],
    }),
    deleteYear: builder.mutation({
      query: (id) => ({
        url: `/settings/years/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Years"],
    }),
  }),
});

export const {
  useGetYearsQuery,
  useCreateYearMutation,
  useDeleteYearMutation,
} = yearsApi;