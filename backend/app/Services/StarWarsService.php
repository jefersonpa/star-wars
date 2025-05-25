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
    
    public function getPerson(string $uid): ?array
    {
        $response = $this->request('people/' . $uid);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['result'])) {
                return [
                        'name' => $data['result']['properties']['name'],
                        'birth_year' => $data['result']['properties']['birth_year'],
                        'gender' => $data['result']['properties']['gender'],
                        'eye_color' => $data['result']['properties']['eye_color'],
                        'hair_color' => $data['result']['properties']['hair_color'],
                        'height' => $data['result']['properties']['height'],
                        'mass' => $data['result']['properties']['mass'],
                        'movies' => [
                                        ['description' => 'A New Hope', 'uid' => '1'],
                                        ['description' => 'The Empire Strikes Back', 'uid' => '2'],
                                    ], // Unfortunately, the API does not provide movies anymore, so i just hardcoding it here.
                ];
            }

            return [];
        }

        \Log::error("SWAPI.tech: Failed to search a person", [
            'status' => $response->status(),
            'response' => $response->body(),
            'search_term' => $name
        ]);
        return null;
    }
    
    public function searchMovies(string $title): ?array
    {
        $response = $this->request('films/', ['title' => $title]);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['result']) && is_array($data['result']) && !empty($data['result'])) {
                $desiredArray = array_map(function($item) {
                    return [
                        'title' => $item['properties']['title'],
                        'uid' => $item['uid']
                    ];
                }, $data['result']);
                return $desiredArray;
            }

            return [];
        }

        \Log::error("SWAPI.tech: Failed to search movies", [
            'status' => $response->status(),
            'response' => $response->body(),
            'search_term' => $title
        ]);
        return null;
    }
}