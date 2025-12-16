/**
 * Suspense를 위한 리소스 래퍼
 * Promise를 throw하여 Suspense가 로딩을 처리하도록 하고,
 * 에러를 throw하여 Error Boundary가 에러를 처리하도록 함
 */
export const createSuspenseResource = <T>(promise: Promise<T>) => {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: Error;

  const suspender = promise.then(
    data => {
      status = 'success';
      result = data;
    },
    err => {
      status = 'error';
      error = err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender; // Suspense가 catch
      } else if (status === 'error') {
        throw error; // Error Boundary가 catch
      }
      return result;
    },
  };
};
