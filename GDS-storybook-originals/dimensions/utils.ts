type Px<T> = T extends number
  ? `${T}px`
  : T extends string
    ? T extends `${infer _}px`
      ? T
      : `${T}px`
    : { [K in keyof T]: T[K] extends (infer U)[] ? Px<U>[] : Px<T[K]> };

export function addPx<T>(input: T): Px<T> {
  if (typeof input === "number") {
    return `${input}px` as Px<T>;
  } else if (typeof input === "string") {
    return input.endsWith("px") ? (input as Px<T>) : (`${input}px` as Px<T>);
  } else if (Array.isArray(input)) {
    return input.map(addPx) as Px<T>;
  } else if (typeof input === "object" && input !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: fix
    const result = {} as any;
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        result[key] = addPx(input[key]);
      }
    }
    return result as Px<T>;
  } else {
    throw new Error("Unsupported input type");
  }
}
