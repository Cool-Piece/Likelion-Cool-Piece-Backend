function parseToken(authorization) {
  if (!authorization) {
    return;
  }
  return authorization.slice(BEARER.length);
}

export default parseToken;
