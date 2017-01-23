const lcuRegex = /([a-z]+):([0-9]+):([0-9]+):([A-Za-z0-9+/=\-_]+):/i;

export default function (fileContents) {
  const matches = fileContents.replace('\n', '').match(lcuRegex);
  if (matches && matches.length > 1) {
    return {
      process: matches[1],
      pid: matches[2],
      port: matches[3],
      password: matches[4]
    };
  }
  return false;
}
