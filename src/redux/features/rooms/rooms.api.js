import { baseApi } from "../../api/base.api";

export const roomsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        url: "/settings/rooms/",
        method: "GET",
      }),
      providesTags: ["Rooms"],
    }),
    createRoom: builder.mutation({
      query: (formData) => ({
        url: "/settings/rooms/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Rooms"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/settings/rooms/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;