<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\StarWarsService;

class StarWarsController extends Controller
{
    protected StarWarsService $starWarsService;

    public function __construct(StarWarsService $starWarsService)
    {
        $this->starWarsService = $starWarsService;
    }
    /**
     * @OA\Get(
     *   path="/star-wars/people",
     *   @OA\Parameter(
     *      name="name",
     *      in="query",
     *      required=true,
     *      description="Name of the person to search for (e.g., 'luke')",
     *   ),
     *  @OA\Response(
     *         response="200",
     *         description="ok",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                    type="array",
     *                         @OA\Items(
     *                              type="object",
     *                              @OA\Property(
     *                                  property="name",
     *                                  type="string",
     *                                  example="Luke Skywalker"
     *                              ),
     *                              @OA\Property(
     *                                  property="uid",
     *                                  type="string",
     *                                  example="1"
     *                              ),
     *                     ),
     *                 )
     *             )
     *         }
     *     ),
     * )
     */
    public function searchPeople(Request $request): JsonResponse
    {
        $searchTerm = $request->query('name');

        if (empty($searchTerm)) {
            return response()->json([
                'message' => 'Please provide a "name" query parameter for the search (e.g., ?name=luke).',
            ], 400);
        }

        $results = $this->starWarsService->searchPeople($searchTerm);

        if (is_null($results)) {
            return response()->json([
                'message' => 'Could not retrieve people from Star Wars API.',
            ], 500);
        }

        return response()->json($results);
    }

    
    /**
     * @OA\Get(
     *   path="/star-wars/person",
     *   @OA\Parameter(
     *      name="uid",
     *      in="query",
     *      required=true,
     *      description="Get one person by uid (e.g., '1')",
     *   ),
     *  @OA\Response(
     *         response="200",
     *         description="ok",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                              type="object",
     *                              @OA\Property(
     *                                  property="name",
     *                                  type="string",
     *                                  example="Luke Skywalker"
     *                              ),
     *                              @OA\Property(
     *                                  property="birth_year",
     *                                  type="string",
     *                                  example="19BBY"
     *                              ),
     *                              @OA\Property(
     *                                  property="gender",
     *                                  type="string",
     *                                  example="male"
     *                              ),
     *                              @OA\Property(
     *                                  property="eye_color",
     *                                  type="string",
     *                                  example="blue"
     *                              ),
     *                              @OA\Property(
     *                                  property="hair_color",
     *                                  type="string",
     *                                  example="blond"
     *                              ),
     *                              @OA\Property(
     *                                  property="height",
     *                                  type="string",
     *                                  example="172"
     *                              ),
     *                              @OA\Property(
     *                                  property="mass",
     *                                  type="string",
     *                                  example="77"
     *                              ),
     *                              @OA\Property(
     *                                  property="movies",
     *                                  type="array",
     *                                  @OA\Items(
     *                                      type="object",
     *                                      @OA\Property(
     *                                          property="description",
     *                                          type="string",
     *                                          example="A New Hope"
     *                                      ),
     *                                      @OA\Property(
     *                                          property="uid",
     *                                          type="string",
     *                                          example="1"
     *                                      ),
     *                                  )
     *                              )
     *                 )
     *             )
     *         }
     *     ),
     * )
     */
    public function getPerson(Request $request): JsonResponse
    {
        $uid = $request->query('uid');

        if (empty($uid)) {
            return response()->json([
                'message' => 'Invalid id',
            ], 400);
        }

        $results = $this->starWarsService->getPerson($uid);

        if (is_null($results)) {
            return response()->json([
                'message' => 'Could not retrieve a person from Star Wars API.',
            ], 500);
        }

        return response()->json($results);
    }
    
    /**
     * @OA\Get(
     *   path="/star-wars/movies",
     *   @OA\Parameter(
     *      name="title",
     *      in="query",
     *      required=true,
     *      description="Title of the movie to search for (e.g., 'A New Hope')",
     *   ),
     *  @OA\Response(
     *         response="200",
     *         description="ok",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                    type="array",
     *                         @OA\Items(
     *                              type="object",
     *                              @OA\Property(
     *                                  property="title",
     *                                  type="string",
     *                                  example="A New Hope"
     *                              ),
     *                              @OA\Property(
     *                                  property="uid",
     *                                  type="string",
     *                                  example="1"
     *                              ),
     *                     ),
     *                 )
     *             )
     *         }
     *     ),
     * )
     */
    public function searchMovies(Request $request): JsonResponse
    {
        $searchTerm = $request->query('title');

        if (empty($searchTerm)) {
            return response()->json([
                'message' => 'Please provide a "title" query parameter for the search (e.g., ?title=A New Hope).',
            ], 400);
        }

        $results = $this->starWarsService->searchMovies($searchTerm);

        if (is_null($results)) {
            return response()->json([
                'message' => 'Could not retrieve movies from Star Wars API.',
            ], 500);
        }

        return response()->json($results);
    }

    /**
     * @OA\Get(
     *   path="/star-wars/movie",
     *   @OA\Parameter(
     *      name="uid",
     *      in="query",
     *      required=true,
     *      description="Get one movie by uid (e.g., '1')",
     *   ),
     *  @OA\Response(
     *         response="200",
     *         description="ok",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                              type="object",
     *                              @OA\Property(
     *                                  property="title",
     *                                  type="string",
     *                                  example="Return of the Jedi"
     *                              ),
     *                              @OA\Property(
     *                                  property="opening_crawl",
     *                                  type="string",
     *                                  example="Synopsis"
     *                              ),
     *                              @OA\Property(
     *                                  property="characters",
     *                                  type="array",
     *                                  @OA\Items(
     *                                      type="object",
     *                                      @OA\Property(
     *                                          property="name",
     *                                          type="string",
     *                                          example="Luke Skywalker"
     *                                      ),
     *                                      @OA\Property(
     *                                          property="uid",
     *                                          type="string",
     *                                          example="1"
     *                                      ),
     *                                  )
     *                              )
     *                 )
     *             )
     *         }
     *     ),
     * )
     */
    public function getMovie(Request $request): JsonResponse
    {
        $uid = $request->query('uid');

        if (empty($uid)) {
            return response()->json([
                'message' => 'Invalid id',
            ], 400);
        }

        $results = $this->starWarsService->getMovie($uid);

        if (is_null($results)) {
            return response()->json([
                'message' => 'Could not retrieve a movie from Star Wars API.',
            ], 500);
        }

        return response()->json($results);
    }
}