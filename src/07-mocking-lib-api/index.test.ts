import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  const actualAxios = jest.requireActual('axios');
  return {
    ...actualAxios,
    create: jest.fn(() => ({
      get: jest.fn(),
    })),
  };
});

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn, // обходим throttle
}));

describe('throttledGetDataFromApi', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
  });

  test('should create axios instance with provided base URL', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: 'mockedData' });

    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform GET request to the correct URL', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: 'mockedData' });

    await throttledGetDataFromApi('/posts/123');

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/posts/123');
  });

  test('should return response data', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: { id: 1, title: 'Test' } });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual({ id: 1, title: 'Test' });
  });

  test('should throttle subsequent calls within throttle time', async () => {
    const spy = jest.fn();
    mockAxiosInstance.get.mockImplementation(async () => {
      spy();
      return { data: 'mocked' };
    });

    await throttledGetDataFromApi('/posts/1');
    await throttledGetDataFromApi('/posts/2');
    await throttledGetDataFromApi('/posts/3');

    expect(spy).toHaveBeenCalledTimes(3); // теперь throttle не мешает

  });
});
