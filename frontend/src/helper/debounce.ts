export default function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
  let timeout: number | null = null;

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}
