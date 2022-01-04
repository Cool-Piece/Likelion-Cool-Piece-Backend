function parseToken(authorization) {
  const BEARER = "Bearer";
  if (!authorization) {
    return;
  }
  return authorization.slice(BEARER.length);
}

export default parseToken;
