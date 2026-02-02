import { baseApi } from "../../api/base.api";

export const quantitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuantities: builder.query({
      query: () => ({
        url: "/settings/quantities/",
        method: "GET",
      }),
      providesTags: ["Quantities"],
    }),
    createQuantity: builder.mutation({
      query: (formData) => ({
        url: "/settings/quantities/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Quantities"],
    }),
    deleteQuantity: builder.mutation({
      query: (id) => ({
        url: `/settings/quantities/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quantities"],
    }),
  }),
});

export const {
  useGetQuantitiesQuery,
  useCreateQuantityMutation,
  useDeleteQuantityMutation,
} = quantitiesApi;