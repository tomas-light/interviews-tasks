import { loadBalancer } from './loadBalancer';

describe('set of 30 urls with limit of 3 requests per time', () => {
  const prefix = 'url ';

  const urls = new Array<string>(30).fill('');
  urls.forEach((value, index, array) => {
    array[index] = prefix + ++index;
  });

  const MILLISECONDS_IN_SECOND = 1000;
  const maxPossibleTimeForTest = urls.length * MILLISECONDS_IN_SECOND;
  jest.setTimeout(maxPossibleTimeForTest);

  test('if responses order keeps urls order', async () => {
    const limit = 3;
    const responses = await loadBalancer(urls, limit);

    const responsesArray = Array.from(responses.values());

    const expectedArray = urls.map((url) => {
      const stringUrlNumber = url.substring(prefix.length);
      const urlNumber = parseInt(stringUrlNumber, 10);
      return `response for url ${urlNumber}`;
    });

    expect(responsesArray).toEqual(expectedArray);
  });
});
