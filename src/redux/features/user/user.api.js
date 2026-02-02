import { baseApi } from "../../api/base.api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/settings/change-password/",
        method: "POST",
        body: passwordData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useChangePasswordMutation } = userApi;
