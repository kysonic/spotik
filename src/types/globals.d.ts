export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      externalId?: number;
    };
  }
}
