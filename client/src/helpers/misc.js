export function getRoute(path) {
  let args = Array.prototype.slice.call(arguments, 1);
  let count = -1;
  return path.replace(/:[a-zA-Z?]+/g, (match) => {
    count += 1;
    return args[count] !== undefined ? args[count] : match;
  });
}
