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
    getStarWarsPerson: build.query<GetStarWarsPersonApiResponse, GetStarWarsPersonApiArg>({
      query: (queryArg) => ({
        url: `/star-wars/person`,
        params: {
          uid: queryArg.uid,
        },
      }),
    }),
    getStarWarsMovies: build.query<GetStarWarsMoviesApiResponse, GetStarWarsMoviesApiArg>({
      query: (queryArg) => ({
        url: `/star-wars/movies`,
        params: {
          title: queryArg.title,
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
export type GetStarWarsPersonApiResponse = /** status 200 ok */ {
  name?: string;
  birth_year?: string;
  gender?: string;
  eye_color?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  movies?: {
    description?: string;
    uid?: string;
  }[];
};
export type GetStarWarsPersonApiArg = {
  /** Get one person by uid (e.g., '1') */
  uid: any;
};
export type GetStarWarsMoviesApiResponse = /** status 200 ok */ {
  title?: string;
  uid?: string;
}[];
export type GetStarWarsMoviesApiArg = {
  /** Title of the movie to search for (e.g., 'A New Hope') */
  title: any;
};
export const {
  useGetStarWarsPeopleQuery,
  useLazyGetStarWarsPeopleQuery,
  useGetStarWarsPersonQuery,
  useLazyGetStarWarsPersonQuery,
  useGetStarWarsMoviesQuery,
  useLazyGetStarWarsMoviesQuery,
} = injectedRtkApi;
