/**
 * Helper function that calls the provided function with a mutation observer as it's last argument.
 * The observer will call the provided function again with the same args whenever an observed
 * mutation occurs.
 *
 * @param fn function The function to call with a mutation observer
 * @param args mixed Arguments to call fn with
 */
export default function withObserver(fn, ...args) {
  const observer = new MutationObserver((records, obs) => fn(...args, { records, observer: obs }));

  return fn(...args, { records: [], observer });
}
