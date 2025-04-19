export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: Parameters<typeof setTimeout>[1],
) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), delay);
  };
}
