<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Services\DatadogAnalyticsService;
use Illuminate\Http\JsonResponse;

class DatadogAnalyticsController extends Controller
{
    protected DatadogAnalyticsService $analyticsService;

    public function __construct(DatadogAnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    /**
     * @OA\Get(
     *   path="/analytics",
     *  @OA\Response(
     *      response="200",
     *      description="ok",
     *      content={
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  type="object",
     *                  @OA\Property(
     *                      property="average_request_timing",
     *                      type="object",
     *                      @OA\Property(
     *                          property="average_duration_seconds",
     *                          type="number",
     *                          format="float",
     *                          example=0.002587865029151241
     *                      ),
     *                      @OA\Property(
     *                          property="average_duration_ms",
     *                          type="number",
     *                          format="float",
     *                          example=2.59
     *                      )
     *                  ),
     *                  @OA\Property(
     *                      property="count_of_calls",
     *                      type="object",
     *                      @OA\Property(
     *                          property="api_call_count",
     *                          type="integer",
     *                          example=3
     *                      )
     *                  ),
     *                  @OA\Property(
     *                      property="count_of_errors",
     *                      type="object",
     *                      @OA\Property(
     *                          property="api_call_count_errors",
     *                          type="integer",
     *                          example=0
     *                      )
     *                  )
     *              )
     *          )
     *      }
     *  )
     *)
    */
    public function getDashboardData(): JsonResponse
    {
        $callCountErrors = $this->analyticsService->getApiCallErrorsCount();
        $avgTime = $this->analyticsService->getAverageRequestTime();
        $callCount = $this->analyticsService->getApiCallCount();

        return response()->json([
            'average_request_timing' => $avgTime,
            'count_of_calls' => $callCount,
            'count_of_errors' => $callCountErrors,
        ]);
    }
}