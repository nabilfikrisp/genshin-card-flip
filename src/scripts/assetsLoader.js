function images() {
  const path = require.context("./../assets/", false, /\.png$/);
  console.log(path.keys().map(path));
  return path.keys().map(path);
}

