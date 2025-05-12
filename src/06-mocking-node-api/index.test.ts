import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    // проверяем, что setTimeout вызвался
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 2000);

    // еще не сработал
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    // теперь должен сработать
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 500);

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 300);

    jest.advanceTimersByTime(900);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockedJoin = join as jest.Mock;
  const mockedExistsSync = existsSync as jest.Mock;
  const mockedReadFile = readFile as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    mockedJoin.mockReturnValue('/mock/path/file.txt');
    mockedExistsSync.mockReturnValue(false);

    await readFileAsynchronously('file.txt');

    expect(mockedJoin).toHaveBeenCalledWith(expect.any(String), 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    mockedJoin.mockReturnValue('/mock/path/file.txt');
    mockedExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
    expect(mockedExistsSync).toHaveBeenCalledWith('/mock/path/file.txt');
    expect(mockedReadFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    mockedJoin.mockReturnValue('/mock/path/file.txt');
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from('Hello, world!'));

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('Hello, world!');
    expect(mockedReadFile).toHaveBeenCalledWith('/mock/path/file.txt');
  });
});
