export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      externalId?: number;
    };
  }

  interface JwtPayload {
    externalId?: number;
  }
}
