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

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
