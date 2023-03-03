function getRandomTimer(): number {
  const randomSeconds = Math.random();
  const milliseconds = randomSeconds * 1000;
  return milliseconds;
}

function pseudoFetch(url: string) {
  return new Promise<string>((resolve) => {
    const timer = getRandomTimer();
    setTimeout(() => {
      resolve(`response for ${url}`);
    }, timer);
  });
}

type PromiseState = 'pending' | 'fulfilled' | 'rejected';

export async function loadBalancer(urls: string[], limit: number) {
  const restUrls = urls.slice();

  type RequestedUrl = string;
  type Response = string;
  const promiseMap = new Map<RequestedUrl, Promise<void> | PromiseState>();
  const responses = new Map<RequestedUrl, Response | undefined>();

  let resolveWaitPromise: () => void;
  const waitAllPromise = new Promise<void>((resolve) => {
    resolveWaitPromise = resolve;
  });

  function runNextBatch(batchSize: number, resolvedUrlJustForLogging?: string) {
    if (restUrls.length > 0) {
      const urlsToResponse = restUrls.splice(0, batchSize);
      if (resolvedUrlJustForLogging) {
        console.log(`${resolvedUrlJustForLogging} end, new request to ${urlsToResponse.join(',')}`);
      }

      urlsToResponse.forEach((url) => {
        responses.set(url, undefined); // keep original order

        const promise = pseudoFetch(url).then((response) => {
          responses.set(url, response);
          promiseMap.set(url, 'fulfilled');
          runNextBatch(1);
        });

        promiseMap.set(url, promise);
      });
    } else {
      if (promiseMap.size !== urls.length) {
        return;
      }

      const areAllPromisesFulfilled = Array.from(promiseMap.values()).every((promise) => {
        return (['fulfilled', 'rejected'] as (PromiseState | Promise<any>)[]).includes(promise);
      });

      if (areAllPromisesFulfilled) {
        resolveWaitPromise();
      }
    }
  }

  runNextBatch(limit);

  await waitAllPromise;

  return responses;
}
