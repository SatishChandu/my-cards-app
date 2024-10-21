import { HttpResponse, http } from 'msw';

export const handlers = [
  // Mock the people API response
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json({
        count: 2,
        next: null,
        results: [
          {
            name: "Luke Skywalker",
            homeworld: "https://swapi.dev/api/planets/1/",
            created: "2020-12-10T16:59:45.094Z",
          },
          {
            name: "Darth Vader",
            homeworld: "https://swapi.dev/api/planets/1/",
            created: "2020-12-20T16:59:45.094Z",
          },
        ],
    });
  }),

  // Mock the planet API response
  http.get('https://swapi.dev/api/planets/1/', () => {
    return HttpResponse.json({
        name: "Tatooine",
        population: "200000",
        terrain: "desert",
        gravity: "1 standard",
    });
  })
];
