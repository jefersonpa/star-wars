<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class StarWarsService
{
    protected string $baseUrl = 'https://www.swapi.tech/api/';

    protected function request(string $path, array $query = []): Response
    {
        return Http::get("{$this->baseUrl}{$path}", $query);
    }

    public function searchPeople(string $name): ?array
    {
        $response = $this->request('people/', ['name' => $name]);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['result']) && is_array($data['result']) && !empty($data['result'])) {
                $desiredArray = array_map(function($item) {
                    return [
                        'name' => $item['properties']['name'],
                        'uid' => $item['uid']
                    ];
                }, $data['result']);
                return $desiredArray;
            }

            return [];
        }

        \Log::error("SWAPI.tech: Failed to search people", [
            'status' => $response->status(),
            'response' => $response->body(),
            'search_term' => $name
        ]);
        return null;
    }
}