<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use DDTrace\Tag;
use DDTrace;
use OpenTracing\GlobalTracer;

class StarWarsService
{
    protected string $baseUrl = 'https://www.swapi.tech/api/';

    protected function request(string $path, array $query = []): Response
    {
        $tracer = GlobalTracer::get();
        $scope = $tracer->startActiveSpan("starwars.request");
        $span = $scope->getSpan();

        try {
            $span->setTag("service.name", "my-laravel-app");
            $span->setTag("resource.name", $path);
            $span->setTag("http.url", "{$this->baseUrl}{$path}");

            if (!empty($query)) {
                $span->setTag("http.query", http_build_query($query));
                foreach ($query as $key => $value) {
                    if (is_scalar($value)) {
                        $span->setTag("http.query.param.{$key}", (string)$value);
                    }
                }
            }

            return Http::get("{$this->baseUrl}{$path}", $query);
        } finally {
            $span->finish();
            $scope->close();
        }
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
                                        ['description' => 'Return of the Jedi', 'uid' => '3'],
                                        ['description' => 'The Phantom Menace', 'uid' => '4'],
                                        ['description' => 'This is just a Mock, the API no longer returns movies per person, characters per movie is working', 'uid' => '5'],
                                    ], // Unfortunately, the API does not provide movies by people anymore, so i just hardcoding it here.
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
    
    public function getMovie(string $uid): ?array
    {
        $response = $this->request('films/' . $uid);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['result'])) {
                $characters = $data['result']['properties']['characters'];

                $charactersObject = [];

                $responses = Http::pool(fn ($pool) =>
                    array_map(function ($url) use ($pool) {
                        return $pool->get($url);
                    }, $characters)
                );

                foreach ($responses as $index => $charactersResponse) {
                    $uid = basename($characters[$index]);

                    if ($charactersResponse->successful()) {
                        $characterData = $charactersResponse->json('result.properties');
                        $charactersObject[] = [
                            'name' => $characterData['name'],
                            'uid' => $uid,
                        ];
                    }
                }

                return [
                        'title' => $data['result']['properties']['title'],
                        'opening_crawl' => $data['result']['properties']['opening_crawl'],
                        'characters' => $charactersObject,
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
}