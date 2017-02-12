export default function call (target, ...args) {
  if (target && target.call) {
    target(...args);
    return true;
  }
  return false;
}
