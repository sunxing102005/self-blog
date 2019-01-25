module.exports = [
  // RESTFUL
  [/\/api\/(\w+)(?:\/(.*))?/, 'api/:1?id=:2', 'rest'],
  ['/:category/:slug', 'content/detail'],
  ['/:category/:slug/comment', 'content/comment']
];
