import { baseApi } from "../../api/base.api";

export const factionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFactions: builder.query({
      query: () => ({
        url: "/settings/factions/",
        method: "GET",
      }),
      providesTags: ["Factions"],
    }),
    createFaction: builder.mutation({
      query: (formData) => ({
        url: "/settings/factions/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Factions"],
    }),
    deleteFaction: builder.mutation({
      query: (id) => ({
        url: `/settings/factions/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Factions"],
    }),
  }),
});

export const {
  useGetFactionsQuery,
  useCreateFactionMutation,
  useDeleteFactionMutation,
} = factionsApi;