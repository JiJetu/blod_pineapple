import { baseApi } from "../../api/base.api";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/dashboard/stats/",
      providesTags: ["DashboardStats", "Students", "Awards", "Certificates"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
} = dashboardApi;