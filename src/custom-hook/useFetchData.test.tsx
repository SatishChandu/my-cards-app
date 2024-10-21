import { renderHook, act } from "@testing-library/react";
import { setupServer } from "msw/node";
// import axios from "axios";
import { waitFor } from '@testing-library/react';
import useFetchData from "./useFetchData";
import { handlers } from '../mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useFetchData hook", () => {
  test("should initialze with the correct values", async () => {
    const { result } = renderHook(() =>
      useFetchData("https://swapi.dev/api/people", 10)
    );
    expect(result.current.info).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(0);
  });

  test('should fetch and format data correctly', async () => {
    const { result } = renderHook(() => useFetchData('https://swapi.dev/api/people', 10));

    expect(result.current.info).toEqual([]);

    await waitFor(() => expect(result.current.info.length).toBeGreaterThan(0), { timeout: 5000 });
    
    expect(result.current.info).toStrictEqual([
        {
            name: 'Luke Skywalker',
            homeWorldData: {name: 'Tatooine', population: '200000', terrain: 'desert', gravity: '1 standard'},
            created: expect.any(String)
        },
        {
            name: 'Darth Vader',
            homeWorldData: {name: 'Tatooine', population: '200000', terrain: 'desert', gravity: '1 standard'},
            created: expect.any(String)
        }
    ]);

    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasNextPage).toBe(false);
  });
});
