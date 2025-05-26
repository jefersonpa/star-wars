<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DatadogAnalyticsService
{
    protected string $apiKey;
    protected string $appKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.datadog.api_key');
        $this->appKey = config('services.datadog.app_key');
        $this->baseUrl = 'https://api.' . config('services.datadog.site');

        if (!$this->apiKey || !$this->appKey) {
            throw new \Exception('Datadog API or Application Key is not configured.');
        }
    }

    private function request(string $method, string $path, array $payload = [])
    {
        $request = Http::withHeaders([
            'DD-API-KEY' => $this->apiKey,
            'DD-APPLICATION-KEY' => $this->appKey,
            'Content-Type' => 'application/json',
        ]);

        if ($method === 'get') {
            return $request->get($this->baseUrl . $path, $payload);
        }

        return $request->post($this->baseUrl . $path, $payload);
    }

    public function getAverageRequestTime()
    {
        $response = $this->request('get', '/api/v1/query', [
            'query' => 'avg:trace.web.request.duration{service:my-laravel-app}',
            'from' => time() - (24 * 3600),
            'to' => time(),
        ]);

        if (!$response->successful()) {
            return ['error' => 'Failed to fetch average request time', 'details' => $response->json()];
        }

        $points = $response->json()['series'][0]['pointlist'] ?? [];
        $values = array_column($points, 1);
        $average = count($values) > 0 ? array_sum($values) / count($values) : 0;

        return [
            'average_duration_seconds' => $average,
            'average_duration_ms' => round($average * 1000, 2),
        ];
    }

    public function getApiCallCount()
    {
        $response = $this->request('get', '/api/v1/query', [
            'query' => 'sum:trace.web.request.hits{service:my-laravel-app}',
            'from' => time() - (24 * 3600),
            'to' => time(),
        ]);

        if (!$response->successful()) {
            return ['error' => 'Failed to fetch API call count', 'details' => $response->json()];
        }

        $points = $response->json()['series'][0]['pointlist'] ?? [];
        $values = array_column($points, 1);
        $totalCount = array_sum($values);

        return [
            'api_call_count' => (int) $totalCount,
        ];
    }
    
    public function getApiCallErrorsCount()
    {
        $response = $this->request('get', '/api/v1/query', [
            'query' => 'sum:trace.web.errors{service:my-laravel-app}',
            'from' => time() - (24 * 3600),
            'to' => time(),
        ]);

        if (!$response->successful()) {
            return ['error' => 'Failed to fetch API call count', 'details' => $response->json()];
        }

        $points = $response->json()['series'][0]['pointlist'] ?? [];
        $values = array_column($points, 1);
        $totalCount = array_sum($values);

        return [
            'api_call_count_errors' => (int) $totalCount,
        ];
    }
}