import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../app/baseQuery";

const MANAGE_BENEFECIARIES_API_PATH = "http://localhost:3000/api/";

export const manageBeneficiariesApi = createApi({
  reducerPath: "MANAGE_BENEFECIARIES_API",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllBeneficiaries: builder.query({
      query: () => `${MANAGE_BENEFECIARIES_API_PATH}`,
    }),
    createBeneficiary: builder.mutation({
      query: (newBeneficiary) => ({
        url: `${MANAGE_BENEFECIARIES_API_PATH}`,
        method: "POST",
        body: newBeneficiary,
      }),
    }),
    updateBeneficiary: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${MANAGE_BENEFECIARIES_API_PATH}/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    removeBeneficiary: builder.mutation({
      query: (id) => ({
        url: `${MANAGE_BENEFECIARIES_API_PATH}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBeneficiariesQuery,
  useLazyGetAllBeneficiariesQuery,
  useCreateBeneficiaryMutation,
  useRemoveBeneficiaryMutation,
  useUpdateBeneficiaryMutation,
} = manageBeneficiariesApi;
