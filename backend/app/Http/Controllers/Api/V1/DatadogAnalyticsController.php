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