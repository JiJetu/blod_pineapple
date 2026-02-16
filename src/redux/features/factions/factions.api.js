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
    getFactionStats: builder.query({
      query: () => ({
        url: "/faction/statics/",
        method: "GET",
      }),
      providesTags: ["Factions"],
    }),

    // Get faction statistics filtered by year
    getFactionStatsByYear: builder.query({
      query: (yearId) => ({
        url: `/faction/statics/${yearId}/filter/`,
        method: "GET",
      }),
      providesTags: ["Factions"],
    }),
    
    // Year-wise overall statistics
    getFactionYearWiseStats: builder.query({
      query: () => ({
        url: "/faction/year_wise_statics/",
        method: "GET",
      }),
      providesTags: ["Factions"],
    }),
  }),
});

export const {
  useGetFactionsQuery,
  useCreateFactionMutation,
  useDeleteFactionMutation,
  useGetFactionStatsQuery,
  useGetFactionStatsByYearQuery,
  useGetFactionYearWiseStatsQuery,
} = factionsApi;
