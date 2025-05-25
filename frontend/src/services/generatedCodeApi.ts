import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStarWarsPeople: build.query<GetStarWarsPeopleApiResponse, GetStarWarsPeopleApiArg>({
      query: (queryArg) => ({
        url: `/star-wars/people`,
        params: {
          name: queryArg.name,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedCodeApi };
export type GetStarWarsPeopleApiResponse = /** status 200 ok */ {
  name?: string;
  uid?: string;
}[];
export type GetStarWarsPeopleApiArg = {
  /** Name of the person to search for (e.g., 'luke') */
  name: any;
};
export const { useGetStarWarsPeopleQuery, useLazyGetStarWarsPeopleQuery } = injectedRtkApi;
