export const parseError = (errorLike: unknown): string => {
  if (errorLike instanceof Error) return errorLike.message;
  if (typeof errorLike === 'string') return errorLike;
  if (errorLike instanceof Object) return String(errorLike);
  return 'Unknown error';
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
