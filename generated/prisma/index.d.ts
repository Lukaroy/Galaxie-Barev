
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Font
 * 
 */
export type Font = $Result.DefaultSelection<Prisma.$FontPayload>
/**
 * Model Palette
 * 
 */
export type Palette = $Result.DefaultSelection<Prisma.$PalettePayload>
/**
 * Model Segment
 * 
 */
export type Segment = $Result.DefaultSelection<Prisma.$SegmentPayload>
/**
 * Model Attribute
 * 
 */
export type Attribute = $Result.DefaultSelection<Prisma.$AttributePayload>
/**
 * Model ElementType
 * 
 */
export type ElementType = $Result.DefaultSelection<Prisma.$ElementTypePayload>
/**
 * Model ElementAttribute
 * 
 */
export type ElementAttribute = $Result.DefaultSelection<Prisma.$ElementAttributePayload>
/**
 * Model Element
 * 
 */
export type Element = $Result.DefaultSelection<Prisma.$ElementPayload>
/**
 * Model ElementValue
 * 
 */
export type ElementValue = $Result.DefaultSelection<Prisma.$ElementValuePayload>
/**
 * Model Moodboard
 * 
 */
export type Moodboard = $Result.DefaultSelection<Prisma.$MoodboardPayload>
/**
 * Model GalleryPin
 * 
 */
export type GalleryPin = $Result.DefaultSelection<Prisma.$GalleryPinPayload>
/**
 * Model GalleryPinLike
 * 
 */
export type GalleryPinLike = $Result.DefaultSelection<Prisma.$GalleryPinLikePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const SegmentType: {
  LESSON: 'LESSON',
  TEST: 'TEST'
};

export type SegmentType = (typeof SegmentType)[keyof typeof SegmentType]


export const Difficulty: {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type SegmentType = $Enums.SegmentType

export const SegmentType: typeof $Enums.SegmentType

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.font`: Exposes CRUD operations for the **Font** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fonts
    * const fonts = await prisma.font.findMany()
    * ```
    */
  get font(): Prisma.FontDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.palette`: Exposes CRUD operations for the **Palette** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Palettes
    * const palettes = await prisma.palette.findMany()
    * ```
    */
  get palette(): Prisma.PaletteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.segment`: Exposes CRUD operations for the **Segment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Segments
    * const segments = await prisma.segment.findMany()
    * ```
    */
  get segment(): Prisma.SegmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attribute`: Exposes CRUD operations for the **Attribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attributes
    * const attributes = await prisma.attribute.findMany()
    * ```
    */
  get attribute(): Prisma.AttributeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.elementType`: Exposes CRUD operations for the **ElementType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ElementTypes
    * const elementTypes = await prisma.elementType.findMany()
    * ```
    */
  get elementType(): Prisma.ElementTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.elementAttribute`: Exposes CRUD operations for the **ElementAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ElementAttributes
    * const elementAttributes = await prisma.elementAttribute.findMany()
    * ```
    */
  get elementAttribute(): Prisma.ElementAttributeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.element`: Exposes CRUD operations for the **Element** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elements
    * const elements = await prisma.element.findMany()
    * ```
    */
  get element(): Prisma.ElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.elementValue`: Exposes CRUD operations for the **ElementValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ElementValues
    * const elementValues = await prisma.elementValue.findMany()
    * ```
    */
  get elementValue(): Prisma.ElementValueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moodboard`: Exposes CRUD operations for the **Moodboard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Moodboards
    * const moodboards = await prisma.moodboard.findMany()
    * ```
    */
  get moodboard(): Prisma.MoodboardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.galleryPin`: Exposes CRUD operations for the **GalleryPin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GalleryPins
    * const galleryPins = await prisma.galleryPin.findMany()
    * ```
    */
  get galleryPin(): Prisma.GalleryPinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.galleryPinLike`: Exposes CRUD operations for the **GalleryPinLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GalleryPinLikes
    * const galleryPinLikes = await prisma.galleryPinLike.findMany()
    * ```
    */
  get galleryPinLike(): Prisma.GalleryPinLikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Font: 'Font',
    Palette: 'Palette',
    Segment: 'Segment',
    Attribute: 'Attribute',
    ElementType: 'ElementType',
    ElementAttribute: 'ElementAttribute',
    Element: 'Element',
    ElementValue: 'ElementValue',
    Moodboard: 'Moodboard',
    GalleryPin: 'GalleryPin',
    GalleryPinLike: 'GalleryPinLike'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "font" | "palette" | "segment" | "attribute" | "elementType" | "elementAttribute" | "element" | "elementValue" | "moodboard" | "galleryPin" | "galleryPinLike"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Font: {
        payload: Prisma.$FontPayload<ExtArgs>
        fields: Prisma.FontFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FontFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FontFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>
          }
          findFirst: {
            args: Prisma.FontFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FontFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>
          }
          findMany: {
            args: Prisma.FontFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>[]
          }
          create: {
            args: Prisma.FontCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>
          }
          createMany: {
            args: Prisma.FontCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FontCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>[]
          }
          delete: {
            args: Prisma.FontDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>
          }
          update: {
            args: Prisma.FontUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>
          }
          deleteMany: {
            args: Prisma.FontDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FontUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FontUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>[]
          }
          upsert: {
            args: Prisma.FontUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontPayload>
          }
          aggregate: {
            args: Prisma.FontAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFont>
          }
          groupBy: {
            args: Prisma.FontGroupByArgs<ExtArgs>
            result: $Utils.Optional<FontGroupByOutputType>[]
          }
          count: {
            args: Prisma.FontCountArgs<ExtArgs>
            result: $Utils.Optional<FontCountAggregateOutputType> | number
          }
        }
      }
      Palette: {
        payload: Prisma.$PalettePayload<ExtArgs>
        fields: Prisma.PaletteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaletteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaletteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>
          }
          findFirst: {
            args: Prisma.PaletteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaletteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>
          }
          findMany: {
            args: Prisma.PaletteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>[]
          }
          create: {
            args: Prisma.PaletteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>
          }
          createMany: {
            args: Prisma.PaletteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaletteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>[]
          }
          delete: {
            args: Prisma.PaletteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>
          }
          update: {
            args: Prisma.PaletteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>
          }
          deleteMany: {
            args: Prisma.PaletteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaletteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaletteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>[]
          }
          upsert: {
            args: Prisma.PaletteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PalettePayload>
          }
          aggregate: {
            args: Prisma.PaletteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePalette>
          }
          groupBy: {
            args: Prisma.PaletteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaletteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaletteCountArgs<ExtArgs>
            result: $Utils.Optional<PaletteCountAggregateOutputType> | number
          }
        }
      }
      Segment: {
        payload: Prisma.$SegmentPayload<ExtArgs>
        fields: Prisma.SegmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SegmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SegmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>
          }
          findFirst: {
            args: Prisma.SegmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SegmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>
          }
          findMany: {
            args: Prisma.SegmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>[]
          }
          create: {
            args: Prisma.SegmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>
          }
          createMany: {
            args: Prisma.SegmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SegmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>[]
          }
          delete: {
            args: Prisma.SegmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>
          }
          update: {
            args: Prisma.SegmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>
          }
          deleteMany: {
            args: Prisma.SegmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SegmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SegmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>[]
          }
          upsert: {
            args: Prisma.SegmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SegmentPayload>
          }
          aggregate: {
            args: Prisma.SegmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSegment>
          }
          groupBy: {
            args: Prisma.SegmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SegmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SegmentCountArgs<ExtArgs>
            result: $Utils.Optional<SegmentCountAggregateOutputType> | number
          }
        }
      }
      Attribute: {
        payload: Prisma.$AttributePayload<ExtArgs>
        fields: Prisma.AttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          findFirst: {
            args: Prisma.AttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          findMany: {
            args: Prisma.AttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>[]
          }
          create: {
            args: Prisma.AttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          createMany: {
            args: Prisma.AttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttributeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>[]
          }
          delete: {
            args: Prisma.AttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          update: {
            args: Prisma.AttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          deleteMany: {
            args: Prisma.AttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttributeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>[]
          }
          upsert: {
            args: Prisma.AttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          aggregate: {
            args: Prisma.AttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttribute>
          }
          groupBy: {
            args: Prisma.AttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttributeCountArgs<ExtArgs>
            result: $Utils.Optional<AttributeCountAggregateOutputType> | number
          }
        }
      }
      ElementType: {
        payload: Prisma.$ElementTypePayload<ExtArgs>
        fields: Prisma.ElementTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>
          }
          findFirst: {
            args: Prisma.ElementTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>
          }
          findMany: {
            args: Prisma.ElementTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>[]
          }
          create: {
            args: Prisma.ElementTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>
          }
          createMany: {
            args: Prisma.ElementTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>[]
          }
          delete: {
            args: Prisma.ElementTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>
          }
          update: {
            args: Prisma.ElementTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>
          }
          deleteMany: {
            args: Prisma.ElementTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>[]
          }
          upsert: {
            args: Prisma.ElementTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementTypePayload>
          }
          aggregate: {
            args: Prisma.ElementTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElementType>
          }
          groupBy: {
            args: Prisma.ElementTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementTypeCountArgs<ExtArgs>
            result: $Utils.Optional<ElementTypeCountAggregateOutputType> | number
          }
        }
      }
      ElementAttribute: {
        payload: Prisma.$ElementAttributePayload<ExtArgs>
        fields: Prisma.ElementAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>
          }
          findFirst: {
            args: Prisma.ElementAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>
          }
          findMany: {
            args: Prisma.ElementAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>[]
          }
          create: {
            args: Prisma.ElementAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>
          }
          createMany: {
            args: Prisma.ElementAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementAttributeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>[]
          }
          delete: {
            args: Prisma.ElementAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>
          }
          update: {
            args: Prisma.ElementAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>
          }
          deleteMany: {
            args: Prisma.ElementAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementAttributeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>[]
          }
          upsert: {
            args: Prisma.ElementAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementAttributePayload>
          }
          aggregate: {
            args: Prisma.ElementAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElementAttribute>
          }
          groupBy: {
            args: Prisma.ElementAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<ElementAttributeCountAggregateOutputType> | number
          }
        }
      }
      Element: {
        payload: Prisma.$ElementPayload<ExtArgs>
        fields: Prisma.ElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findFirst: {
            args: Prisma.ElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findMany: {
            args: Prisma.ElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          create: {
            args: Prisma.ElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          createMany: {
            args: Prisma.ElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          delete: {
            args: Prisma.ElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          update: {
            args: Prisma.ElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          deleteMany: {
            args: Prisma.ElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          upsert: {
            args: Prisma.ElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          aggregate: {
            args: Prisma.ElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElement>
          }
          groupBy: {
            args: Prisma.ElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementCountArgs<ExtArgs>
            result: $Utils.Optional<ElementCountAggregateOutputType> | number
          }
        }
      }
      ElementValue: {
        payload: Prisma.$ElementValuePayload<ExtArgs>
        fields: Prisma.ElementValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>
          }
          findFirst: {
            args: Prisma.ElementValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>
          }
          findMany: {
            args: Prisma.ElementValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>[]
          }
          create: {
            args: Prisma.ElementValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>
          }
          createMany: {
            args: Prisma.ElementValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementValueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>[]
          }
          delete: {
            args: Prisma.ElementValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>
          }
          update: {
            args: Prisma.ElementValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>
          }
          deleteMany: {
            args: Prisma.ElementValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementValueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>[]
          }
          upsert: {
            args: Prisma.ElementValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementValuePayload>
          }
          aggregate: {
            args: Prisma.ElementValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElementValue>
          }
          groupBy: {
            args: Prisma.ElementValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementValueCountArgs<ExtArgs>
            result: $Utils.Optional<ElementValueCountAggregateOutputType> | number
          }
        }
      }
      Moodboard: {
        payload: Prisma.$MoodboardPayload<ExtArgs>
        fields: Prisma.MoodboardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodboardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodboardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>
          }
          findFirst: {
            args: Prisma.MoodboardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodboardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>
          }
          findMany: {
            args: Prisma.MoodboardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>[]
          }
          create: {
            args: Prisma.MoodboardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>
          }
          createMany: {
            args: Prisma.MoodboardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodboardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>[]
          }
          delete: {
            args: Prisma.MoodboardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>
          }
          update: {
            args: Prisma.MoodboardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>
          }
          deleteMany: {
            args: Prisma.MoodboardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodboardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodboardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>[]
          }
          upsert: {
            args: Prisma.MoodboardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodboardPayload>
          }
          aggregate: {
            args: Prisma.MoodboardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoodboard>
          }
          groupBy: {
            args: Prisma.MoodboardGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodboardGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodboardCountArgs<ExtArgs>
            result: $Utils.Optional<MoodboardCountAggregateOutputType> | number
          }
        }
      }
      GalleryPin: {
        payload: Prisma.$GalleryPinPayload<ExtArgs>
        fields: Prisma.GalleryPinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GalleryPinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GalleryPinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>
          }
          findFirst: {
            args: Prisma.GalleryPinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GalleryPinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>
          }
          findMany: {
            args: Prisma.GalleryPinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>[]
          }
          create: {
            args: Prisma.GalleryPinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>
          }
          createMany: {
            args: Prisma.GalleryPinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GalleryPinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>[]
          }
          delete: {
            args: Prisma.GalleryPinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>
          }
          update: {
            args: Prisma.GalleryPinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>
          }
          deleteMany: {
            args: Prisma.GalleryPinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GalleryPinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GalleryPinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>[]
          }
          upsert: {
            args: Prisma.GalleryPinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinPayload>
          }
          aggregate: {
            args: Prisma.GalleryPinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGalleryPin>
          }
          groupBy: {
            args: Prisma.GalleryPinGroupByArgs<ExtArgs>
            result: $Utils.Optional<GalleryPinGroupByOutputType>[]
          }
          count: {
            args: Prisma.GalleryPinCountArgs<ExtArgs>
            result: $Utils.Optional<GalleryPinCountAggregateOutputType> | number
          }
        }
      }
      GalleryPinLike: {
        payload: Prisma.$GalleryPinLikePayload<ExtArgs>
        fields: Prisma.GalleryPinLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GalleryPinLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GalleryPinLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>
          }
          findFirst: {
            args: Prisma.GalleryPinLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GalleryPinLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>
          }
          findMany: {
            args: Prisma.GalleryPinLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>[]
          }
          create: {
            args: Prisma.GalleryPinLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>
          }
          createMany: {
            args: Prisma.GalleryPinLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GalleryPinLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>[]
          }
          delete: {
            args: Prisma.GalleryPinLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>
          }
          update: {
            args: Prisma.GalleryPinLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>
          }
          deleteMany: {
            args: Prisma.GalleryPinLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GalleryPinLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GalleryPinLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>[]
          }
          upsert: {
            args: Prisma.GalleryPinLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPinLikePayload>
          }
          aggregate: {
            args: Prisma.GalleryPinLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGalleryPinLike>
          }
          groupBy: {
            args: Prisma.GalleryPinLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GalleryPinLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GalleryPinLikeCountArgs<ExtArgs>
            result: $Utils.Optional<GalleryPinLikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    font?: FontOmit
    palette?: PaletteOmit
    segment?: SegmentOmit
    attribute?: AttributeOmit
    elementType?: ElementTypeOmit
    elementAttribute?: ElementAttributeOmit
    element?: ElementOmit
    elementValue?: ElementValueOmit
    moodboard?: MoodboardOmit
    galleryPin?: GalleryPinOmit
    galleryPinLike?: GalleryPinLikeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    galleryPins: number
    galleryPinLikes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    galleryPins?: boolean | UserCountOutputTypeCountGalleryPinsArgs
    galleryPinLikes?: boolean | UserCountOutputTypeCountGalleryPinLikesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGalleryPinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryPinWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGalleryPinLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryPinLikeWhereInput
  }


  /**
   * Count Type AttributeCountOutputType
   */

  export type AttributeCountOutputType = {
    elementTypes: number
    elementValues: number
  }

  export type AttributeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementTypes?: boolean | AttributeCountOutputTypeCountElementTypesArgs
    elementValues?: boolean | AttributeCountOutputTypeCountElementValuesArgs
  }

  // Custom InputTypes
  /**
   * AttributeCountOutputType without action
   */
  export type AttributeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeCountOutputType
     */
    select?: AttributeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttributeCountOutputType without action
   */
  export type AttributeCountOutputTypeCountElementTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementAttributeWhereInput
  }

  /**
   * AttributeCountOutputType without action
   */
  export type AttributeCountOutputTypeCountElementValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementValueWhereInput
  }


  /**
   * Count Type ElementTypeCountOutputType
   */

  export type ElementTypeCountOutputType = {
    elements: number
    attributes: number
  }

  export type ElementTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | ElementTypeCountOutputTypeCountElementsArgs
    attributes?: boolean | ElementTypeCountOutputTypeCountAttributesArgs
  }

  // Custom InputTypes
  /**
   * ElementTypeCountOutputType without action
   */
  export type ElementTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementTypeCountOutputType
     */
    select?: ElementTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElementTypeCountOutputType without action
   */
  export type ElementTypeCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
  }

  /**
   * ElementTypeCountOutputType without action
   */
  export type ElementTypeCountOutputTypeCountAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementAttributeWhereInput
  }


  /**
   * Count Type ElementCountOutputType
   */

  export type ElementCountOutputType = {
    values: number
  }

  export type ElementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | ElementCountOutputTypeCountValuesArgs
  }

  // Custom InputTypes
  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementCountOutputType
     */
    select?: ElementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeCountValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementValueWhereInput
  }


  /**
   * Count Type MoodboardCountOutputType
   */

  export type MoodboardCountOutputType = {
    elements: number
  }

  export type MoodboardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | MoodboardCountOutputTypeCountElementsArgs
  }

  // Custom InputTypes
  /**
   * MoodboardCountOutputType without action
   */
  export type MoodboardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodboardCountOutputType
     */
    select?: MoodboardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MoodboardCountOutputType without action
   */
  export type MoodboardCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
  }


  /**
   * Count Type GalleryPinCountOutputType
   */

  export type GalleryPinCountOutputType = {
    likes: number
  }

  export type GalleryPinCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    likes?: boolean | GalleryPinCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * GalleryPinCountOutputType without action
   */
  export type GalleryPinCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinCountOutputType
     */
    select?: GalleryPinCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GalleryPinCountOutputType without action
   */
  export type GalleryPinCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryPinLikeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    userName: string | null
    birthday: Date | null
    role: $Enums.UserRole | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    userName: string | null
    birthday: Date | null
    role: $Enums.UserRole | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    userName: number
    birthday: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    userName?: true
    birthday?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    userName?: true
    birthday?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    userName?: true
    birthday?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    userName: string
    birthday: Date | null
    role: $Enums.UserRole
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    userName?: boolean
    birthday?: boolean
    role?: boolean
    galleryPins?: boolean | User$galleryPinsArgs<ExtArgs>
    galleryPinLikes?: boolean | User$galleryPinLikesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    userName?: boolean
    birthday?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    userName?: boolean
    birthday?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    userName?: boolean
    birthday?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "userName" | "birthday" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    galleryPins?: boolean | User$galleryPinsArgs<ExtArgs>
    galleryPinLikes?: boolean | User$galleryPinLikesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      galleryPins: Prisma.$GalleryPinPayload<ExtArgs>[]
      galleryPinLikes: Prisma.$GalleryPinLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      firstName: string | null
      lastName: string | null
      userName: string
      birthday: Date | null
      role: $Enums.UserRole
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    galleryPins<T extends User$galleryPinsArgs<ExtArgs> = {}>(args?: Subset<T, User$galleryPinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    galleryPinLikes<T extends User$galleryPinLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$galleryPinLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly userName: FieldRef<"User", 'String'>
    readonly birthday: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'UserRole'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.galleryPins
   */
  export type User$galleryPinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    where?: GalleryPinWhereInput
    orderBy?: GalleryPinOrderByWithRelationInput | GalleryPinOrderByWithRelationInput[]
    cursor?: GalleryPinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GalleryPinScalarFieldEnum | GalleryPinScalarFieldEnum[]
  }

  /**
   * User.galleryPinLikes
   */
  export type User$galleryPinLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    where?: GalleryPinLikeWhereInput
    orderBy?: GalleryPinLikeOrderByWithRelationInput | GalleryPinLikeOrderByWithRelationInput[]
    cursor?: GalleryPinLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GalleryPinLikeScalarFieldEnum | GalleryPinLikeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Font
   */

  export type AggregateFont = {
    _count: FontCountAggregateOutputType | null
    _avg: FontAvgAggregateOutputType | null
    _sum: FontSumAggregateOutputType | null
    _min: FontMinAggregateOutputType | null
    _max: FontMaxAggregateOutputType | null
  }

  export type FontAvgAggregateOutputType = {
    id: number | null
  }

  export type FontSumAggregateOutputType = {
    id: number | null
  }

  export type FontMinAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
    url: string | null
    tips: string | null
  }

  export type FontMaxAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
    url: string | null
    tips: string | null
  }

  export type FontCountAggregateOutputType = {
    id: number
    name: number
    category: number
    url: number
    tips: number
    _all: number
  }


  export type FontAvgAggregateInputType = {
    id?: true
  }

  export type FontSumAggregateInputType = {
    id?: true
  }

  export type FontMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    url?: true
    tips?: true
  }

  export type FontMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    url?: true
    tips?: true
  }

  export type FontCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    url?: true
    tips?: true
    _all?: true
  }

  export type FontAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Font to aggregate.
     */
    where?: FontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonts to fetch.
     */
    orderBy?: FontOrderByWithRelationInput | FontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fonts
    **/
    _count?: true | FontCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FontAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FontSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FontMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FontMaxAggregateInputType
  }

  export type GetFontAggregateType<T extends FontAggregateArgs> = {
        [P in keyof T & keyof AggregateFont]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFont[P]>
      : GetScalarType<T[P], AggregateFont[P]>
  }




  export type FontGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FontWhereInput
    orderBy?: FontOrderByWithAggregationInput | FontOrderByWithAggregationInput[]
    by: FontScalarFieldEnum[] | FontScalarFieldEnum
    having?: FontScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FontCountAggregateInputType | true
    _avg?: FontAvgAggregateInputType
    _sum?: FontSumAggregateInputType
    _min?: FontMinAggregateInputType
    _max?: FontMaxAggregateInputType
  }

  export type FontGroupByOutputType = {
    id: number
    name: string
    category: string
    url: string
    tips: string | null
    _count: FontCountAggregateOutputType | null
    _avg: FontAvgAggregateOutputType | null
    _sum: FontSumAggregateOutputType | null
    _min: FontMinAggregateOutputType | null
    _max: FontMaxAggregateOutputType | null
  }

  type GetFontGroupByPayload<T extends FontGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FontGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FontGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FontGroupByOutputType[P]>
            : GetScalarType<T[P], FontGroupByOutputType[P]>
        }
      >
    >


  export type FontSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    url?: boolean
    tips?: boolean
  }, ExtArgs["result"]["font"]>

  export type FontSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    url?: boolean
    tips?: boolean
  }, ExtArgs["result"]["font"]>

  export type FontSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    url?: boolean
    tips?: boolean
  }, ExtArgs["result"]["font"]>

  export type FontSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    url?: boolean
    tips?: boolean
  }

  export type FontOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "url" | "tips", ExtArgs["result"]["font"]>

  export type $FontPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Font"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      category: string
      url: string
      tips: string | null
    }, ExtArgs["result"]["font"]>
    composites: {}
  }

  type FontGetPayload<S extends boolean | null | undefined | FontDefaultArgs> = $Result.GetResult<Prisma.$FontPayload, S>

  type FontCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FontFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FontCountAggregateInputType | true
    }

  export interface FontDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Font'], meta: { name: 'Font' } }
    /**
     * Find zero or one Font that matches the filter.
     * @param {FontFindUniqueArgs} args - Arguments to find a Font
     * @example
     * // Get one Font
     * const font = await prisma.font.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FontFindUniqueArgs>(args: SelectSubset<T, FontFindUniqueArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Font that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FontFindUniqueOrThrowArgs} args - Arguments to find a Font
     * @example
     * // Get one Font
     * const font = await prisma.font.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FontFindUniqueOrThrowArgs>(args: SelectSubset<T, FontFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Font that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontFindFirstArgs} args - Arguments to find a Font
     * @example
     * // Get one Font
     * const font = await prisma.font.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FontFindFirstArgs>(args?: SelectSubset<T, FontFindFirstArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Font that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontFindFirstOrThrowArgs} args - Arguments to find a Font
     * @example
     * // Get one Font
     * const font = await prisma.font.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FontFindFirstOrThrowArgs>(args?: SelectSubset<T, FontFindFirstOrThrowArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fonts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fonts
     * const fonts = await prisma.font.findMany()
     * 
     * // Get first 10 Fonts
     * const fonts = await prisma.font.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fontWithIdOnly = await prisma.font.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FontFindManyArgs>(args?: SelectSubset<T, FontFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Font.
     * @param {FontCreateArgs} args - Arguments to create a Font.
     * @example
     * // Create one Font
     * const Font = await prisma.font.create({
     *   data: {
     *     // ... data to create a Font
     *   }
     * })
     * 
     */
    create<T extends FontCreateArgs>(args: SelectSubset<T, FontCreateArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fonts.
     * @param {FontCreateManyArgs} args - Arguments to create many Fonts.
     * @example
     * // Create many Fonts
     * const font = await prisma.font.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FontCreateManyArgs>(args?: SelectSubset<T, FontCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fonts and returns the data saved in the database.
     * @param {FontCreateManyAndReturnArgs} args - Arguments to create many Fonts.
     * @example
     * // Create many Fonts
     * const font = await prisma.font.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fonts and only return the `id`
     * const fontWithIdOnly = await prisma.font.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FontCreateManyAndReturnArgs>(args?: SelectSubset<T, FontCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Font.
     * @param {FontDeleteArgs} args - Arguments to delete one Font.
     * @example
     * // Delete one Font
     * const Font = await prisma.font.delete({
     *   where: {
     *     // ... filter to delete one Font
     *   }
     * })
     * 
     */
    delete<T extends FontDeleteArgs>(args: SelectSubset<T, FontDeleteArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Font.
     * @param {FontUpdateArgs} args - Arguments to update one Font.
     * @example
     * // Update one Font
     * const font = await prisma.font.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FontUpdateArgs>(args: SelectSubset<T, FontUpdateArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fonts.
     * @param {FontDeleteManyArgs} args - Arguments to filter Fonts to delete.
     * @example
     * // Delete a few Fonts
     * const { count } = await prisma.font.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FontDeleteManyArgs>(args?: SelectSubset<T, FontDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fonts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fonts
     * const font = await prisma.font.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FontUpdateManyArgs>(args: SelectSubset<T, FontUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fonts and returns the data updated in the database.
     * @param {FontUpdateManyAndReturnArgs} args - Arguments to update many Fonts.
     * @example
     * // Update many Fonts
     * const font = await prisma.font.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fonts and only return the `id`
     * const fontWithIdOnly = await prisma.font.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FontUpdateManyAndReturnArgs>(args: SelectSubset<T, FontUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Font.
     * @param {FontUpsertArgs} args - Arguments to update or create a Font.
     * @example
     * // Update or create a Font
     * const font = await prisma.font.upsert({
     *   create: {
     *     // ... data to create a Font
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Font we want to update
     *   }
     * })
     */
    upsert<T extends FontUpsertArgs>(args: SelectSubset<T, FontUpsertArgs<ExtArgs>>): Prisma__FontClient<$Result.GetResult<Prisma.$FontPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fonts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontCountArgs} args - Arguments to filter Fonts to count.
     * @example
     * // Count the number of Fonts
     * const count = await prisma.font.count({
     *   where: {
     *     // ... the filter for the Fonts we want to count
     *   }
     * })
    **/
    count<T extends FontCountArgs>(
      args?: Subset<T, FontCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FontCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Font.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FontAggregateArgs>(args: Subset<T, FontAggregateArgs>): Prisma.PrismaPromise<GetFontAggregateType<T>>

    /**
     * Group by Font.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FontGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FontGroupByArgs['orderBy'] }
        : { orderBy?: FontGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FontGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFontGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Font model
   */
  readonly fields: FontFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Font.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FontClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Font model
   */
  interface FontFieldRefs {
    readonly id: FieldRef<"Font", 'Int'>
    readonly name: FieldRef<"Font", 'String'>
    readonly category: FieldRef<"Font", 'String'>
    readonly url: FieldRef<"Font", 'String'>
    readonly tips: FieldRef<"Font", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Font findUnique
   */
  export type FontFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * Filter, which Font to fetch.
     */
    where: FontWhereUniqueInput
  }

  /**
   * Font findUniqueOrThrow
   */
  export type FontFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * Filter, which Font to fetch.
     */
    where: FontWhereUniqueInput
  }

  /**
   * Font findFirst
   */
  export type FontFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * Filter, which Font to fetch.
     */
    where?: FontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonts to fetch.
     */
    orderBy?: FontOrderByWithRelationInput | FontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fonts.
     */
    cursor?: FontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fonts.
     */
    distinct?: FontScalarFieldEnum | FontScalarFieldEnum[]
  }

  /**
   * Font findFirstOrThrow
   */
  export type FontFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * Filter, which Font to fetch.
     */
    where?: FontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonts to fetch.
     */
    orderBy?: FontOrderByWithRelationInput | FontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fonts.
     */
    cursor?: FontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fonts.
     */
    distinct?: FontScalarFieldEnum | FontScalarFieldEnum[]
  }

  /**
   * Font findMany
   */
  export type FontFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * Filter, which Fonts to fetch.
     */
    where?: FontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonts to fetch.
     */
    orderBy?: FontOrderByWithRelationInput | FontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fonts.
     */
    cursor?: FontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonts.
     */
    skip?: number
    distinct?: FontScalarFieldEnum | FontScalarFieldEnum[]
  }

  /**
   * Font create
   */
  export type FontCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * The data needed to create a Font.
     */
    data: XOR<FontCreateInput, FontUncheckedCreateInput>
  }

  /**
   * Font createMany
   */
  export type FontCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fonts.
     */
    data: FontCreateManyInput | FontCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Font createManyAndReturn
   */
  export type FontCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * The data used to create many Fonts.
     */
    data: FontCreateManyInput | FontCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Font update
   */
  export type FontUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * The data needed to update a Font.
     */
    data: XOR<FontUpdateInput, FontUncheckedUpdateInput>
    /**
     * Choose, which Font to update.
     */
    where: FontWhereUniqueInput
  }

  /**
   * Font updateMany
   */
  export type FontUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fonts.
     */
    data: XOR<FontUpdateManyMutationInput, FontUncheckedUpdateManyInput>
    /**
     * Filter which Fonts to update
     */
    where?: FontWhereInput
    /**
     * Limit how many Fonts to update.
     */
    limit?: number
  }

  /**
   * Font updateManyAndReturn
   */
  export type FontUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * The data used to update Fonts.
     */
    data: XOR<FontUpdateManyMutationInput, FontUncheckedUpdateManyInput>
    /**
     * Filter which Fonts to update
     */
    where?: FontWhereInput
    /**
     * Limit how many Fonts to update.
     */
    limit?: number
  }

  /**
   * Font upsert
   */
  export type FontUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * The filter to search for the Font to update in case it exists.
     */
    where: FontWhereUniqueInput
    /**
     * In case the Font found by the `where` argument doesn't exist, create a new Font with this data.
     */
    create: XOR<FontCreateInput, FontUncheckedCreateInput>
    /**
     * In case the Font was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FontUpdateInput, FontUncheckedUpdateInput>
  }

  /**
   * Font delete
   */
  export type FontDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
    /**
     * Filter which Font to delete.
     */
    where: FontWhereUniqueInput
  }

  /**
   * Font deleteMany
   */
  export type FontDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fonts to delete
     */
    where?: FontWhereInput
    /**
     * Limit how many Fonts to delete.
     */
    limit?: number
  }

  /**
   * Font without action
   */
  export type FontDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Font
     */
    select?: FontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Font
     */
    omit?: FontOmit<ExtArgs> | null
  }


  /**
   * Model Palette
   */

  export type AggregatePalette = {
    _count: PaletteCountAggregateOutputType | null
    _avg: PaletteAvgAggregateOutputType | null
    _sum: PaletteSumAggregateOutputType | null
    _min: PaletteMinAggregateOutputType | null
    _max: PaletteMaxAggregateOutputType | null
  }

  export type PaletteAvgAggregateOutputType = {
    id: number | null
  }

  export type PaletteSumAggregateOutputType = {
    id: number | null
  }

  export type PaletteMinAggregateOutputType = {
    id: number | null
    mainColor: string | null
    description: string | null
  }

  export type PaletteMaxAggregateOutputType = {
    id: number | null
    mainColor: string | null
    description: string | null
  }

  export type PaletteCountAggregateOutputType = {
    id: number
    mainColor: number
    mixinColors: number
    tags: number
    description: number
    _all: number
  }


  export type PaletteAvgAggregateInputType = {
    id?: true
  }

  export type PaletteSumAggregateInputType = {
    id?: true
  }

  export type PaletteMinAggregateInputType = {
    id?: true
    mainColor?: true
    description?: true
  }

  export type PaletteMaxAggregateInputType = {
    id?: true
    mainColor?: true
    description?: true
  }

  export type PaletteCountAggregateInputType = {
    id?: true
    mainColor?: true
    mixinColors?: true
    tags?: true
    description?: true
    _all?: true
  }

  export type PaletteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Palette to aggregate.
     */
    where?: PaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Palettes to fetch.
     */
    orderBy?: PaletteOrderByWithRelationInput | PaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Palettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Palettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Palettes
    **/
    _count?: true | PaletteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaletteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaletteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaletteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaletteMaxAggregateInputType
  }

  export type GetPaletteAggregateType<T extends PaletteAggregateArgs> = {
        [P in keyof T & keyof AggregatePalette]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePalette[P]>
      : GetScalarType<T[P], AggregatePalette[P]>
  }




  export type PaletteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaletteWhereInput
    orderBy?: PaletteOrderByWithAggregationInput | PaletteOrderByWithAggregationInput[]
    by: PaletteScalarFieldEnum[] | PaletteScalarFieldEnum
    having?: PaletteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaletteCountAggregateInputType | true
    _avg?: PaletteAvgAggregateInputType
    _sum?: PaletteSumAggregateInputType
    _min?: PaletteMinAggregateInputType
    _max?: PaletteMaxAggregateInputType
  }

  export type PaletteGroupByOutputType = {
    id: number
    mainColor: string
    mixinColors: string[]
    tags: string[]
    description: string | null
    _count: PaletteCountAggregateOutputType | null
    _avg: PaletteAvgAggregateOutputType | null
    _sum: PaletteSumAggregateOutputType | null
    _min: PaletteMinAggregateOutputType | null
    _max: PaletteMaxAggregateOutputType | null
  }

  type GetPaletteGroupByPayload<T extends PaletteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaletteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaletteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaletteGroupByOutputType[P]>
            : GetScalarType<T[P], PaletteGroupByOutputType[P]>
        }
      >
    >


  export type PaletteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mainColor?: boolean
    mixinColors?: boolean
    tags?: boolean
    description?: boolean
  }, ExtArgs["result"]["palette"]>

  export type PaletteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mainColor?: boolean
    mixinColors?: boolean
    tags?: boolean
    description?: boolean
  }, ExtArgs["result"]["palette"]>

  export type PaletteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mainColor?: boolean
    mixinColors?: boolean
    tags?: boolean
    description?: boolean
  }, ExtArgs["result"]["palette"]>

  export type PaletteSelectScalar = {
    id?: boolean
    mainColor?: boolean
    mixinColors?: boolean
    tags?: boolean
    description?: boolean
  }

  export type PaletteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mainColor" | "mixinColors" | "tags" | "description", ExtArgs["result"]["palette"]>

  export type $PalettePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Palette"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mainColor: string
      mixinColors: string[]
      tags: string[]
      description: string | null
    }, ExtArgs["result"]["palette"]>
    composites: {}
  }

  type PaletteGetPayload<S extends boolean | null | undefined | PaletteDefaultArgs> = $Result.GetResult<Prisma.$PalettePayload, S>

  type PaletteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaletteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaletteCountAggregateInputType | true
    }

  export interface PaletteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Palette'], meta: { name: 'Palette' } }
    /**
     * Find zero or one Palette that matches the filter.
     * @param {PaletteFindUniqueArgs} args - Arguments to find a Palette
     * @example
     * // Get one Palette
     * const palette = await prisma.palette.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaletteFindUniqueArgs>(args: SelectSubset<T, PaletteFindUniqueArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Palette that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaletteFindUniqueOrThrowArgs} args - Arguments to find a Palette
     * @example
     * // Get one Palette
     * const palette = await prisma.palette.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaletteFindUniqueOrThrowArgs>(args: SelectSubset<T, PaletteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Palette that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteFindFirstArgs} args - Arguments to find a Palette
     * @example
     * // Get one Palette
     * const palette = await prisma.palette.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaletteFindFirstArgs>(args?: SelectSubset<T, PaletteFindFirstArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Palette that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteFindFirstOrThrowArgs} args - Arguments to find a Palette
     * @example
     * // Get one Palette
     * const palette = await prisma.palette.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaletteFindFirstOrThrowArgs>(args?: SelectSubset<T, PaletteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Palettes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Palettes
     * const palettes = await prisma.palette.findMany()
     * 
     * // Get first 10 Palettes
     * const palettes = await prisma.palette.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paletteWithIdOnly = await prisma.palette.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaletteFindManyArgs>(args?: SelectSubset<T, PaletteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Palette.
     * @param {PaletteCreateArgs} args - Arguments to create a Palette.
     * @example
     * // Create one Palette
     * const Palette = await prisma.palette.create({
     *   data: {
     *     // ... data to create a Palette
     *   }
     * })
     * 
     */
    create<T extends PaletteCreateArgs>(args: SelectSubset<T, PaletteCreateArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Palettes.
     * @param {PaletteCreateManyArgs} args - Arguments to create many Palettes.
     * @example
     * // Create many Palettes
     * const palette = await prisma.palette.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaletteCreateManyArgs>(args?: SelectSubset<T, PaletteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Palettes and returns the data saved in the database.
     * @param {PaletteCreateManyAndReturnArgs} args - Arguments to create many Palettes.
     * @example
     * // Create many Palettes
     * const palette = await prisma.palette.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Palettes and only return the `id`
     * const paletteWithIdOnly = await prisma.palette.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaletteCreateManyAndReturnArgs>(args?: SelectSubset<T, PaletteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Palette.
     * @param {PaletteDeleteArgs} args - Arguments to delete one Palette.
     * @example
     * // Delete one Palette
     * const Palette = await prisma.palette.delete({
     *   where: {
     *     // ... filter to delete one Palette
     *   }
     * })
     * 
     */
    delete<T extends PaletteDeleteArgs>(args: SelectSubset<T, PaletteDeleteArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Palette.
     * @param {PaletteUpdateArgs} args - Arguments to update one Palette.
     * @example
     * // Update one Palette
     * const palette = await prisma.palette.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaletteUpdateArgs>(args: SelectSubset<T, PaletteUpdateArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Palettes.
     * @param {PaletteDeleteManyArgs} args - Arguments to filter Palettes to delete.
     * @example
     * // Delete a few Palettes
     * const { count } = await prisma.palette.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaletteDeleteManyArgs>(args?: SelectSubset<T, PaletteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Palettes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Palettes
     * const palette = await prisma.palette.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaletteUpdateManyArgs>(args: SelectSubset<T, PaletteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Palettes and returns the data updated in the database.
     * @param {PaletteUpdateManyAndReturnArgs} args - Arguments to update many Palettes.
     * @example
     * // Update many Palettes
     * const palette = await prisma.palette.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Palettes and only return the `id`
     * const paletteWithIdOnly = await prisma.palette.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaletteUpdateManyAndReturnArgs>(args: SelectSubset<T, PaletteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Palette.
     * @param {PaletteUpsertArgs} args - Arguments to update or create a Palette.
     * @example
     * // Update or create a Palette
     * const palette = await prisma.palette.upsert({
     *   create: {
     *     // ... data to create a Palette
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Palette we want to update
     *   }
     * })
     */
    upsert<T extends PaletteUpsertArgs>(args: SelectSubset<T, PaletteUpsertArgs<ExtArgs>>): Prisma__PaletteClient<$Result.GetResult<Prisma.$PalettePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Palettes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteCountArgs} args - Arguments to filter Palettes to count.
     * @example
     * // Count the number of Palettes
     * const count = await prisma.palette.count({
     *   where: {
     *     // ... the filter for the Palettes we want to count
     *   }
     * })
    **/
    count<T extends PaletteCountArgs>(
      args?: Subset<T, PaletteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaletteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Palette.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaletteAggregateArgs>(args: Subset<T, PaletteAggregateArgs>): Prisma.PrismaPromise<GetPaletteAggregateType<T>>

    /**
     * Group by Palette.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaletteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaletteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaletteGroupByArgs['orderBy'] }
        : { orderBy?: PaletteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaletteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaletteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Palette model
   */
  readonly fields: PaletteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Palette.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaletteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Palette model
   */
  interface PaletteFieldRefs {
    readonly id: FieldRef<"Palette", 'Int'>
    readonly mainColor: FieldRef<"Palette", 'String'>
    readonly mixinColors: FieldRef<"Palette", 'String[]'>
    readonly tags: FieldRef<"Palette", 'String[]'>
    readonly description: FieldRef<"Palette", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Palette findUnique
   */
  export type PaletteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * Filter, which Palette to fetch.
     */
    where: PaletteWhereUniqueInput
  }

  /**
   * Palette findUniqueOrThrow
   */
  export type PaletteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * Filter, which Palette to fetch.
     */
    where: PaletteWhereUniqueInput
  }

  /**
   * Palette findFirst
   */
  export type PaletteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * Filter, which Palette to fetch.
     */
    where?: PaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Palettes to fetch.
     */
    orderBy?: PaletteOrderByWithRelationInput | PaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Palettes.
     */
    cursor?: PaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Palettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Palettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Palettes.
     */
    distinct?: PaletteScalarFieldEnum | PaletteScalarFieldEnum[]
  }

  /**
   * Palette findFirstOrThrow
   */
  export type PaletteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * Filter, which Palette to fetch.
     */
    where?: PaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Palettes to fetch.
     */
    orderBy?: PaletteOrderByWithRelationInput | PaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Palettes.
     */
    cursor?: PaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Palettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Palettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Palettes.
     */
    distinct?: PaletteScalarFieldEnum | PaletteScalarFieldEnum[]
  }

  /**
   * Palette findMany
   */
  export type PaletteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * Filter, which Palettes to fetch.
     */
    where?: PaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Palettes to fetch.
     */
    orderBy?: PaletteOrderByWithRelationInput | PaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Palettes.
     */
    cursor?: PaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Palettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Palettes.
     */
    skip?: number
    distinct?: PaletteScalarFieldEnum | PaletteScalarFieldEnum[]
  }

  /**
   * Palette create
   */
  export type PaletteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * The data needed to create a Palette.
     */
    data: XOR<PaletteCreateInput, PaletteUncheckedCreateInput>
  }

  /**
   * Palette createMany
   */
  export type PaletteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Palettes.
     */
    data: PaletteCreateManyInput | PaletteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Palette createManyAndReturn
   */
  export type PaletteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * The data used to create many Palettes.
     */
    data: PaletteCreateManyInput | PaletteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Palette update
   */
  export type PaletteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * The data needed to update a Palette.
     */
    data: XOR<PaletteUpdateInput, PaletteUncheckedUpdateInput>
    /**
     * Choose, which Palette to update.
     */
    where: PaletteWhereUniqueInput
  }

  /**
   * Palette updateMany
   */
  export type PaletteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Palettes.
     */
    data: XOR<PaletteUpdateManyMutationInput, PaletteUncheckedUpdateManyInput>
    /**
     * Filter which Palettes to update
     */
    where?: PaletteWhereInput
    /**
     * Limit how many Palettes to update.
     */
    limit?: number
  }

  /**
   * Palette updateManyAndReturn
   */
  export type PaletteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * The data used to update Palettes.
     */
    data: XOR<PaletteUpdateManyMutationInput, PaletteUncheckedUpdateManyInput>
    /**
     * Filter which Palettes to update
     */
    where?: PaletteWhereInput
    /**
     * Limit how many Palettes to update.
     */
    limit?: number
  }

  /**
   * Palette upsert
   */
  export type PaletteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * The filter to search for the Palette to update in case it exists.
     */
    where: PaletteWhereUniqueInput
    /**
     * In case the Palette found by the `where` argument doesn't exist, create a new Palette with this data.
     */
    create: XOR<PaletteCreateInput, PaletteUncheckedCreateInput>
    /**
     * In case the Palette was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaletteUpdateInput, PaletteUncheckedUpdateInput>
  }

  /**
   * Palette delete
   */
  export type PaletteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
    /**
     * Filter which Palette to delete.
     */
    where: PaletteWhereUniqueInput
  }

  /**
   * Palette deleteMany
   */
  export type PaletteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Palettes to delete
     */
    where?: PaletteWhereInput
    /**
     * Limit how many Palettes to delete.
     */
    limit?: number
  }

  /**
   * Palette without action
   */
  export type PaletteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Palette
     */
    select?: PaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Palette
     */
    omit?: PaletteOmit<ExtArgs> | null
  }


  /**
   * Model Segment
   */

  export type AggregateSegment = {
    _count: SegmentCountAggregateOutputType | null
    _avg: SegmentAvgAggregateOutputType | null
    _sum: SegmentSumAggregateOutputType | null
    _min: SegmentMinAggregateOutputType | null
    _max: SegmentMaxAggregateOutputType | null
  }

  export type SegmentAvgAggregateOutputType = {
    id: number | null
  }

  export type SegmentSumAggregateOutputType = {
    id: number | null
  }

  export type SegmentMinAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    description: string | null
    content: string | null
    type: $Enums.SegmentType | null
    difficulty: $Enums.Difficulty | null
    duration: string | null
    icon: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SegmentMaxAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    description: string | null
    content: string | null
    type: $Enums.SegmentType | null
    difficulty: $Enums.Difficulty | null
    duration: string | null
    icon: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SegmentCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    content: number
    type: number
    difficulty: number
    duration: number
    icon: number
    color: number
    tags: number
    questions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SegmentAvgAggregateInputType = {
    id?: true
  }

  export type SegmentSumAggregateInputType = {
    id?: true
  }

  export type SegmentMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    type?: true
    difficulty?: true
    duration?: true
    icon?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SegmentMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    type?: true
    difficulty?: true
    duration?: true
    icon?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SegmentCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    type?: true
    difficulty?: true
    duration?: true
    icon?: true
    color?: true
    tags?: true
    questions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SegmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Segment to aggregate.
     */
    where?: SegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Segments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Segments
    **/
    _count?: true | SegmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SegmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SegmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SegmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SegmentMaxAggregateInputType
  }

  export type GetSegmentAggregateType<T extends SegmentAggregateArgs> = {
        [P in keyof T & keyof AggregateSegment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSegment[P]>
      : GetScalarType<T[P], AggregateSegment[P]>
  }




  export type SegmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SegmentWhereInput
    orderBy?: SegmentOrderByWithAggregationInput | SegmentOrderByWithAggregationInput[]
    by: SegmentScalarFieldEnum[] | SegmentScalarFieldEnum
    having?: SegmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SegmentCountAggregateInputType | true
    _avg?: SegmentAvgAggregateInputType
    _sum?: SegmentSumAggregateInputType
    _min?: SegmentMinAggregateInputType
    _max?: SegmentMaxAggregateInputType
  }

  export type SegmentGroupByOutputType = {
    id: number
    title: string
    slug: string
    description: string | null
    content: string | null
    type: $Enums.SegmentType
    difficulty: $Enums.Difficulty
    duration: string | null
    icon: string | null
    color: string | null
    tags: string[]
    questions: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SegmentCountAggregateOutputType | null
    _avg: SegmentAvgAggregateOutputType | null
    _sum: SegmentSumAggregateOutputType | null
    _min: SegmentMinAggregateOutputType | null
    _max: SegmentMaxAggregateOutputType | null
  }

  type GetSegmentGroupByPayload<T extends SegmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SegmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SegmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SegmentGroupByOutputType[P]>
            : GetScalarType<T[P], SegmentGroupByOutputType[P]>
        }
      >
    >


  export type SegmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    type?: boolean
    difficulty?: boolean
    duration?: boolean
    icon?: boolean
    color?: boolean
    tags?: boolean
    questions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["segment"]>

  export type SegmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    type?: boolean
    difficulty?: boolean
    duration?: boolean
    icon?: boolean
    color?: boolean
    tags?: boolean
    questions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["segment"]>

  export type SegmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    type?: boolean
    difficulty?: boolean
    duration?: boolean
    icon?: boolean
    color?: boolean
    tags?: boolean
    questions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["segment"]>

  export type SegmentSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    type?: boolean
    difficulty?: boolean
    duration?: boolean
    icon?: boolean
    color?: boolean
    tags?: boolean
    questions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SegmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "content" | "type" | "difficulty" | "duration" | "icon" | "color" | "tags" | "questions" | "createdAt" | "updatedAt", ExtArgs["result"]["segment"]>

  export type $SegmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Segment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      slug: string
      description: string | null
      content: string | null
      type: $Enums.SegmentType
      difficulty: $Enums.Difficulty
      duration: string | null
      icon: string | null
      color: string | null
      tags: string[]
      questions: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["segment"]>
    composites: {}
  }

  type SegmentGetPayload<S extends boolean | null | undefined | SegmentDefaultArgs> = $Result.GetResult<Prisma.$SegmentPayload, S>

  type SegmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SegmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SegmentCountAggregateInputType | true
    }

  export interface SegmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Segment'], meta: { name: 'Segment' } }
    /**
     * Find zero or one Segment that matches the filter.
     * @param {SegmentFindUniqueArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SegmentFindUniqueArgs>(args: SelectSubset<T, SegmentFindUniqueArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Segment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SegmentFindUniqueOrThrowArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SegmentFindUniqueOrThrowArgs>(args: SelectSubset<T, SegmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Segment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentFindFirstArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SegmentFindFirstArgs>(args?: SelectSubset<T, SegmentFindFirstArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Segment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentFindFirstOrThrowArgs} args - Arguments to find a Segment
     * @example
     * // Get one Segment
     * const segment = await prisma.segment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SegmentFindFirstOrThrowArgs>(args?: SelectSubset<T, SegmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Segments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Segments
     * const segments = await prisma.segment.findMany()
     * 
     * // Get first 10 Segments
     * const segments = await prisma.segment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const segmentWithIdOnly = await prisma.segment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SegmentFindManyArgs>(args?: SelectSubset<T, SegmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Segment.
     * @param {SegmentCreateArgs} args - Arguments to create a Segment.
     * @example
     * // Create one Segment
     * const Segment = await prisma.segment.create({
     *   data: {
     *     // ... data to create a Segment
     *   }
     * })
     * 
     */
    create<T extends SegmentCreateArgs>(args: SelectSubset<T, SegmentCreateArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Segments.
     * @param {SegmentCreateManyArgs} args - Arguments to create many Segments.
     * @example
     * // Create many Segments
     * const segment = await prisma.segment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SegmentCreateManyArgs>(args?: SelectSubset<T, SegmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Segments and returns the data saved in the database.
     * @param {SegmentCreateManyAndReturnArgs} args - Arguments to create many Segments.
     * @example
     * // Create many Segments
     * const segment = await prisma.segment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Segments and only return the `id`
     * const segmentWithIdOnly = await prisma.segment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SegmentCreateManyAndReturnArgs>(args?: SelectSubset<T, SegmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Segment.
     * @param {SegmentDeleteArgs} args - Arguments to delete one Segment.
     * @example
     * // Delete one Segment
     * const Segment = await prisma.segment.delete({
     *   where: {
     *     // ... filter to delete one Segment
     *   }
     * })
     * 
     */
    delete<T extends SegmentDeleteArgs>(args: SelectSubset<T, SegmentDeleteArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Segment.
     * @param {SegmentUpdateArgs} args - Arguments to update one Segment.
     * @example
     * // Update one Segment
     * const segment = await prisma.segment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SegmentUpdateArgs>(args: SelectSubset<T, SegmentUpdateArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Segments.
     * @param {SegmentDeleteManyArgs} args - Arguments to filter Segments to delete.
     * @example
     * // Delete a few Segments
     * const { count } = await prisma.segment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SegmentDeleteManyArgs>(args?: SelectSubset<T, SegmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Segments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Segments
     * const segment = await prisma.segment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SegmentUpdateManyArgs>(args: SelectSubset<T, SegmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Segments and returns the data updated in the database.
     * @param {SegmentUpdateManyAndReturnArgs} args - Arguments to update many Segments.
     * @example
     * // Update many Segments
     * const segment = await prisma.segment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Segments and only return the `id`
     * const segmentWithIdOnly = await prisma.segment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SegmentUpdateManyAndReturnArgs>(args: SelectSubset<T, SegmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Segment.
     * @param {SegmentUpsertArgs} args - Arguments to update or create a Segment.
     * @example
     * // Update or create a Segment
     * const segment = await prisma.segment.upsert({
     *   create: {
     *     // ... data to create a Segment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Segment we want to update
     *   }
     * })
     */
    upsert<T extends SegmentUpsertArgs>(args: SelectSubset<T, SegmentUpsertArgs<ExtArgs>>): Prisma__SegmentClient<$Result.GetResult<Prisma.$SegmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Segments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentCountArgs} args - Arguments to filter Segments to count.
     * @example
     * // Count the number of Segments
     * const count = await prisma.segment.count({
     *   where: {
     *     // ... the filter for the Segments we want to count
     *   }
     * })
    **/
    count<T extends SegmentCountArgs>(
      args?: Subset<T, SegmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SegmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Segment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SegmentAggregateArgs>(args: Subset<T, SegmentAggregateArgs>): Prisma.PrismaPromise<GetSegmentAggregateType<T>>

    /**
     * Group by Segment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SegmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SegmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SegmentGroupByArgs['orderBy'] }
        : { orderBy?: SegmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SegmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSegmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Segment model
   */
  readonly fields: SegmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Segment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SegmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Segment model
   */
  interface SegmentFieldRefs {
    readonly id: FieldRef<"Segment", 'Int'>
    readonly title: FieldRef<"Segment", 'String'>
    readonly slug: FieldRef<"Segment", 'String'>
    readonly description: FieldRef<"Segment", 'String'>
    readonly content: FieldRef<"Segment", 'String'>
    readonly type: FieldRef<"Segment", 'SegmentType'>
    readonly difficulty: FieldRef<"Segment", 'Difficulty'>
    readonly duration: FieldRef<"Segment", 'String'>
    readonly icon: FieldRef<"Segment", 'String'>
    readonly color: FieldRef<"Segment", 'String'>
    readonly tags: FieldRef<"Segment", 'String[]'>
    readonly questions: FieldRef<"Segment", 'Json'>
    readonly createdAt: FieldRef<"Segment", 'DateTime'>
    readonly updatedAt: FieldRef<"Segment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Segment findUnique
   */
  export type SegmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * Filter, which Segment to fetch.
     */
    where: SegmentWhereUniqueInput
  }

  /**
   * Segment findUniqueOrThrow
   */
  export type SegmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * Filter, which Segment to fetch.
     */
    where: SegmentWhereUniqueInput
  }

  /**
   * Segment findFirst
   */
  export type SegmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * Filter, which Segment to fetch.
     */
    where?: SegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Segments.
     */
    cursor?: SegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Segments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Segments.
     */
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[]
  }

  /**
   * Segment findFirstOrThrow
   */
  export type SegmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * Filter, which Segment to fetch.
     */
    where?: SegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Segments.
     */
    cursor?: SegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Segments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Segments.
     */
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[]
  }

  /**
   * Segment findMany
   */
  export type SegmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * Filter, which Segments to fetch.
     */
    where?: SegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Segments to fetch.
     */
    orderBy?: SegmentOrderByWithRelationInput | SegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Segments.
     */
    cursor?: SegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Segments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Segments.
     */
    skip?: number
    distinct?: SegmentScalarFieldEnum | SegmentScalarFieldEnum[]
  }

  /**
   * Segment create
   */
  export type SegmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Segment.
     */
    data: XOR<SegmentCreateInput, SegmentUncheckedCreateInput>
  }

  /**
   * Segment createMany
   */
  export type SegmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Segments.
     */
    data: SegmentCreateManyInput | SegmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Segment createManyAndReturn
   */
  export type SegmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * The data used to create many Segments.
     */
    data: SegmentCreateManyInput | SegmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Segment update
   */
  export type SegmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Segment.
     */
    data: XOR<SegmentUpdateInput, SegmentUncheckedUpdateInput>
    /**
     * Choose, which Segment to update.
     */
    where: SegmentWhereUniqueInput
  }

  /**
   * Segment updateMany
   */
  export type SegmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Segments.
     */
    data: XOR<SegmentUpdateManyMutationInput, SegmentUncheckedUpdateManyInput>
    /**
     * Filter which Segments to update
     */
    where?: SegmentWhereInput
    /**
     * Limit how many Segments to update.
     */
    limit?: number
  }

  /**
   * Segment updateManyAndReturn
   */
  export type SegmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * The data used to update Segments.
     */
    data: XOR<SegmentUpdateManyMutationInput, SegmentUncheckedUpdateManyInput>
    /**
     * Filter which Segments to update
     */
    where?: SegmentWhereInput
    /**
     * Limit how many Segments to update.
     */
    limit?: number
  }

  /**
   * Segment upsert
   */
  export type SegmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Segment to update in case it exists.
     */
    where: SegmentWhereUniqueInput
    /**
     * In case the Segment found by the `where` argument doesn't exist, create a new Segment with this data.
     */
    create: XOR<SegmentCreateInput, SegmentUncheckedCreateInput>
    /**
     * In case the Segment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SegmentUpdateInput, SegmentUncheckedUpdateInput>
  }

  /**
   * Segment delete
   */
  export type SegmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
    /**
     * Filter which Segment to delete.
     */
    where: SegmentWhereUniqueInput
  }

  /**
   * Segment deleteMany
   */
  export type SegmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Segments to delete
     */
    where?: SegmentWhereInput
    /**
     * Limit how many Segments to delete.
     */
    limit?: number
  }

  /**
   * Segment without action
   */
  export type SegmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Segment
     */
    select?: SegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Segment
     */
    omit?: SegmentOmit<ExtArgs> | null
  }


  /**
   * Model Attribute
   */

  export type AggregateAttribute = {
    _count: AttributeCountAggregateOutputType | null
    _avg: AttributeAvgAggregateOutputType | null
    _sum: AttributeSumAggregateOutputType | null
    _min: AttributeMinAggregateOutputType | null
    _max: AttributeMaxAggregateOutputType | null
  }

  export type AttributeAvgAggregateOutputType = {
    id: number | null
  }

  export type AttributeSumAggregateOutputType = {
    id: number | null
  }

  export type AttributeMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type AttributeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type AttributeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    _all: number
  }


  export type AttributeAvgAggregateInputType = {
    id?: true
  }

  export type AttributeSumAggregateInputType = {
    id?: true
  }

  export type AttributeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type AttributeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type AttributeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    _all?: true
  }

  export type AttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attribute to aggregate.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attributes
    **/
    _count?: true | AttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttributeMaxAggregateInputType
  }

  export type GetAttributeAggregateType<T extends AttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttribute[P]>
      : GetScalarType<T[P], AggregateAttribute[P]>
  }




  export type AttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttributeWhereInput
    orderBy?: AttributeOrderByWithAggregationInput | AttributeOrderByWithAggregationInput[]
    by: AttributeScalarFieldEnum[] | AttributeScalarFieldEnum
    having?: AttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttributeCountAggregateInputType | true
    _avg?: AttributeAvgAggregateInputType
    _sum?: AttributeSumAggregateInputType
    _min?: AttributeMinAggregateInputType
    _max?: AttributeMaxAggregateInputType
  }

  export type AttributeGroupByOutputType = {
    id: number
    name: string
    description: string | null
    isActive: boolean
    _count: AttributeCountAggregateOutputType | null
    _avg: AttributeAvgAggregateOutputType | null
    _sum: AttributeSumAggregateOutputType | null
    _min: AttributeMinAggregateOutputType | null
    _max: AttributeMaxAggregateOutputType | null
  }

  type GetAttributeGroupByPayload<T extends AttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttributeGroupByOutputType[P]>
            : GetScalarType<T[P], AttributeGroupByOutputType[P]>
        }
      >
    >


  export type AttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    elementTypes?: boolean | Attribute$elementTypesArgs<ExtArgs>
    elementValues?: boolean | Attribute$elementValuesArgs<ExtArgs>
    _count?: boolean | AttributeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attribute"]>

  export type AttributeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["attribute"]>

  export type AttributeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["attribute"]>

  export type AttributeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }

  export type AttributeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive", ExtArgs["result"]["attribute"]>
  export type AttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementTypes?: boolean | Attribute$elementTypesArgs<ExtArgs>
    elementValues?: boolean | Attribute$elementValuesArgs<ExtArgs>
    _count?: boolean | AttributeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttributeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AttributeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attribute"
    objects: {
      elementTypes: Prisma.$ElementAttributePayload<ExtArgs>[]
      elementValues: Prisma.$ElementValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      isActive: boolean
    }, ExtArgs["result"]["attribute"]>
    composites: {}
  }

  type AttributeGetPayload<S extends boolean | null | undefined | AttributeDefaultArgs> = $Result.GetResult<Prisma.$AttributePayload, S>

  type AttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttributeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttributeCountAggregateInputType | true
    }

  export interface AttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attribute'], meta: { name: 'Attribute' } }
    /**
     * Find zero or one Attribute that matches the filter.
     * @param {AttributeFindUniqueArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttributeFindUniqueArgs>(args: SelectSubset<T, AttributeFindUniqueArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attribute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttributeFindUniqueOrThrowArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, AttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindFirstArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttributeFindFirstArgs>(args?: SelectSubset<T, AttributeFindFirstArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindFirstOrThrowArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, AttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attributes
     * const attributes = await prisma.attribute.findMany()
     * 
     * // Get first 10 Attributes
     * const attributes = await prisma.attribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attributeWithIdOnly = await prisma.attribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttributeFindManyArgs>(args?: SelectSubset<T, AttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attribute.
     * @param {AttributeCreateArgs} args - Arguments to create a Attribute.
     * @example
     * // Create one Attribute
     * const Attribute = await prisma.attribute.create({
     *   data: {
     *     // ... data to create a Attribute
     *   }
     * })
     * 
     */
    create<T extends AttributeCreateArgs>(args: SelectSubset<T, AttributeCreateArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attributes.
     * @param {AttributeCreateManyArgs} args - Arguments to create many Attributes.
     * @example
     * // Create many Attributes
     * const attribute = await prisma.attribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttributeCreateManyArgs>(args?: SelectSubset<T, AttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attributes and returns the data saved in the database.
     * @param {AttributeCreateManyAndReturnArgs} args - Arguments to create many Attributes.
     * @example
     * // Create many Attributes
     * const attribute = await prisma.attribute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attributes and only return the `id`
     * const attributeWithIdOnly = await prisma.attribute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttributeCreateManyAndReturnArgs>(args?: SelectSubset<T, AttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attribute.
     * @param {AttributeDeleteArgs} args - Arguments to delete one Attribute.
     * @example
     * // Delete one Attribute
     * const Attribute = await prisma.attribute.delete({
     *   where: {
     *     // ... filter to delete one Attribute
     *   }
     * })
     * 
     */
    delete<T extends AttributeDeleteArgs>(args: SelectSubset<T, AttributeDeleteArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attribute.
     * @param {AttributeUpdateArgs} args - Arguments to update one Attribute.
     * @example
     * // Update one Attribute
     * const attribute = await prisma.attribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttributeUpdateArgs>(args: SelectSubset<T, AttributeUpdateArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attributes.
     * @param {AttributeDeleteManyArgs} args - Arguments to filter Attributes to delete.
     * @example
     * // Delete a few Attributes
     * const { count } = await prisma.attribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttributeDeleteManyArgs>(args?: SelectSubset<T, AttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attributes
     * const attribute = await prisma.attribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttributeUpdateManyArgs>(args: SelectSubset<T, AttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attributes and returns the data updated in the database.
     * @param {AttributeUpdateManyAndReturnArgs} args - Arguments to update many Attributes.
     * @example
     * // Update many Attributes
     * const attribute = await prisma.attribute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attributes and only return the `id`
     * const attributeWithIdOnly = await prisma.attribute.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttributeUpdateManyAndReturnArgs>(args: SelectSubset<T, AttributeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attribute.
     * @param {AttributeUpsertArgs} args - Arguments to update or create a Attribute.
     * @example
     * // Update or create a Attribute
     * const attribute = await prisma.attribute.upsert({
     *   create: {
     *     // ... data to create a Attribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attribute we want to update
     *   }
     * })
     */
    upsert<T extends AttributeUpsertArgs>(args: SelectSubset<T, AttributeUpsertArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeCountArgs} args - Arguments to filter Attributes to count.
     * @example
     * // Count the number of Attributes
     * const count = await prisma.attribute.count({
     *   where: {
     *     // ... the filter for the Attributes we want to count
     *   }
     * })
    **/
    count<T extends AttributeCountArgs>(
      args?: Subset<T, AttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttributeAggregateArgs>(args: Subset<T, AttributeAggregateArgs>): Prisma.PrismaPromise<GetAttributeAggregateType<T>>

    /**
     * Group by Attribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttributeGroupByArgs['orderBy'] }
        : { orderBy?: AttributeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attribute model
   */
  readonly fields: AttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elementTypes<T extends Attribute$elementTypesArgs<ExtArgs> = {}>(args?: Subset<T, Attribute$elementTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    elementValues<T extends Attribute$elementValuesArgs<ExtArgs> = {}>(args?: Subset<T, Attribute$elementValuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attribute model
   */
  interface AttributeFieldRefs {
    readonly id: FieldRef<"Attribute", 'Int'>
    readonly name: FieldRef<"Attribute", 'String'>
    readonly description: FieldRef<"Attribute", 'String'>
    readonly isActive: FieldRef<"Attribute", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Attribute findUnique
   */
  export type AttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute findUniqueOrThrow
   */
  export type AttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute findFirst
   */
  export type AttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attributes.
     */
    distinct?: AttributeScalarFieldEnum | AttributeScalarFieldEnum[]
  }

  /**
   * Attribute findFirstOrThrow
   */
  export type AttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attributes.
     */
    distinct?: AttributeScalarFieldEnum | AttributeScalarFieldEnum[]
  }

  /**
   * Attribute findMany
   */
  export type AttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attributes to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    distinct?: AttributeScalarFieldEnum | AttributeScalarFieldEnum[]
  }

  /**
   * Attribute create
   */
  export type AttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a Attribute.
     */
    data: XOR<AttributeCreateInput, AttributeUncheckedCreateInput>
  }

  /**
   * Attribute createMany
   */
  export type AttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attributes.
     */
    data: AttributeCreateManyInput | AttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attribute createManyAndReturn
   */
  export type AttributeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * The data used to create many Attributes.
     */
    data: AttributeCreateManyInput | AttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attribute update
   */
  export type AttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a Attribute.
     */
    data: XOR<AttributeUpdateInput, AttributeUncheckedUpdateInput>
    /**
     * Choose, which Attribute to update.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute updateMany
   */
  export type AttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attributes.
     */
    data: XOR<AttributeUpdateManyMutationInput, AttributeUncheckedUpdateManyInput>
    /**
     * Filter which Attributes to update
     */
    where?: AttributeWhereInput
    /**
     * Limit how many Attributes to update.
     */
    limit?: number
  }

  /**
   * Attribute updateManyAndReturn
   */
  export type AttributeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * The data used to update Attributes.
     */
    data: XOR<AttributeUpdateManyMutationInput, AttributeUncheckedUpdateManyInput>
    /**
     * Filter which Attributes to update
     */
    where?: AttributeWhereInput
    /**
     * Limit how many Attributes to update.
     */
    limit?: number
  }

  /**
   * Attribute upsert
   */
  export type AttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the Attribute to update in case it exists.
     */
    where: AttributeWhereUniqueInput
    /**
     * In case the Attribute found by the `where` argument doesn't exist, create a new Attribute with this data.
     */
    create: XOR<AttributeCreateInput, AttributeUncheckedCreateInput>
    /**
     * In case the Attribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttributeUpdateInput, AttributeUncheckedUpdateInput>
  }

  /**
   * Attribute delete
   */
  export type AttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter which Attribute to delete.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute deleteMany
   */
  export type AttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attributes to delete
     */
    where?: AttributeWhereInput
    /**
     * Limit how many Attributes to delete.
     */
    limit?: number
  }

  /**
   * Attribute.elementTypes
   */
  export type Attribute$elementTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    where?: ElementAttributeWhereInput
    orderBy?: ElementAttributeOrderByWithRelationInput | ElementAttributeOrderByWithRelationInput[]
    cursor?: ElementAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementAttributeScalarFieldEnum | ElementAttributeScalarFieldEnum[]
  }

  /**
   * Attribute.elementValues
   */
  export type Attribute$elementValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    where?: ElementValueWhereInput
    orderBy?: ElementValueOrderByWithRelationInput | ElementValueOrderByWithRelationInput[]
    cursor?: ElementValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementValueScalarFieldEnum | ElementValueScalarFieldEnum[]
  }

  /**
   * Attribute without action
   */
  export type AttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
  }


  /**
   * Model ElementType
   */

  export type AggregateElementType = {
    _count: ElementTypeCountAggregateOutputType | null
    _avg: ElementTypeAvgAggregateOutputType | null
    _sum: ElementTypeSumAggregateOutputType | null
    _min: ElementTypeMinAggregateOutputType | null
    _max: ElementTypeMaxAggregateOutputType | null
  }

  export type ElementTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type ElementTypeSumAggregateOutputType = {
    id: number | null
  }

  export type ElementTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type ElementTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type ElementTypeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    _all: number
  }


  export type ElementTypeAvgAggregateInputType = {
    id?: true
  }

  export type ElementTypeSumAggregateInputType = {
    id?: true
  }

  export type ElementTypeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type ElementTypeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type ElementTypeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    _all?: true
  }

  export type ElementTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElementType to aggregate.
     */
    where?: ElementTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementTypes to fetch.
     */
    orderBy?: ElementTypeOrderByWithRelationInput | ElementTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ElementTypes
    **/
    _count?: true | ElementTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementTypeMaxAggregateInputType
  }

  export type GetElementTypeAggregateType<T extends ElementTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateElementType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElementType[P]>
      : GetScalarType<T[P], AggregateElementType[P]>
  }




  export type ElementTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementTypeWhereInput
    orderBy?: ElementTypeOrderByWithAggregationInput | ElementTypeOrderByWithAggregationInput[]
    by: ElementTypeScalarFieldEnum[] | ElementTypeScalarFieldEnum
    having?: ElementTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementTypeCountAggregateInputType | true
    _avg?: ElementTypeAvgAggregateInputType
    _sum?: ElementTypeSumAggregateInputType
    _min?: ElementTypeMinAggregateInputType
    _max?: ElementTypeMaxAggregateInputType
  }

  export type ElementTypeGroupByOutputType = {
    id: number
    name: string
    description: string | null
    isActive: boolean
    _count: ElementTypeCountAggregateOutputType | null
    _avg: ElementTypeAvgAggregateOutputType | null
    _sum: ElementTypeSumAggregateOutputType | null
    _min: ElementTypeMinAggregateOutputType | null
    _max: ElementTypeMaxAggregateOutputType | null
  }

  type GetElementTypeGroupByPayload<T extends ElementTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementTypeGroupByOutputType[P]>
            : GetScalarType<T[P], ElementTypeGroupByOutputType[P]>
        }
      >
    >


  export type ElementTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    elements?: boolean | ElementType$elementsArgs<ExtArgs>
    attributes?: boolean | ElementType$attributesArgs<ExtArgs>
    _count?: boolean | ElementTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementType"]>

  export type ElementTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["elementType"]>

  export type ElementTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["elementType"]>

  export type ElementTypeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }

  export type ElementTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive", ExtArgs["result"]["elementType"]>
  export type ElementTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | ElementType$elementsArgs<ExtArgs>
    attributes?: boolean | ElementType$attributesArgs<ExtArgs>
    _count?: boolean | ElementTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ElementTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ElementTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ElementTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ElementType"
    objects: {
      elements: Prisma.$ElementPayload<ExtArgs>[]
      attributes: Prisma.$ElementAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      isActive: boolean
    }, ExtArgs["result"]["elementType"]>
    composites: {}
  }

  type ElementTypeGetPayload<S extends boolean | null | undefined | ElementTypeDefaultArgs> = $Result.GetResult<Prisma.$ElementTypePayload, S>

  type ElementTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementTypeCountAggregateInputType | true
    }

  export interface ElementTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ElementType'], meta: { name: 'ElementType' } }
    /**
     * Find zero or one ElementType that matches the filter.
     * @param {ElementTypeFindUniqueArgs} args - Arguments to find a ElementType
     * @example
     * // Get one ElementType
     * const elementType = await prisma.elementType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementTypeFindUniqueArgs>(args: SelectSubset<T, ElementTypeFindUniqueArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ElementType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementTypeFindUniqueOrThrowArgs} args - Arguments to find a ElementType
     * @example
     * // Get one ElementType
     * const elementType = await prisma.elementType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElementType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeFindFirstArgs} args - Arguments to find a ElementType
     * @example
     * // Get one ElementType
     * const elementType = await prisma.elementType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementTypeFindFirstArgs>(args?: SelectSubset<T, ElementTypeFindFirstArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElementType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeFindFirstOrThrowArgs} args - Arguments to find a ElementType
     * @example
     * // Get one ElementType
     * const elementType = await prisma.elementType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ElementTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ElementTypes
     * const elementTypes = await prisma.elementType.findMany()
     * 
     * // Get first 10 ElementTypes
     * const elementTypes = await prisma.elementType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elementTypeWithIdOnly = await prisma.elementType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElementTypeFindManyArgs>(args?: SelectSubset<T, ElementTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ElementType.
     * @param {ElementTypeCreateArgs} args - Arguments to create a ElementType.
     * @example
     * // Create one ElementType
     * const ElementType = await prisma.elementType.create({
     *   data: {
     *     // ... data to create a ElementType
     *   }
     * })
     * 
     */
    create<T extends ElementTypeCreateArgs>(args: SelectSubset<T, ElementTypeCreateArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ElementTypes.
     * @param {ElementTypeCreateManyArgs} args - Arguments to create many ElementTypes.
     * @example
     * // Create many ElementTypes
     * const elementType = await prisma.elementType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementTypeCreateManyArgs>(args?: SelectSubset<T, ElementTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ElementTypes and returns the data saved in the database.
     * @param {ElementTypeCreateManyAndReturnArgs} args - Arguments to create many ElementTypes.
     * @example
     * // Create many ElementTypes
     * const elementType = await prisma.elementType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ElementTypes and only return the `id`
     * const elementTypeWithIdOnly = await prisma.elementType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ElementType.
     * @param {ElementTypeDeleteArgs} args - Arguments to delete one ElementType.
     * @example
     * // Delete one ElementType
     * const ElementType = await prisma.elementType.delete({
     *   where: {
     *     // ... filter to delete one ElementType
     *   }
     * })
     * 
     */
    delete<T extends ElementTypeDeleteArgs>(args: SelectSubset<T, ElementTypeDeleteArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ElementType.
     * @param {ElementTypeUpdateArgs} args - Arguments to update one ElementType.
     * @example
     * // Update one ElementType
     * const elementType = await prisma.elementType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementTypeUpdateArgs>(args: SelectSubset<T, ElementTypeUpdateArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ElementTypes.
     * @param {ElementTypeDeleteManyArgs} args - Arguments to filter ElementTypes to delete.
     * @example
     * // Delete a few ElementTypes
     * const { count } = await prisma.elementType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementTypeDeleteManyArgs>(args?: SelectSubset<T, ElementTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElementTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ElementTypes
     * const elementType = await prisma.elementType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementTypeUpdateManyArgs>(args: SelectSubset<T, ElementTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElementTypes and returns the data updated in the database.
     * @param {ElementTypeUpdateManyAndReturnArgs} args - Arguments to update many ElementTypes.
     * @example
     * // Update many ElementTypes
     * const elementType = await prisma.elementType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ElementTypes and only return the `id`
     * const elementTypeWithIdOnly = await prisma.elementType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ElementType.
     * @param {ElementTypeUpsertArgs} args - Arguments to update or create a ElementType.
     * @example
     * // Update or create a ElementType
     * const elementType = await prisma.elementType.upsert({
     *   create: {
     *     // ... data to create a ElementType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ElementType we want to update
     *   }
     * })
     */
    upsert<T extends ElementTypeUpsertArgs>(args: SelectSubset<T, ElementTypeUpsertArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ElementTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeCountArgs} args - Arguments to filter ElementTypes to count.
     * @example
     * // Count the number of ElementTypes
     * const count = await prisma.elementType.count({
     *   where: {
     *     // ... the filter for the ElementTypes we want to count
     *   }
     * })
    **/
    count<T extends ElementTypeCountArgs>(
      args?: Subset<T, ElementTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ElementType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementTypeAggregateArgs>(args: Subset<T, ElementTypeAggregateArgs>): Prisma.PrismaPromise<GetElementTypeAggregateType<T>>

    /**
     * Group by ElementType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementTypeGroupByArgs['orderBy'] }
        : { orderBy?: ElementTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ElementType model
   */
  readonly fields: ElementTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ElementType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elements<T extends ElementType$elementsArgs<ExtArgs> = {}>(args?: Subset<T, ElementType$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attributes<T extends ElementType$attributesArgs<ExtArgs> = {}>(args?: Subset<T, ElementType$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ElementType model
   */
  interface ElementTypeFieldRefs {
    readonly id: FieldRef<"ElementType", 'Int'>
    readonly name: FieldRef<"ElementType", 'String'>
    readonly description: FieldRef<"ElementType", 'String'>
    readonly isActive: FieldRef<"ElementType", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ElementType findUnique
   */
  export type ElementTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * Filter, which ElementType to fetch.
     */
    where: ElementTypeWhereUniqueInput
  }

  /**
   * ElementType findUniqueOrThrow
   */
  export type ElementTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * Filter, which ElementType to fetch.
     */
    where: ElementTypeWhereUniqueInput
  }

  /**
   * ElementType findFirst
   */
  export type ElementTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * Filter, which ElementType to fetch.
     */
    where?: ElementTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementTypes to fetch.
     */
    orderBy?: ElementTypeOrderByWithRelationInput | ElementTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElementTypes.
     */
    cursor?: ElementTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElementTypes.
     */
    distinct?: ElementTypeScalarFieldEnum | ElementTypeScalarFieldEnum[]
  }

  /**
   * ElementType findFirstOrThrow
   */
  export type ElementTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * Filter, which ElementType to fetch.
     */
    where?: ElementTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementTypes to fetch.
     */
    orderBy?: ElementTypeOrderByWithRelationInput | ElementTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElementTypes.
     */
    cursor?: ElementTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElementTypes.
     */
    distinct?: ElementTypeScalarFieldEnum | ElementTypeScalarFieldEnum[]
  }

  /**
   * ElementType findMany
   */
  export type ElementTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * Filter, which ElementTypes to fetch.
     */
    where?: ElementTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementTypes to fetch.
     */
    orderBy?: ElementTypeOrderByWithRelationInput | ElementTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ElementTypes.
     */
    cursor?: ElementTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementTypes.
     */
    skip?: number
    distinct?: ElementTypeScalarFieldEnum | ElementTypeScalarFieldEnum[]
  }

  /**
   * ElementType create
   */
  export type ElementTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a ElementType.
     */
    data: XOR<ElementTypeCreateInput, ElementTypeUncheckedCreateInput>
  }

  /**
   * ElementType createMany
   */
  export type ElementTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ElementTypes.
     */
    data: ElementTypeCreateManyInput | ElementTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ElementType createManyAndReturn
   */
  export type ElementTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * The data used to create many ElementTypes.
     */
    data: ElementTypeCreateManyInput | ElementTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ElementType update
   */
  export type ElementTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a ElementType.
     */
    data: XOR<ElementTypeUpdateInput, ElementTypeUncheckedUpdateInput>
    /**
     * Choose, which ElementType to update.
     */
    where: ElementTypeWhereUniqueInput
  }

  /**
   * ElementType updateMany
   */
  export type ElementTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ElementTypes.
     */
    data: XOR<ElementTypeUpdateManyMutationInput, ElementTypeUncheckedUpdateManyInput>
    /**
     * Filter which ElementTypes to update
     */
    where?: ElementTypeWhereInput
    /**
     * Limit how many ElementTypes to update.
     */
    limit?: number
  }

  /**
   * ElementType updateManyAndReturn
   */
  export type ElementTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * The data used to update ElementTypes.
     */
    data: XOR<ElementTypeUpdateManyMutationInput, ElementTypeUncheckedUpdateManyInput>
    /**
     * Filter which ElementTypes to update
     */
    where?: ElementTypeWhereInput
    /**
     * Limit how many ElementTypes to update.
     */
    limit?: number
  }

  /**
   * ElementType upsert
   */
  export type ElementTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the ElementType to update in case it exists.
     */
    where: ElementTypeWhereUniqueInput
    /**
     * In case the ElementType found by the `where` argument doesn't exist, create a new ElementType with this data.
     */
    create: XOR<ElementTypeCreateInput, ElementTypeUncheckedCreateInput>
    /**
     * In case the ElementType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementTypeUpdateInput, ElementTypeUncheckedUpdateInput>
  }

  /**
   * ElementType delete
   */
  export type ElementTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
    /**
     * Filter which ElementType to delete.
     */
    where: ElementTypeWhereUniqueInput
  }

  /**
   * ElementType deleteMany
   */
  export type ElementTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElementTypes to delete
     */
    where?: ElementTypeWhereInput
    /**
     * Limit how many ElementTypes to delete.
     */
    limit?: number
  }

  /**
   * ElementType.elements
   */
  export type ElementType$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    cursor?: ElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * ElementType.attributes
   */
  export type ElementType$attributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    where?: ElementAttributeWhereInput
    orderBy?: ElementAttributeOrderByWithRelationInput | ElementAttributeOrderByWithRelationInput[]
    cursor?: ElementAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementAttributeScalarFieldEnum | ElementAttributeScalarFieldEnum[]
  }

  /**
   * ElementType without action
   */
  export type ElementTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementType
     */
    select?: ElementTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementType
     */
    omit?: ElementTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementTypeInclude<ExtArgs> | null
  }


  /**
   * Model ElementAttribute
   */

  export type AggregateElementAttribute = {
    _count: ElementAttributeCountAggregateOutputType | null
    _avg: ElementAttributeAvgAggregateOutputType | null
    _sum: ElementAttributeSumAggregateOutputType | null
    _min: ElementAttributeMinAggregateOutputType | null
    _max: ElementAttributeMaxAggregateOutputType | null
  }

  export type ElementAttributeAvgAggregateOutputType = {
    elementTypeId: number | null
    attributeId: number | null
  }

  export type ElementAttributeSumAggregateOutputType = {
    elementTypeId: number | null
    attributeId: number | null
  }

  export type ElementAttributeMinAggregateOutputType = {
    elementTypeId: number | null
    attributeId: number | null
  }

  export type ElementAttributeMaxAggregateOutputType = {
    elementTypeId: number | null
    attributeId: number | null
  }

  export type ElementAttributeCountAggregateOutputType = {
    elementTypeId: number
    attributeId: number
    _all: number
  }


  export type ElementAttributeAvgAggregateInputType = {
    elementTypeId?: true
    attributeId?: true
  }

  export type ElementAttributeSumAggregateInputType = {
    elementTypeId?: true
    attributeId?: true
  }

  export type ElementAttributeMinAggregateInputType = {
    elementTypeId?: true
    attributeId?: true
  }

  export type ElementAttributeMaxAggregateInputType = {
    elementTypeId?: true
    attributeId?: true
  }

  export type ElementAttributeCountAggregateInputType = {
    elementTypeId?: true
    attributeId?: true
    _all?: true
  }

  export type ElementAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElementAttribute to aggregate.
     */
    where?: ElementAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementAttributes to fetch.
     */
    orderBy?: ElementAttributeOrderByWithRelationInput | ElementAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ElementAttributes
    **/
    _count?: true | ElementAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementAttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementAttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementAttributeMaxAggregateInputType
  }

  export type GetElementAttributeAggregateType<T extends ElementAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateElementAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElementAttribute[P]>
      : GetScalarType<T[P], AggregateElementAttribute[P]>
  }




  export type ElementAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementAttributeWhereInput
    orderBy?: ElementAttributeOrderByWithAggregationInput | ElementAttributeOrderByWithAggregationInput[]
    by: ElementAttributeScalarFieldEnum[] | ElementAttributeScalarFieldEnum
    having?: ElementAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementAttributeCountAggregateInputType | true
    _avg?: ElementAttributeAvgAggregateInputType
    _sum?: ElementAttributeSumAggregateInputType
    _min?: ElementAttributeMinAggregateInputType
    _max?: ElementAttributeMaxAggregateInputType
  }

  export type ElementAttributeGroupByOutputType = {
    elementTypeId: number
    attributeId: number
    _count: ElementAttributeCountAggregateOutputType | null
    _avg: ElementAttributeAvgAggregateOutputType | null
    _sum: ElementAttributeSumAggregateOutputType | null
    _min: ElementAttributeMinAggregateOutputType | null
    _max: ElementAttributeMaxAggregateOutputType | null
  }

  type GetElementAttributeGroupByPayload<T extends ElementAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], ElementAttributeGroupByOutputType[P]>
        }
      >
    >


  export type ElementAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    elementTypeId?: boolean
    attributeId?: boolean
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementAttribute"]>

  export type ElementAttributeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    elementTypeId?: boolean
    attributeId?: boolean
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementAttribute"]>

  export type ElementAttributeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    elementTypeId?: boolean
    attributeId?: boolean
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementAttribute"]>

  export type ElementAttributeSelectScalar = {
    elementTypeId?: boolean
    attributeId?: boolean
  }

  export type ElementAttributeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"elementTypeId" | "attributeId", ExtArgs["result"]["elementAttribute"]>
  export type ElementAttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }
  export type ElementAttributeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }
  export type ElementAttributeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }

  export type $ElementAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ElementAttribute"
    objects: {
      elementType: Prisma.$ElementTypePayload<ExtArgs>
      attribute: Prisma.$AttributePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      elementTypeId: number
      attributeId: number
    }, ExtArgs["result"]["elementAttribute"]>
    composites: {}
  }

  type ElementAttributeGetPayload<S extends boolean | null | undefined | ElementAttributeDefaultArgs> = $Result.GetResult<Prisma.$ElementAttributePayload, S>

  type ElementAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementAttributeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementAttributeCountAggregateInputType | true
    }

  export interface ElementAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ElementAttribute'], meta: { name: 'ElementAttribute' } }
    /**
     * Find zero or one ElementAttribute that matches the filter.
     * @param {ElementAttributeFindUniqueArgs} args - Arguments to find a ElementAttribute
     * @example
     * // Get one ElementAttribute
     * const elementAttribute = await prisma.elementAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementAttributeFindUniqueArgs>(args: SelectSubset<T, ElementAttributeFindUniqueArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ElementAttribute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementAttributeFindUniqueOrThrowArgs} args - Arguments to find a ElementAttribute
     * @example
     * // Get one ElementAttribute
     * const elementAttribute = await prisma.elementAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElementAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeFindFirstArgs} args - Arguments to find a ElementAttribute
     * @example
     * // Get one ElementAttribute
     * const elementAttribute = await prisma.elementAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementAttributeFindFirstArgs>(args?: SelectSubset<T, ElementAttributeFindFirstArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElementAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeFindFirstOrThrowArgs} args - Arguments to find a ElementAttribute
     * @example
     * // Get one ElementAttribute
     * const elementAttribute = await prisma.elementAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ElementAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ElementAttributes
     * const elementAttributes = await prisma.elementAttribute.findMany()
     * 
     * // Get first 10 ElementAttributes
     * const elementAttributes = await prisma.elementAttribute.findMany({ take: 10 })
     * 
     * // Only select the `elementTypeId`
     * const elementAttributeWithElementTypeIdOnly = await prisma.elementAttribute.findMany({ select: { elementTypeId: true } })
     * 
     */
    findMany<T extends ElementAttributeFindManyArgs>(args?: SelectSubset<T, ElementAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ElementAttribute.
     * @param {ElementAttributeCreateArgs} args - Arguments to create a ElementAttribute.
     * @example
     * // Create one ElementAttribute
     * const ElementAttribute = await prisma.elementAttribute.create({
     *   data: {
     *     // ... data to create a ElementAttribute
     *   }
     * })
     * 
     */
    create<T extends ElementAttributeCreateArgs>(args: SelectSubset<T, ElementAttributeCreateArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ElementAttributes.
     * @param {ElementAttributeCreateManyArgs} args - Arguments to create many ElementAttributes.
     * @example
     * // Create many ElementAttributes
     * const elementAttribute = await prisma.elementAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementAttributeCreateManyArgs>(args?: SelectSubset<T, ElementAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ElementAttributes and returns the data saved in the database.
     * @param {ElementAttributeCreateManyAndReturnArgs} args - Arguments to create many ElementAttributes.
     * @example
     * // Create many ElementAttributes
     * const elementAttribute = await prisma.elementAttribute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ElementAttributes and only return the `elementTypeId`
     * const elementAttributeWithElementTypeIdOnly = await prisma.elementAttribute.createManyAndReturn({
     *   select: { elementTypeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementAttributeCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementAttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ElementAttribute.
     * @param {ElementAttributeDeleteArgs} args - Arguments to delete one ElementAttribute.
     * @example
     * // Delete one ElementAttribute
     * const ElementAttribute = await prisma.elementAttribute.delete({
     *   where: {
     *     // ... filter to delete one ElementAttribute
     *   }
     * })
     * 
     */
    delete<T extends ElementAttributeDeleteArgs>(args: SelectSubset<T, ElementAttributeDeleteArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ElementAttribute.
     * @param {ElementAttributeUpdateArgs} args - Arguments to update one ElementAttribute.
     * @example
     * // Update one ElementAttribute
     * const elementAttribute = await prisma.elementAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementAttributeUpdateArgs>(args: SelectSubset<T, ElementAttributeUpdateArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ElementAttributes.
     * @param {ElementAttributeDeleteManyArgs} args - Arguments to filter ElementAttributes to delete.
     * @example
     * // Delete a few ElementAttributes
     * const { count } = await prisma.elementAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementAttributeDeleteManyArgs>(args?: SelectSubset<T, ElementAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElementAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ElementAttributes
     * const elementAttribute = await prisma.elementAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementAttributeUpdateManyArgs>(args: SelectSubset<T, ElementAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElementAttributes and returns the data updated in the database.
     * @param {ElementAttributeUpdateManyAndReturnArgs} args - Arguments to update many ElementAttributes.
     * @example
     * // Update many ElementAttributes
     * const elementAttribute = await prisma.elementAttribute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ElementAttributes and only return the `elementTypeId`
     * const elementAttributeWithElementTypeIdOnly = await prisma.elementAttribute.updateManyAndReturn({
     *   select: { elementTypeId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementAttributeUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementAttributeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ElementAttribute.
     * @param {ElementAttributeUpsertArgs} args - Arguments to update or create a ElementAttribute.
     * @example
     * // Update or create a ElementAttribute
     * const elementAttribute = await prisma.elementAttribute.upsert({
     *   create: {
     *     // ... data to create a ElementAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ElementAttribute we want to update
     *   }
     * })
     */
    upsert<T extends ElementAttributeUpsertArgs>(args: SelectSubset<T, ElementAttributeUpsertArgs<ExtArgs>>): Prisma__ElementAttributeClient<$Result.GetResult<Prisma.$ElementAttributePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ElementAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeCountArgs} args - Arguments to filter ElementAttributes to count.
     * @example
     * // Count the number of ElementAttributes
     * const count = await prisma.elementAttribute.count({
     *   where: {
     *     // ... the filter for the ElementAttributes we want to count
     *   }
     * })
    **/
    count<T extends ElementAttributeCountArgs>(
      args?: Subset<T, ElementAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ElementAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementAttributeAggregateArgs>(args: Subset<T, ElementAttributeAggregateArgs>): Prisma.PrismaPromise<GetElementAttributeAggregateType<T>>

    /**
     * Group by ElementAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAttributeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementAttributeGroupByArgs['orderBy'] }
        : { orderBy?: ElementAttributeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ElementAttribute model
   */
  readonly fields: ElementAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ElementAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elementType<T extends ElementTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementTypeDefaultArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attribute<T extends AttributeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttributeDefaultArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ElementAttribute model
   */
  interface ElementAttributeFieldRefs {
    readonly elementTypeId: FieldRef<"ElementAttribute", 'Int'>
    readonly attributeId: FieldRef<"ElementAttribute", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ElementAttribute findUnique
   */
  export type ElementAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ElementAttribute to fetch.
     */
    where: ElementAttributeWhereUniqueInput
  }

  /**
   * ElementAttribute findUniqueOrThrow
   */
  export type ElementAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ElementAttribute to fetch.
     */
    where: ElementAttributeWhereUniqueInput
  }

  /**
   * ElementAttribute findFirst
   */
  export type ElementAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ElementAttribute to fetch.
     */
    where?: ElementAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementAttributes to fetch.
     */
    orderBy?: ElementAttributeOrderByWithRelationInput | ElementAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElementAttributes.
     */
    cursor?: ElementAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElementAttributes.
     */
    distinct?: ElementAttributeScalarFieldEnum | ElementAttributeScalarFieldEnum[]
  }

  /**
   * ElementAttribute findFirstOrThrow
   */
  export type ElementAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ElementAttribute to fetch.
     */
    where?: ElementAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementAttributes to fetch.
     */
    orderBy?: ElementAttributeOrderByWithRelationInput | ElementAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElementAttributes.
     */
    cursor?: ElementAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElementAttributes.
     */
    distinct?: ElementAttributeScalarFieldEnum | ElementAttributeScalarFieldEnum[]
  }

  /**
   * ElementAttribute findMany
   */
  export type ElementAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ElementAttributes to fetch.
     */
    where?: ElementAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementAttributes to fetch.
     */
    orderBy?: ElementAttributeOrderByWithRelationInput | ElementAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ElementAttributes.
     */
    cursor?: ElementAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementAttributes.
     */
    skip?: number
    distinct?: ElementAttributeScalarFieldEnum | ElementAttributeScalarFieldEnum[]
  }

  /**
   * ElementAttribute create
   */
  export type ElementAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a ElementAttribute.
     */
    data: XOR<ElementAttributeCreateInput, ElementAttributeUncheckedCreateInput>
  }

  /**
   * ElementAttribute createMany
   */
  export type ElementAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ElementAttributes.
     */
    data: ElementAttributeCreateManyInput | ElementAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ElementAttribute createManyAndReturn
   */
  export type ElementAttributeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * The data used to create many ElementAttributes.
     */
    data: ElementAttributeCreateManyInput | ElementAttributeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ElementAttribute update
   */
  export type ElementAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a ElementAttribute.
     */
    data: XOR<ElementAttributeUpdateInput, ElementAttributeUncheckedUpdateInput>
    /**
     * Choose, which ElementAttribute to update.
     */
    where: ElementAttributeWhereUniqueInput
  }

  /**
   * ElementAttribute updateMany
   */
  export type ElementAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ElementAttributes.
     */
    data: XOR<ElementAttributeUpdateManyMutationInput, ElementAttributeUncheckedUpdateManyInput>
    /**
     * Filter which ElementAttributes to update
     */
    where?: ElementAttributeWhereInput
    /**
     * Limit how many ElementAttributes to update.
     */
    limit?: number
  }

  /**
   * ElementAttribute updateManyAndReturn
   */
  export type ElementAttributeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * The data used to update ElementAttributes.
     */
    data: XOR<ElementAttributeUpdateManyMutationInput, ElementAttributeUncheckedUpdateManyInput>
    /**
     * Filter which ElementAttributes to update
     */
    where?: ElementAttributeWhereInput
    /**
     * Limit how many ElementAttributes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ElementAttribute upsert
   */
  export type ElementAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the ElementAttribute to update in case it exists.
     */
    where: ElementAttributeWhereUniqueInput
    /**
     * In case the ElementAttribute found by the `where` argument doesn't exist, create a new ElementAttribute with this data.
     */
    create: XOR<ElementAttributeCreateInput, ElementAttributeUncheckedCreateInput>
    /**
     * In case the ElementAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementAttributeUpdateInput, ElementAttributeUncheckedUpdateInput>
  }

  /**
   * ElementAttribute delete
   */
  export type ElementAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
    /**
     * Filter which ElementAttribute to delete.
     */
    where: ElementAttributeWhereUniqueInput
  }

  /**
   * ElementAttribute deleteMany
   */
  export type ElementAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElementAttributes to delete
     */
    where?: ElementAttributeWhereInput
    /**
     * Limit how many ElementAttributes to delete.
     */
    limit?: number
  }

  /**
   * ElementAttribute without action
   */
  export type ElementAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementAttribute
     */
    select?: ElementAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementAttribute
     */
    omit?: ElementAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementAttributeInclude<ExtArgs> | null
  }


  /**
   * Model Element
   */

  export type AggregateElement = {
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  export type ElementAvgAggregateOutputType = {
    id: number | null
    coordsX: number | null
    coordsY: number | null
    opacity: number | null
    rotation: number | null
    height: number | null
    width: number | null
    layer: number | null
    elementTypeId: number | null
    moodboardId: number | null
  }

  export type ElementSumAggregateOutputType = {
    id: number | null
    coordsX: number | null
    coordsY: number | null
    opacity: number | null
    rotation: number | null
    height: number | null
    width: number | null
    layer: number | null
    elementTypeId: number | null
    moodboardId: number | null
  }

  export type ElementMinAggregateOutputType = {
    id: number | null
    name: string | null
    coordsX: number | null
    coordsY: number | null
    opacity: number | null
    rotation: number | null
    height: number | null
    width: number | null
    layer: number | null
    elementTypeId: number | null
    moodboardId: number | null
  }

  export type ElementMaxAggregateOutputType = {
    id: number | null
    name: string | null
    coordsX: number | null
    coordsY: number | null
    opacity: number | null
    rotation: number | null
    height: number | null
    width: number | null
    layer: number | null
    elementTypeId: number | null
    moodboardId: number | null
  }

  export type ElementCountAggregateOutputType = {
    id: number
    name: number
    coordsX: number
    coordsY: number
    opacity: number
    rotation: number
    height: number
    width: number
    layer: number
    elementTypeId: number
    moodboardId: number
    _all: number
  }


  export type ElementAvgAggregateInputType = {
    id?: true
    coordsX?: true
    coordsY?: true
    opacity?: true
    rotation?: true
    height?: true
    width?: true
    layer?: true
    elementTypeId?: true
    moodboardId?: true
  }

  export type ElementSumAggregateInputType = {
    id?: true
    coordsX?: true
    coordsY?: true
    opacity?: true
    rotation?: true
    height?: true
    width?: true
    layer?: true
    elementTypeId?: true
    moodboardId?: true
  }

  export type ElementMinAggregateInputType = {
    id?: true
    name?: true
    coordsX?: true
    coordsY?: true
    opacity?: true
    rotation?: true
    height?: true
    width?: true
    layer?: true
    elementTypeId?: true
    moodboardId?: true
  }

  export type ElementMaxAggregateInputType = {
    id?: true
    name?: true
    coordsX?: true
    coordsY?: true
    opacity?: true
    rotation?: true
    height?: true
    width?: true
    layer?: true
    elementTypeId?: true
    moodboardId?: true
  }

  export type ElementCountAggregateInputType = {
    id?: true
    name?: true
    coordsX?: true
    coordsY?: true
    opacity?: true
    rotation?: true
    height?: true
    width?: true
    layer?: true
    elementTypeId?: true
    moodboardId?: true
    _all?: true
  }

  export type ElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Element to aggregate.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elements
    **/
    _count?: true | ElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementMaxAggregateInputType
  }

  export type GetElementAggregateType<T extends ElementAggregateArgs> = {
        [P in keyof T & keyof AggregateElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElement[P]>
      : GetScalarType<T[P], AggregateElement[P]>
  }




  export type ElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithAggregationInput | ElementOrderByWithAggregationInput[]
    by: ElementScalarFieldEnum[] | ElementScalarFieldEnum
    having?: ElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementCountAggregateInputType | true
    _avg?: ElementAvgAggregateInputType
    _sum?: ElementSumAggregateInputType
    _min?: ElementMinAggregateInputType
    _max?: ElementMaxAggregateInputType
  }

  export type ElementGroupByOutputType = {
    id: number
    name: string
    coordsX: number
    coordsY: number
    opacity: number
    rotation: number
    height: number
    width: number
    layer: number
    elementTypeId: number
    moodboardId: number
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  type GetElementGroupByPayload<T extends ElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementGroupByOutputType[P]>
            : GetScalarType<T[P], ElementGroupByOutputType[P]>
        }
      >
    >


  export type ElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    coordsX?: boolean
    coordsY?: boolean
    opacity?: boolean
    rotation?: boolean
    height?: boolean
    width?: boolean
    layer?: boolean
    elementTypeId?: boolean
    moodboardId?: boolean
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    moodboard?: boolean | MoodboardDefaultArgs<ExtArgs>
    values?: boolean | Element$valuesArgs<ExtArgs>
    _count?: boolean | ElementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    coordsX?: boolean
    coordsY?: boolean
    opacity?: boolean
    rotation?: boolean
    height?: boolean
    width?: boolean
    layer?: boolean
    elementTypeId?: boolean
    moodboardId?: boolean
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    moodboard?: boolean | MoodboardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    coordsX?: boolean
    coordsY?: boolean
    opacity?: boolean
    rotation?: boolean
    height?: boolean
    width?: boolean
    layer?: boolean
    elementTypeId?: boolean
    moodboardId?: boolean
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    moodboard?: boolean | MoodboardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectScalar = {
    id?: boolean
    name?: boolean
    coordsX?: boolean
    coordsY?: boolean
    opacity?: boolean
    rotation?: boolean
    height?: boolean
    width?: boolean
    layer?: boolean
    elementTypeId?: boolean
    moodboardId?: boolean
  }

  export type ElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "coordsX" | "coordsY" | "opacity" | "rotation" | "height" | "width" | "layer" | "elementTypeId" | "moodboardId", ExtArgs["result"]["element"]>
  export type ElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    moodboard?: boolean | MoodboardDefaultArgs<ExtArgs>
    values?: boolean | Element$valuesArgs<ExtArgs>
    _count?: boolean | ElementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    moodboard?: boolean | MoodboardDefaultArgs<ExtArgs>
  }
  export type ElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elementType?: boolean | ElementTypeDefaultArgs<ExtArgs>
    moodboard?: boolean | MoodboardDefaultArgs<ExtArgs>
  }

  export type $ElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Element"
    objects: {
      elementType: Prisma.$ElementTypePayload<ExtArgs>
      moodboard: Prisma.$MoodboardPayload<ExtArgs>
      values: Prisma.$ElementValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      coordsX: number
      coordsY: number
      opacity: number
      rotation: number
      height: number
      width: number
      layer: number
      elementTypeId: number
      moodboardId: number
    }, ExtArgs["result"]["element"]>
    composites: {}
  }

  type ElementGetPayload<S extends boolean | null | undefined | ElementDefaultArgs> = $Result.GetResult<Prisma.$ElementPayload, S>

  type ElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementCountAggregateInputType | true
    }

  export interface ElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Element'], meta: { name: 'Element' } }
    /**
     * Find zero or one Element that matches the filter.
     * @param {ElementFindUniqueArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementFindUniqueArgs>(args: SelectSubset<T, ElementFindUniqueArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Element that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementFindUniqueOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementFindFirstArgs>(args?: SelectSubset<T, ElementFindFirstArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elements
     * const elements = await prisma.element.findMany()
     * 
     * // Get first 10 Elements
     * const elements = await prisma.element.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elementWithIdOnly = await prisma.element.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElementFindManyArgs>(args?: SelectSubset<T, ElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Element.
     * @param {ElementCreateArgs} args - Arguments to create a Element.
     * @example
     * // Create one Element
     * const Element = await prisma.element.create({
     *   data: {
     *     // ... data to create a Element
     *   }
     * })
     * 
     */
    create<T extends ElementCreateArgs>(args: SelectSubset<T, ElementCreateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elements.
     * @param {ElementCreateManyArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementCreateManyArgs>(args?: SelectSubset<T, ElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elements and returns the data saved in the database.
     * @param {ElementCreateManyAndReturnArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Element.
     * @param {ElementDeleteArgs} args - Arguments to delete one Element.
     * @example
     * // Delete one Element
     * const Element = await prisma.element.delete({
     *   where: {
     *     // ... filter to delete one Element
     *   }
     * })
     * 
     */
    delete<T extends ElementDeleteArgs>(args: SelectSubset<T, ElementDeleteArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Element.
     * @param {ElementUpdateArgs} args - Arguments to update one Element.
     * @example
     * // Update one Element
     * const element = await prisma.element.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementUpdateArgs>(args: SelectSubset<T, ElementUpdateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elements.
     * @param {ElementDeleteManyArgs} args - Arguments to filter Elements to delete.
     * @example
     * // Delete a few Elements
     * const { count } = await prisma.element.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementDeleteManyArgs>(args?: SelectSubset<T, ElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementUpdateManyArgs>(args: SelectSubset<T, ElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements and returns the data updated in the database.
     * @param {ElementUpdateManyAndReturnArgs} args - Arguments to update many Elements.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Element.
     * @param {ElementUpsertArgs} args - Arguments to update or create a Element.
     * @example
     * // Update or create a Element
     * const element = await prisma.element.upsert({
     *   create: {
     *     // ... data to create a Element
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Element we want to update
     *   }
     * })
     */
    upsert<T extends ElementUpsertArgs>(args: SelectSubset<T, ElementUpsertArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementCountArgs} args - Arguments to filter Elements to count.
     * @example
     * // Count the number of Elements
     * const count = await prisma.element.count({
     *   where: {
     *     // ... the filter for the Elements we want to count
     *   }
     * })
    **/
    count<T extends ElementCountArgs>(
      args?: Subset<T, ElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementAggregateArgs>(args: Subset<T, ElementAggregateArgs>): Prisma.PrismaPromise<GetElementAggregateType<T>>

    /**
     * Group by Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementGroupByArgs['orderBy'] }
        : { orderBy?: ElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Element model
   */
  readonly fields: ElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Element.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elementType<T extends ElementTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementTypeDefaultArgs<ExtArgs>>): Prisma__ElementTypeClient<$Result.GetResult<Prisma.$ElementTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    moodboard<T extends MoodboardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MoodboardDefaultArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    values<T extends Element$valuesArgs<ExtArgs> = {}>(args?: Subset<T, Element$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Element model
   */
  interface ElementFieldRefs {
    readonly id: FieldRef<"Element", 'Int'>
    readonly name: FieldRef<"Element", 'String'>
    readonly coordsX: FieldRef<"Element", 'Int'>
    readonly coordsY: FieldRef<"Element", 'Int'>
    readonly opacity: FieldRef<"Element", 'Int'>
    readonly rotation: FieldRef<"Element", 'Int'>
    readonly height: FieldRef<"Element", 'Int'>
    readonly width: FieldRef<"Element", 'Int'>
    readonly layer: FieldRef<"Element", 'Int'>
    readonly elementTypeId: FieldRef<"Element", 'Int'>
    readonly moodboardId: FieldRef<"Element", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Element findUnique
   */
  export type ElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findUniqueOrThrow
   */
  export type ElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findFirst
   */
  export type ElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findFirstOrThrow
   */
  export type ElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findMany
   */
  export type ElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Elements to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element create
   */
  export type ElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to create a Element.
     */
    data: XOR<ElementCreateInput, ElementUncheckedCreateInput>
  }

  /**
   * Element createMany
   */
  export type ElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element createManyAndReturn
   */
  export type ElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Element update
   */
  export type ElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to update a Element.
     */
    data: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
    /**
     * Choose, which Element to update.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element updateMany
   */
  export type ElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element updateManyAndReturn
   */
  export type ElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Element upsert
   */
  export type ElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The filter to search for the Element to update in case it exists.
     */
    where: ElementWhereUniqueInput
    /**
     * In case the Element found by the `where` argument doesn't exist, create a new Element with this data.
     */
    create: XOR<ElementCreateInput, ElementUncheckedCreateInput>
    /**
     * In case the Element was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
  }

  /**
   * Element delete
   */
  export type ElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter which Element to delete.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element deleteMany
   */
  export type ElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elements to delete
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to delete.
     */
    limit?: number
  }

  /**
   * Element.values
   */
  export type Element$valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    where?: ElementValueWhereInput
    orderBy?: ElementValueOrderByWithRelationInput | ElementValueOrderByWithRelationInput[]
    cursor?: ElementValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementValueScalarFieldEnum | ElementValueScalarFieldEnum[]
  }

  /**
   * Element without action
   */
  export type ElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
  }


  /**
   * Model ElementValue
   */

  export type AggregateElementValue = {
    _count: ElementValueCountAggregateOutputType | null
    _avg: ElementValueAvgAggregateOutputType | null
    _sum: ElementValueSumAggregateOutputType | null
    _min: ElementValueMinAggregateOutputType | null
    _max: ElementValueMaxAggregateOutputType | null
  }

  export type ElementValueAvgAggregateOutputType = {
    elementId: number | null
    attributeId: number | null
  }

  export type ElementValueSumAggregateOutputType = {
    elementId: number | null
    attributeId: number | null
  }

  export type ElementValueMinAggregateOutputType = {
    elementId: number | null
    attributeId: number | null
    value: string | null
  }

  export type ElementValueMaxAggregateOutputType = {
    elementId: number | null
    attributeId: number | null
    value: string | null
  }

  export type ElementValueCountAggregateOutputType = {
    elementId: number
    attributeId: number
    value: number
    _all: number
  }


  export type ElementValueAvgAggregateInputType = {
    elementId?: true
    attributeId?: true
  }

  export type ElementValueSumAggregateInputType = {
    elementId?: true
    attributeId?: true
  }

  export type ElementValueMinAggregateInputType = {
    elementId?: true
    attributeId?: true
    value?: true
  }

  export type ElementValueMaxAggregateInputType = {
    elementId?: true
    attributeId?: true
    value?: true
  }

  export type ElementValueCountAggregateInputType = {
    elementId?: true
    attributeId?: true
    value?: true
    _all?: true
  }

  export type ElementValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElementValue to aggregate.
     */
    where?: ElementValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementValues to fetch.
     */
    orderBy?: ElementValueOrderByWithRelationInput | ElementValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ElementValues
    **/
    _count?: true | ElementValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementValueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementValueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementValueMaxAggregateInputType
  }

  export type GetElementValueAggregateType<T extends ElementValueAggregateArgs> = {
        [P in keyof T & keyof AggregateElementValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElementValue[P]>
      : GetScalarType<T[P], AggregateElementValue[P]>
  }




  export type ElementValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementValueWhereInput
    orderBy?: ElementValueOrderByWithAggregationInput | ElementValueOrderByWithAggregationInput[]
    by: ElementValueScalarFieldEnum[] | ElementValueScalarFieldEnum
    having?: ElementValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementValueCountAggregateInputType | true
    _avg?: ElementValueAvgAggregateInputType
    _sum?: ElementValueSumAggregateInputType
    _min?: ElementValueMinAggregateInputType
    _max?: ElementValueMaxAggregateInputType
  }

  export type ElementValueGroupByOutputType = {
    elementId: number
    attributeId: number
    value: string
    _count: ElementValueCountAggregateOutputType | null
    _avg: ElementValueAvgAggregateOutputType | null
    _sum: ElementValueSumAggregateOutputType | null
    _min: ElementValueMinAggregateOutputType | null
    _max: ElementValueMaxAggregateOutputType | null
  }

  type GetElementValueGroupByPayload<T extends ElementValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementValueGroupByOutputType[P]>
            : GetScalarType<T[P], ElementValueGroupByOutputType[P]>
        }
      >
    >


  export type ElementValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    elementId?: boolean
    attributeId?: boolean
    value?: boolean
    element?: boolean | ElementDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementValue"]>

  export type ElementValueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    elementId?: boolean
    attributeId?: boolean
    value?: boolean
    element?: boolean | ElementDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementValue"]>

  export type ElementValueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    elementId?: boolean
    attributeId?: boolean
    value?: boolean
    element?: boolean | ElementDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elementValue"]>

  export type ElementValueSelectScalar = {
    elementId?: boolean
    attributeId?: boolean
    value?: boolean
  }

  export type ElementValueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"elementId" | "attributeId" | "value", ExtArgs["result"]["elementValue"]>
  export type ElementValueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    element?: boolean | ElementDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }
  export type ElementValueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    element?: boolean | ElementDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }
  export type ElementValueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    element?: boolean | ElementDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }

  export type $ElementValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ElementValue"
    objects: {
      element: Prisma.$ElementPayload<ExtArgs>
      attribute: Prisma.$AttributePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      elementId: number
      attributeId: number
      value: string
    }, ExtArgs["result"]["elementValue"]>
    composites: {}
  }

  type ElementValueGetPayload<S extends boolean | null | undefined | ElementValueDefaultArgs> = $Result.GetResult<Prisma.$ElementValuePayload, S>

  type ElementValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementValueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementValueCountAggregateInputType | true
    }

  export interface ElementValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ElementValue'], meta: { name: 'ElementValue' } }
    /**
     * Find zero or one ElementValue that matches the filter.
     * @param {ElementValueFindUniqueArgs} args - Arguments to find a ElementValue
     * @example
     * // Get one ElementValue
     * const elementValue = await prisma.elementValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementValueFindUniqueArgs>(args: SelectSubset<T, ElementValueFindUniqueArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ElementValue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementValueFindUniqueOrThrowArgs} args - Arguments to find a ElementValue
     * @example
     * // Get one ElementValue
     * const elementValue = await prisma.elementValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementValueFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElementValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueFindFirstArgs} args - Arguments to find a ElementValue
     * @example
     * // Get one ElementValue
     * const elementValue = await prisma.elementValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementValueFindFirstArgs>(args?: SelectSubset<T, ElementValueFindFirstArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElementValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueFindFirstOrThrowArgs} args - Arguments to find a ElementValue
     * @example
     * // Get one ElementValue
     * const elementValue = await prisma.elementValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementValueFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ElementValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ElementValues
     * const elementValues = await prisma.elementValue.findMany()
     * 
     * // Get first 10 ElementValues
     * const elementValues = await prisma.elementValue.findMany({ take: 10 })
     * 
     * // Only select the `elementId`
     * const elementValueWithElementIdOnly = await prisma.elementValue.findMany({ select: { elementId: true } })
     * 
     */
    findMany<T extends ElementValueFindManyArgs>(args?: SelectSubset<T, ElementValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ElementValue.
     * @param {ElementValueCreateArgs} args - Arguments to create a ElementValue.
     * @example
     * // Create one ElementValue
     * const ElementValue = await prisma.elementValue.create({
     *   data: {
     *     // ... data to create a ElementValue
     *   }
     * })
     * 
     */
    create<T extends ElementValueCreateArgs>(args: SelectSubset<T, ElementValueCreateArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ElementValues.
     * @param {ElementValueCreateManyArgs} args - Arguments to create many ElementValues.
     * @example
     * // Create many ElementValues
     * const elementValue = await prisma.elementValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementValueCreateManyArgs>(args?: SelectSubset<T, ElementValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ElementValues and returns the data saved in the database.
     * @param {ElementValueCreateManyAndReturnArgs} args - Arguments to create many ElementValues.
     * @example
     * // Create many ElementValues
     * const elementValue = await prisma.elementValue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ElementValues and only return the `elementId`
     * const elementValueWithElementIdOnly = await prisma.elementValue.createManyAndReturn({
     *   select: { elementId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementValueCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementValueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ElementValue.
     * @param {ElementValueDeleteArgs} args - Arguments to delete one ElementValue.
     * @example
     * // Delete one ElementValue
     * const ElementValue = await prisma.elementValue.delete({
     *   where: {
     *     // ... filter to delete one ElementValue
     *   }
     * })
     * 
     */
    delete<T extends ElementValueDeleteArgs>(args: SelectSubset<T, ElementValueDeleteArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ElementValue.
     * @param {ElementValueUpdateArgs} args - Arguments to update one ElementValue.
     * @example
     * // Update one ElementValue
     * const elementValue = await prisma.elementValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementValueUpdateArgs>(args: SelectSubset<T, ElementValueUpdateArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ElementValues.
     * @param {ElementValueDeleteManyArgs} args - Arguments to filter ElementValues to delete.
     * @example
     * // Delete a few ElementValues
     * const { count } = await prisma.elementValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementValueDeleteManyArgs>(args?: SelectSubset<T, ElementValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElementValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ElementValues
     * const elementValue = await prisma.elementValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementValueUpdateManyArgs>(args: SelectSubset<T, ElementValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElementValues and returns the data updated in the database.
     * @param {ElementValueUpdateManyAndReturnArgs} args - Arguments to update many ElementValues.
     * @example
     * // Update many ElementValues
     * const elementValue = await prisma.elementValue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ElementValues and only return the `elementId`
     * const elementValueWithElementIdOnly = await prisma.elementValue.updateManyAndReturn({
     *   select: { elementId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementValueUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementValueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ElementValue.
     * @param {ElementValueUpsertArgs} args - Arguments to update or create a ElementValue.
     * @example
     * // Update or create a ElementValue
     * const elementValue = await prisma.elementValue.upsert({
     *   create: {
     *     // ... data to create a ElementValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ElementValue we want to update
     *   }
     * })
     */
    upsert<T extends ElementValueUpsertArgs>(args: SelectSubset<T, ElementValueUpsertArgs<ExtArgs>>): Prisma__ElementValueClient<$Result.GetResult<Prisma.$ElementValuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ElementValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueCountArgs} args - Arguments to filter ElementValues to count.
     * @example
     * // Count the number of ElementValues
     * const count = await prisma.elementValue.count({
     *   where: {
     *     // ... the filter for the ElementValues we want to count
     *   }
     * })
    **/
    count<T extends ElementValueCountArgs>(
      args?: Subset<T, ElementValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ElementValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementValueAggregateArgs>(args: Subset<T, ElementValueAggregateArgs>): Prisma.PrismaPromise<GetElementValueAggregateType<T>>

    /**
     * Group by ElementValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementValueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementValueGroupByArgs['orderBy'] }
        : { orderBy?: ElementValueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ElementValue model
   */
  readonly fields: ElementValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ElementValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    element<T extends ElementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementDefaultArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attribute<T extends AttributeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttributeDefaultArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ElementValue model
   */
  interface ElementValueFieldRefs {
    readonly elementId: FieldRef<"ElementValue", 'Int'>
    readonly attributeId: FieldRef<"ElementValue", 'Int'>
    readonly value: FieldRef<"ElementValue", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ElementValue findUnique
   */
  export type ElementValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * Filter, which ElementValue to fetch.
     */
    where: ElementValueWhereUniqueInput
  }

  /**
   * ElementValue findUniqueOrThrow
   */
  export type ElementValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * Filter, which ElementValue to fetch.
     */
    where: ElementValueWhereUniqueInput
  }

  /**
   * ElementValue findFirst
   */
  export type ElementValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * Filter, which ElementValue to fetch.
     */
    where?: ElementValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementValues to fetch.
     */
    orderBy?: ElementValueOrderByWithRelationInput | ElementValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElementValues.
     */
    cursor?: ElementValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElementValues.
     */
    distinct?: ElementValueScalarFieldEnum | ElementValueScalarFieldEnum[]
  }

  /**
   * ElementValue findFirstOrThrow
   */
  export type ElementValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * Filter, which ElementValue to fetch.
     */
    where?: ElementValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementValues to fetch.
     */
    orderBy?: ElementValueOrderByWithRelationInput | ElementValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElementValues.
     */
    cursor?: ElementValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElementValues.
     */
    distinct?: ElementValueScalarFieldEnum | ElementValueScalarFieldEnum[]
  }

  /**
   * ElementValue findMany
   */
  export type ElementValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * Filter, which ElementValues to fetch.
     */
    where?: ElementValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElementValues to fetch.
     */
    orderBy?: ElementValueOrderByWithRelationInput | ElementValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ElementValues.
     */
    cursor?: ElementValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElementValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElementValues.
     */
    skip?: number
    distinct?: ElementValueScalarFieldEnum | ElementValueScalarFieldEnum[]
  }

  /**
   * ElementValue create
   */
  export type ElementValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * The data needed to create a ElementValue.
     */
    data: XOR<ElementValueCreateInput, ElementValueUncheckedCreateInput>
  }

  /**
   * ElementValue createMany
   */
  export type ElementValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ElementValues.
     */
    data: ElementValueCreateManyInput | ElementValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ElementValue createManyAndReturn
   */
  export type ElementValueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * The data used to create many ElementValues.
     */
    data: ElementValueCreateManyInput | ElementValueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ElementValue update
   */
  export type ElementValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * The data needed to update a ElementValue.
     */
    data: XOR<ElementValueUpdateInput, ElementValueUncheckedUpdateInput>
    /**
     * Choose, which ElementValue to update.
     */
    where: ElementValueWhereUniqueInput
  }

  /**
   * ElementValue updateMany
   */
  export type ElementValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ElementValues.
     */
    data: XOR<ElementValueUpdateManyMutationInput, ElementValueUncheckedUpdateManyInput>
    /**
     * Filter which ElementValues to update
     */
    where?: ElementValueWhereInput
    /**
     * Limit how many ElementValues to update.
     */
    limit?: number
  }

  /**
   * ElementValue updateManyAndReturn
   */
  export type ElementValueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * The data used to update ElementValues.
     */
    data: XOR<ElementValueUpdateManyMutationInput, ElementValueUncheckedUpdateManyInput>
    /**
     * Filter which ElementValues to update
     */
    where?: ElementValueWhereInput
    /**
     * Limit how many ElementValues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ElementValue upsert
   */
  export type ElementValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * The filter to search for the ElementValue to update in case it exists.
     */
    where: ElementValueWhereUniqueInput
    /**
     * In case the ElementValue found by the `where` argument doesn't exist, create a new ElementValue with this data.
     */
    create: XOR<ElementValueCreateInput, ElementValueUncheckedCreateInput>
    /**
     * In case the ElementValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementValueUpdateInput, ElementValueUncheckedUpdateInput>
  }

  /**
   * ElementValue delete
   */
  export type ElementValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
    /**
     * Filter which ElementValue to delete.
     */
    where: ElementValueWhereUniqueInput
  }

  /**
   * ElementValue deleteMany
   */
  export type ElementValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElementValues to delete
     */
    where?: ElementValueWhereInput
    /**
     * Limit how many ElementValues to delete.
     */
    limit?: number
  }

  /**
   * ElementValue without action
   */
  export type ElementValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementValue
     */
    select?: ElementValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElementValue
     */
    omit?: ElementValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementValueInclude<ExtArgs> | null
  }


  /**
   * Model Moodboard
   */

  export type AggregateMoodboard = {
    _count: MoodboardCountAggregateOutputType | null
    _avg: MoodboardAvgAggregateOutputType | null
    _sum: MoodboardSumAggregateOutputType | null
    _min: MoodboardMinAggregateOutputType | null
    _max: MoodboardMaxAggregateOutputType | null
  }

  export type MoodboardAvgAggregateOutputType = {
    id: number | null
  }

  export type MoodboardSumAggregateOutputType = {
    id: number | null
  }

  export type MoodboardMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type MoodboardMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type MoodboardCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    userId: number
    _all: number
  }


  export type MoodboardAvgAggregateInputType = {
    id?: true
  }

  export type MoodboardSumAggregateInputType = {
    id?: true
  }

  export type MoodboardMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    userId?: true
  }

  export type MoodboardMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    userId?: true
  }

  export type MoodboardCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type MoodboardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Moodboard to aggregate.
     */
    where?: MoodboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moodboards to fetch.
     */
    orderBy?: MoodboardOrderByWithRelationInput | MoodboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moodboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moodboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Moodboards
    **/
    _count?: true | MoodboardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoodboardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoodboardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodboardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodboardMaxAggregateInputType
  }

  export type GetMoodboardAggregateType<T extends MoodboardAggregateArgs> = {
        [P in keyof T & keyof AggregateMoodboard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoodboard[P]>
      : GetScalarType<T[P], AggregateMoodboard[P]>
  }




  export type MoodboardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodboardWhereInput
    orderBy?: MoodboardOrderByWithAggregationInput | MoodboardOrderByWithAggregationInput[]
    by: MoodboardScalarFieldEnum[] | MoodboardScalarFieldEnum
    having?: MoodboardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodboardCountAggregateInputType | true
    _avg?: MoodboardAvgAggregateInputType
    _sum?: MoodboardSumAggregateInputType
    _min?: MoodboardMinAggregateInputType
    _max?: MoodboardMaxAggregateInputType
  }

  export type MoodboardGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    userId: string
    _count: MoodboardCountAggregateOutputType | null
    _avg: MoodboardAvgAggregateOutputType | null
    _sum: MoodboardSumAggregateOutputType | null
    _min: MoodboardMinAggregateOutputType | null
    _max: MoodboardMaxAggregateOutputType | null
  }

  type GetMoodboardGroupByPayload<T extends MoodboardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodboardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodboardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodboardGroupByOutputType[P]>
            : GetScalarType<T[P], MoodboardGroupByOutputType[P]>
        }
      >
    >


  export type MoodboardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
    elements?: boolean | Moodboard$elementsArgs<ExtArgs>
    _count?: boolean | MoodboardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodboard"]>

  export type MoodboardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["moodboard"]>

  export type MoodboardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["moodboard"]>

  export type MoodboardSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type MoodboardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "userId", ExtArgs["result"]["moodboard"]>
  export type MoodboardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | Moodboard$elementsArgs<ExtArgs>
    _count?: boolean | MoodboardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MoodboardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MoodboardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MoodboardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Moodboard"
    objects: {
      elements: Prisma.$ElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["moodboard"]>
    composites: {}
  }

  type MoodboardGetPayload<S extends boolean | null | undefined | MoodboardDefaultArgs> = $Result.GetResult<Prisma.$MoodboardPayload, S>

  type MoodboardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodboardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodboardCountAggregateInputType | true
    }

  export interface MoodboardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Moodboard'], meta: { name: 'Moodboard' } }
    /**
     * Find zero or one Moodboard that matches the filter.
     * @param {MoodboardFindUniqueArgs} args - Arguments to find a Moodboard
     * @example
     * // Get one Moodboard
     * const moodboard = await prisma.moodboard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodboardFindUniqueArgs>(args: SelectSubset<T, MoodboardFindUniqueArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Moodboard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodboardFindUniqueOrThrowArgs} args - Arguments to find a Moodboard
     * @example
     * // Get one Moodboard
     * const moodboard = await prisma.moodboard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodboardFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodboardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Moodboard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardFindFirstArgs} args - Arguments to find a Moodboard
     * @example
     * // Get one Moodboard
     * const moodboard = await prisma.moodboard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodboardFindFirstArgs>(args?: SelectSubset<T, MoodboardFindFirstArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Moodboard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardFindFirstOrThrowArgs} args - Arguments to find a Moodboard
     * @example
     * // Get one Moodboard
     * const moodboard = await prisma.moodboard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodboardFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodboardFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Moodboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Moodboards
     * const moodboards = await prisma.moodboard.findMany()
     * 
     * // Get first 10 Moodboards
     * const moodboards = await prisma.moodboard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodboardWithIdOnly = await prisma.moodboard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodboardFindManyArgs>(args?: SelectSubset<T, MoodboardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Moodboard.
     * @param {MoodboardCreateArgs} args - Arguments to create a Moodboard.
     * @example
     * // Create one Moodboard
     * const Moodboard = await prisma.moodboard.create({
     *   data: {
     *     // ... data to create a Moodboard
     *   }
     * })
     * 
     */
    create<T extends MoodboardCreateArgs>(args: SelectSubset<T, MoodboardCreateArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Moodboards.
     * @param {MoodboardCreateManyArgs} args - Arguments to create many Moodboards.
     * @example
     * // Create many Moodboards
     * const moodboard = await prisma.moodboard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodboardCreateManyArgs>(args?: SelectSubset<T, MoodboardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Moodboards and returns the data saved in the database.
     * @param {MoodboardCreateManyAndReturnArgs} args - Arguments to create many Moodboards.
     * @example
     * // Create many Moodboards
     * const moodboard = await prisma.moodboard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Moodboards and only return the `id`
     * const moodboardWithIdOnly = await prisma.moodboard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodboardCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodboardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Moodboard.
     * @param {MoodboardDeleteArgs} args - Arguments to delete one Moodboard.
     * @example
     * // Delete one Moodboard
     * const Moodboard = await prisma.moodboard.delete({
     *   where: {
     *     // ... filter to delete one Moodboard
     *   }
     * })
     * 
     */
    delete<T extends MoodboardDeleteArgs>(args: SelectSubset<T, MoodboardDeleteArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Moodboard.
     * @param {MoodboardUpdateArgs} args - Arguments to update one Moodboard.
     * @example
     * // Update one Moodboard
     * const moodboard = await prisma.moodboard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodboardUpdateArgs>(args: SelectSubset<T, MoodboardUpdateArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Moodboards.
     * @param {MoodboardDeleteManyArgs} args - Arguments to filter Moodboards to delete.
     * @example
     * // Delete a few Moodboards
     * const { count } = await prisma.moodboard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodboardDeleteManyArgs>(args?: SelectSubset<T, MoodboardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moodboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Moodboards
     * const moodboard = await prisma.moodboard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodboardUpdateManyArgs>(args: SelectSubset<T, MoodboardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moodboards and returns the data updated in the database.
     * @param {MoodboardUpdateManyAndReturnArgs} args - Arguments to update many Moodboards.
     * @example
     * // Update many Moodboards
     * const moodboard = await prisma.moodboard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Moodboards and only return the `id`
     * const moodboardWithIdOnly = await prisma.moodboard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoodboardUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodboardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Moodboard.
     * @param {MoodboardUpsertArgs} args - Arguments to update or create a Moodboard.
     * @example
     * // Update or create a Moodboard
     * const moodboard = await prisma.moodboard.upsert({
     *   create: {
     *     // ... data to create a Moodboard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Moodboard we want to update
     *   }
     * })
     */
    upsert<T extends MoodboardUpsertArgs>(args: SelectSubset<T, MoodboardUpsertArgs<ExtArgs>>): Prisma__MoodboardClient<$Result.GetResult<Prisma.$MoodboardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Moodboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardCountArgs} args - Arguments to filter Moodboards to count.
     * @example
     * // Count the number of Moodboards
     * const count = await prisma.moodboard.count({
     *   where: {
     *     // ... the filter for the Moodboards we want to count
     *   }
     * })
    **/
    count<T extends MoodboardCountArgs>(
      args?: Subset<T, MoodboardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodboardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Moodboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoodboardAggregateArgs>(args: Subset<T, MoodboardAggregateArgs>): Prisma.PrismaPromise<GetMoodboardAggregateType<T>>

    /**
     * Group by Moodboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodboardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoodboardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodboardGroupByArgs['orderBy'] }
        : { orderBy?: MoodboardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodboardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodboardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Moodboard model
   */
  readonly fields: MoodboardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Moodboard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodboardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elements<T extends Moodboard$elementsArgs<ExtArgs> = {}>(args?: Subset<T, Moodboard$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Moodboard model
   */
  interface MoodboardFieldRefs {
    readonly id: FieldRef<"Moodboard", 'Int'>
    readonly name: FieldRef<"Moodboard", 'String'>
    readonly createdAt: FieldRef<"Moodboard", 'DateTime'>
    readonly userId: FieldRef<"Moodboard", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Moodboard findUnique
   */
  export type MoodboardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * Filter, which Moodboard to fetch.
     */
    where: MoodboardWhereUniqueInput
  }

  /**
   * Moodboard findUniqueOrThrow
   */
  export type MoodboardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * Filter, which Moodboard to fetch.
     */
    where: MoodboardWhereUniqueInput
  }

  /**
   * Moodboard findFirst
   */
  export type MoodboardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * Filter, which Moodboard to fetch.
     */
    where?: MoodboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moodboards to fetch.
     */
    orderBy?: MoodboardOrderByWithRelationInput | MoodboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moodboards.
     */
    cursor?: MoodboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moodboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moodboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moodboards.
     */
    distinct?: MoodboardScalarFieldEnum | MoodboardScalarFieldEnum[]
  }

  /**
   * Moodboard findFirstOrThrow
   */
  export type MoodboardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * Filter, which Moodboard to fetch.
     */
    where?: MoodboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moodboards to fetch.
     */
    orderBy?: MoodboardOrderByWithRelationInput | MoodboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moodboards.
     */
    cursor?: MoodboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moodboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moodboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moodboards.
     */
    distinct?: MoodboardScalarFieldEnum | MoodboardScalarFieldEnum[]
  }

  /**
   * Moodboard findMany
   */
  export type MoodboardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * Filter, which Moodboards to fetch.
     */
    where?: MoodboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moodboards to fetch.
     */
    orderBy?: MoodboardOrderByWithRelationInput | MoodboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Moodboards.
     */
    cursor?: MoodboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moodboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moodboards.
     */
    skip?: number
    distinct?: MoodboardScalarFieldEnum | MoodboardScalarFieldEnum[]
  }

  /**
   * Moodboard create
   */
  export type MoodboardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * The data needed to create a Moodboard.
     */
    data: XOR<MoodboardCreateInput, MoodboardUncheckedCreateInput>
  }

  /**
   * Moodboard createMany
   */
  export type MoodboardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Moodboards.
     */
    data: MoodboardCreateManyInput | MoodboardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Moodboard createManyAndReturn
   */
  export type MoodboardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * The data used to create many Moodboards.
     */
    data: MoodboardCreateManyInput | MoodboardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Moodboard update
   */
  export type MoodboardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * The data needed to update a Moodboard.
     */
    data: XOR<MoodboardUpdateInput, MoodboardUncheckedUpdateInput>
    /**
     * Choose, which Moodboard to update.
     */
    where: MoodboardWhereUniqueInput
  }

  /**
   * Moodboard updateMany
   */
  export type MoodboardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Moodboards.
     */
    data: XOR<MoodboardUpdateManyMutationInput, MoodboardUncheckedUpdateManyInput>
    /**
     * Filter which Moodboards to update
     */
    where?: MoodboardWhereInput
    /**
     * Limit how many Moodboards to update.
     */
    limit?: number
  }

  /**
   * Moodboard updateManyAndReturn
   */
  export type MoodboardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * The data used to update Moodboards.
     */
    data: XOR<MoodboardUpdateManyMutationInput, MoodboardUncheckedUpdateManyInput>
    /**
     * Filter which Moodboards to update
     */
    where?: MoodboardWhereInput
    /**
     * Limit how many Moodboards to update.
     */
    limit?: number
  }

  /**
   * Moodboard upsert
   */
  export type MoodboardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * The filter to search for the Moodboard to update in case it exists.
     */
    where: MoodboardWhereUniqueInput
    /**
     * In case the Moodboard found by the `where` argument doesn't exist, create a new Moodboard with this data.
     */
    create: XOR<MoodboardCreateInput, MoodboardUncheckedCreateInput>
    /**
     * In case the Moodboard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodboardUpdateInput, MoodboardUncheckedUpdateInput>
  }

  /**
   * Moodboard delete
   */
  export type MoodboardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
    /**
     * Filter which Moodboard to delete.
     */
    where: MoodboardWhereUniqueInput
  }

  /**
   * Moodboard deleteMany
   */
  export type MoodboardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Moodboards to delete
     */
    where?: MoodboardWhereInput
    /**
     * Limit how many Moodboards to delete.
     */
    limit?: number
  }

  /**
   * Moodboard.elements
   */
  export type Moodboard$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    cursor?: ElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Moodboard without action
   */
  export type MoodboardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Moodboard
     */
    select?: MoodboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Moodboard
     */
    omit?: MoodboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodboardInclude<ExtArgs> | null
  }


  /**
   * Model GalleryPin
   */

  export type AggregateGalleryPin = {
    _count: GalleryPinCountAggregateOutputType | null
    _avg: GalleryPinAvgAggregateOutputType | null
    _sum: GalleryPinSumAggregateOutputType | null
    _min: GalleryPinMinAggregateOutputType | null
    _max: GalleryPinMaxAggregateOutputType | null
  }

  export type GalleryPinAvgAggregateOutputType = {
    id: number | null
  }

  export type GalleryPinSumAggregateOutputType = {
    id: number | null
  }

  export type GalleryPinMinAggregateOutputType = {
    id: number | null
    title: string | null
    imageUrl: string | null
    description: string | null
    createdAt: Date | null
    authorId: string | null
  }

  export type GalleryPinMaxAggregateOutputType = {
    id: number | null
    title: string | null
    imageUrl: string | null
    description: string | null
    createdAt: Date | null
    authorId: string | null
  }

  export type GalleryPinCountAggregateOutputType = {
    id: number
    title: number
    imageUrl: number
    description: number
    createdAt: number
    authorId: number
    _all: number
  }


  export type GalleryPinAvgAggregateInputType = {
    id?: true
  }

  export type GalleryPinSumAggregateInputType = {
    id?: true
  }

  export type GalleryPinMinAggregateInputType = {
    id?: true
    title?: true
    imageUrl?: true
    description?: true
    createdAt?: true
    authorId?: true
  }

  export type GalleryPinMaxAggregateInputType = {
    id?: true
    title?: true
    imageUrl?: true
    description?: true
    createdAt?: true
    authorId?: true
  }

  export type GalleryPinCountAggregateInputType = {
    id?: true
    title?: true
    imageUrl?: true
    description?: true
    createdAt?: true
    authorId?: true
    _all?: true
  }

  export type GalleryPinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryPin to aggregate.
     */
    where?: GalleryPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPins to fetch.
     */
    orderBy?: GalleryPinOrderByWithRelationInput | GalleryPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GalleryPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GalleryPins
    **/
    _count?: true | GalleryPinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GalleryPinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GalleryPinSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GalleryPinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GalleryPinMaxAggregateInputType
  }

  export type GetGalleryPinAggregateType<T extends GalleryPinAggregateArgs> = {
        [P in keyof T & keyof AggregateGalleryPin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGalleryPin[P]>
      : GetScalarType<T[P], AggregateGalleryPin[P]>
  }




  export type GalleryPinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryPinWhereInput
    orderBy?: GalleryPinOrderByWithAggregationInput | GalleryPinOrderByWithAggregationInput[]
    by: GalleryPinScalarFieldEnum[] | GalleryPinScalarFieldEnum
    having?: GalleryPinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GalleryPinCountAggregateInputType | true
    _avg?: GalleryPinAvgAggregateInputType
    _sum?: GalleryPinSumAggregateInputType
    _min?: GalleryPinMinAggregateInputType
    _max?: GalleryPinMaxAggregateInputType
  }

  export type GalleryPinGroupByOutputType = {
    id: number
    title: string
    imageUrl: string
    description: string | null
    createdAt: Date
    authorId: string
    _count: GalleryPinCountAggregateOutputType | null
    _avg: GalleryPinAvgAggregateOutputType | null
    _sum: GalleryPinSumAggregateOutputType | null
    _min: GalleryPinMinAggregateOutputType | null
    _max: GalleryPinMaxAggregateOutputType | null
  }

  type GetGalleryPinGroupByPayload<T extends GalleryPinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GalleryPinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GalleryPinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GalleryPinGroupByOutputType[P]>
            : GetScalarType<T[P], GalleryPinGroupByOutputType[P]>
        }
      >
    >


  export type GalleryPinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    imageUrl?: boolean
    description?: boolean
    createdAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | GalleryPin$likesArgs<ExtArgs>
    _count?: boolean | GalleryPinCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryPin"]>

  export type GalleryPinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    imageUrl?: boolean
    description?: boolean
    createdAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryPin"]>

  export type GalleryPinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    imageUrl?: boolean
    description?: boolean
    createdAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryPin"]>

  export type GalleryPinSelectScalar = {
    id?: boolean
    title?: boolean
    imageUrl?: boolean
    description?: boolean
    createdAt?: boolean
    authorId?: boolean
  }

  export type GalleryPinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "imageUrl" | "description" | "createdAt" | "authorId", ExtArgs["result"]["galleryPin"]>
  export type GalleryPinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | GalleryPin$likesArgs<ExtArgs>
    _count?: boolean | GalleryPinCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GalleryPinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GalleryPinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GalleryPinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GalleryPin"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      likes: Prisma.$GalleryPinLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      imageUrl: string
      description: string | null
      createdAt: Date
      authorId: string
    }, ExtArgs["result"]["galleryPin"]>
    composites: {}
  }

  type GalleryPinGetPayload<S extends boolean | null | undefined | GalleryPinDefaultArgs> = $Result.GetResult<Prisma.$GalleryPinPayload, S>

  type GalleryPinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GalleryPinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GalleryPinCountAggregateInputType | true
    }

  export interface GalleryPinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GalleryPin'], meta: { name: 'GalleryPin' } }
    /**
     * Find zero or one GalleryPin that matches the filter.
     * @param {GalleryPinFindUniqueArgs} args - Arguments to find a GalleryPin
     * @example
     * // Get one GalleryPin
     * const galleryPin = await prisma.galleryPin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GalleryPinFindUniqueArgs>(args: SelectSubset<T, GalleryPinFindUniqueArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GalleryPin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GalleryPinFindUniqueOrThrowArgs} args - Arguments to find a GalleryPin
     * @example
     * // Get one GalleryPin
     * const galleryPin = await prisma.galleryPin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GalleryPinFindUniqueOrThrowArgs>(args: SelectSubset<T, GalleryPinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GalleryPin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinFindFirstArgs} args - Arguments to find a GalleryPin
     * @example
     * // Get one GalleryPin
     * const galleryPin = await prisma.galleryPin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GalleryPinFindFirstArgs>(args?: SelectSubset<T, GalleryPinFindFirstArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GalleryPin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinFindFirstOrThrowArgs} args - Arguments to find a GalleryPin
     * @example
     * // Get one GalleryPin
     * const galleryPin = await prisma.galleryPin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GalleryPinFindFirstOrThrowArgs>(args?: SelectSubset<T, GalleryPinFindFirstOrThrowArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GalleryPins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GalleryPins
     * const galleryPins = await prisma.galleryPin.findMany()
     * 
     * // Get first 10 GalleryPins
     * const galleryPins = await prisma.galleryPin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const galleryPinWithIdOnly = await prisma.galleryPin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GalleryPinFindManyArgs>(args?: SelectSubset<T, GalleryPinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GalleryPin.
     * @param {GalleryPinCreateArgs} args - Arguments to create a GalleryPin.
     * @example
     * // Create one GalleryPin
     * const GalleryPin = await prisma.galleryPin.create({
     *   data: {
     *     // ... data to create a GalleryPin
     *   }
     * })
     * 
     */
    create<T extends GalleryPinCreateArgs>(args: SelectSubset<T, GalleryPinCreateArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GalleryPins.
     * @param {GalleryPinCreateManyArgs} args - Arguments to create many GalleryPins.
     * @example
     * // Create many GalleryPins
     * const galleryPin = await prisma.galleryPin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GalleryPinCreateManyArgs>(args?: SelectSubset<T, GalleryPinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GalleryPins and returns the data saved in the database.
     * @param {GalleryPinCreateManyAndReturnArgs} args - Arguments to create many GalleryPins.
     * @example
     * // Create many GalleryPins
     * const galleryPin = await prisma.galleryPin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GalleryPins and only return the `id`
     * const galleryPinWithIdOnly = await prisma.galleryPin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GalleryPinCreateManyAndReturnArgs>(args?: SelectSubset<T, GalleryPinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GalleryPin.
     * @param {GalleryPinDeleteArgs} args - Arguments to delete one GalleryPin.
     * @example
     * // Delete one GalleryPin
     * const GalleryPin = await prisma.galleryPin.delete({
     *   where: {
     *     // ... filter to delete one GalleryPin
     *   }
     * })
     * 
     */
    delete<T extends GalleryPinDeleteArgs>(args: SelectSubset<T, GalleryPinDeleteArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GalleryPin.
     * @param {GalleryPinUpdateArgs} args - Arguments to update one GalleryPin.
     * @example
     * // Update one GalleryPin
     * const galleryPin = await prisma.galleryPin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GalleryPinUpdateArgs>(args: SelectSubset<T, GalleryPinUpdateArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GalleryPins.
     * @param {GalleryPinDeleteManyArgs} args - Arguments to filter GalleryPins to delete.
     * @example
     * // Delete a few GalleryPins
     * const { count } = await prisma.galleryPin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GalleryPinDeleteManyArgs>(args?: SelectSubset<T, GalleryPinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryPins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GalleryPins
     * const galleryPin = await prisma.galleryPin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GalleryPinUpdateManyArgs>(args: SelectSubset<T, GalleryPinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryPins and returns the data updated in the database.
     * @param {GalleryPinUpdateManyAndReturnArgs} args - Arguments to update many GalleryPins.
     * @example
     * // Update many GalleryPins
     * const galleryPin = await prisma.galleryPin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GalleryPins and only return the `id`
     * const galleryPinWithIdOnly = await prisma.galleryPin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GalleryPinUpdateManyAndReturnArgs>(args: SelectSubset<T, GalleryPinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GalleryPin.
     * @param {GalleryPinUpsertArgs} args - Arguments to update or create a GalleryPin.
     * @example
     * // Update or create a GalleryPin
     * const galleryPin = await prisma.galleryPin.upsert({
     *   create: {
     *     // ... data to create a GalleryPin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GalleryPin we want to update
     *   }
     * })
     */
    upsert<T extends GalleryPinUpsertArgs>(args: SelectSubset<T, GalleryPinUpsertArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GalleryPins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinCountArgs} args - Arguments to filter GalleryPins to count.
     * @example
     * // Count the number of GalleryPins
     * const count = await prisma.galleryPin.count({
     *   where: {
     *     // ... the filter for the GalleryPins we want to count
     *   }
     * })
    **/
    count<T extends GalleryPinCountArgs>(
      args?: Subset<T, GalleryPinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GalleryPinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GalleryPin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GalleryPinAggregateArgs>(args: Subset<T, GalleryPinAggregateArgs>): Prisma.PrismaPromise<GetGalleryPinAggregateType<T>>

    /**
     * Group by GalleryPin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GalleryPinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GalleryPinGroupByArgs['orderBy'] }
        : { orderBy?: GalleryPinGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GalleryPinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGalleryPinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GalleryPin model
   */
  readonly fields: GalleryPinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GalleryPin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GalleryPinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    likes<T extends GalleryPin$likesArgs<ExtArgs> = {}>(args?: Subset<T, GalleryPin$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GalleryPin model
   */
  interface GalleryPinFieldRefs {
    readonly id: FieldRef<"GalleryPin", 'Int'>
    readonly title: FieldRef<"GalleryPin", 'String'>
    readonly imageUrl: FieldRef<"GalleryPin", 'String'>
    readonly description: FieldRef<"GalleryPin", 'String'>
    readonly createdAt: FieldRef<"GalleryPin", 'DateTime'>
    readonly authorId: FieldRef<"GalleryPin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GalleryPin findUnique
   */
  export type GalleryPinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPin to fetch.
     */
    where: GalleryPinWhereUniqueInput
  }

  /**
   * GalleryPin findUniqueOrThrow
   */
  export type GalleryPinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPin to fetch.
     */
    where: GalleryPinWhereUniqueInput
  }

  /**
   * GalleryPin findFirst
   */
  export type GalleryPinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPin to fetch.
     */
    where?: GalleryPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPins to fetch.
     */
    orderBy?: GalleryPinOrderByWithRelationInput | GalleryPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryPins.
     */
    cursor?: GalleryPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPins.
     */
    distinct?: GalleryPinScalarFieldEnum | GalleryPinScalarFieldEnum[]
  }

  /**
   * GalleryPin findFirstOrThrow
   */
  export type GalleryPinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPin to fetch.
     */
    where?: GalleryPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPins to fetch.
     */
    orderBy?: GalleryPinOrderByWithRelationInput | GalleryPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryPins.
     */
    cursor?: GalleryPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPins.
     */
    distinct?: GalleryPinScalarFieldEnum | GalleryPinScalarFieldEnum[]
  }

  /**
   * GalleryPin findMany
   */
  export type GalleryPinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPins to fetch.
     */
    where?: GalleryPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPins to fetch.
     */
    orderBy?: GalleryPinOrderByWithRelationInput | GalleryPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GalleryPins.
     */
    cursor?: GalleryPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPins.
     */
    skip?: number
    distinct?: GalleryPinScalarFieldEnum | GalleryPinScalarFieldEnum[]
  }

  /**
   * GalleryPin create
   */
  export type GalleryPinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * The data needed to create a GalleryPin.
     */
    data: XOR<GalleryPinCreateInput, GalleryPinUncheckedCreateInput>
  }

  /**
   * GalleryPin createMany
   */
  export type GalleryPinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GalleryPins.
     */
    data: GalleryPinCreateManyInput | GalleryPinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryPin createManyAndReturn
   */
  export type GalleryPinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * The data used to create many GalleryPins.
     */
    data: GalleryPinCreateManyInput | GalleryPinCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GalleryPin update
   */
  export type GalleryPinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * The data needed to update a GalleryPin.
     */
    data: XOR<GalleryPinUpdateInput, GalleryPinUncheckedUpdateInput>
    /**
     * Choose, which GalleryPin to update.
     */
    where: GalleryPinWhereUniqueInput
  }

  /**
   * GalleryPin updateMany
   */
  export type GalleryPinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GalleryPins.
     */
    data: XOR<GalleryPinUpdateManyMutationInput, GalleryPinUncheckedUpdateManyInput>
    /**
     * Filter which GalleryPins to update
     */
    where?: GalleryPinWhereInput
    /**
     * Limit how many GalleryPins to update.
     */
    limit?: number
  }

  /**
   * GalleryPin updateManyAndReturn
   */
  export type GalleryPinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * The data used to update GalleryPins.
     */
    data: XOR<GalleryPinUpdateManyMutationInput, GalleryPinUncheckedUpdateManyInput>
    /**
     * Filter which GalleryPins to update
     */
    where?: GalleryPinWhereInput
    /**
     * Limit how many GalleryPins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GalleryPin upsert
   */
  export type GalleryPinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * The filter to search for the GalleryPin to update in case it exists.
     */
    where: GalleryPinWhereUniqueInput
    /**
     * In case the GalleryPin found by the `where` argument doesn't exist, create a new GalleryPin with this data.
     */
    create: XOR<GalleryPinCreateInput, GalleryPinUncheckedCreateInput>
    /**
     * In case the GalleryPin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GalleryPinUpdateInput, GalleryPinUncheckedUpdateInput>
  }

  /**
   * GalleryPin delete
   */
  export type GalleryPinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
    /**
     * Filter which GalleryPin to delete.
     */
    where: GalleryPinWhereUniqueInput
  }

  /**
   * GalleryPin deleteMany
   */
  export type GalleryPinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryPins to delete
     */
    where?: GalleryPinWhereInput
    /**
     * Limit how many GalleryPins to delete.
     */
    limit?: number
  }

  /**
   * GalleryPin.likes
   */
  export type GalleryPin$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    where?: GalleryPinLikeWhereInput
    orderBy?: GalleryPinLikeOrderByWithRelationInput | GalleryPinLikeOrderByWithRelationInput[]
    cursor?: GalleryPinLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GalleryPinLikeScalarFieldEnum | GalleryPinLikeScalarFieldEnum[]
  }

  /**
   * GalleryPin without action
   */
  export type GalleryPinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPin
     */
    select?: GalleryPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPin
     */
    omit?: GalleryPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinInclude<ExtArgs> | null
  }


  /**
   * Model GalleryPinLike
   */

  export type AggregateGalleryPinLike = {
    _count: GalleryPinLikeCountAggregateOutputType | null
    _avg: GalleryPinLikeAvgAggregateOutputType | null
    _sum: GalleryPinLikeSumAggregateOutputType | null
    _min: GalleryPinLikeMinAggregateOutputType | null
    _max: GalleryPinLikeMaxAggregateOutputType | null
  }

  export type GalleryPinLikeAvgAggregateOutputType = {
    id: number | null
    pinId: number | null
  }

  export type GalleryPinLikeSumAggregateOutputType = {
    id: number | null
    pinId: number | null
  }

  export type GalleryPinLikeMinAggregateOutputType = {
    id: number | null
    pinId: number | null
    userId: string | null
  }

  export type GalleryPinLikeMaxAggregateOutputType = {
    id: number | null
    pinId: number | null
    userId: string | null
  }

  export type GalleryPinLikeCountAggregateOutputType = {
    id: number
    pinId: number
    userId: number
    _all: number
  }


  export type GalleryPinLikeAvgAggregateInputType = {
    id?: true
    pinId?: true
  }

  export type GalleryPinLikeSumAggregateInputType = {
    id?: true
    pinId?: true
  }

  export type GalleryPinLikeMinAggregateInputType = {
    id?: true
    pinId?: true
    userId?: true
  }

  export type GalleryPinLikeMaxAggregateInputType = {
    id?: true
    pinId?: true
    userId?: true
  }

  export type GalleryPinLikeCountAggregateInputType = {
    id?: true
    pinId?: true
    userId?: true
    _all?: true
  }

  export type GalleryPinLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryPinLike to aggregate.
     */
    where?: GalleryPinLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPinLikes to fetch.
     */
    orderBy?: GalleryPinLikeOrderByWithRelationInput | GalleryPinLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GalleryPinLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPinLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPinLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GalleryPinLikes
    **/
    _count?: true | GalleryPinLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GalleryPinLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GalleryPinLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GalleryPinLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GalleryPinLikeMaxAggregateInputType
  }

  export type GetGalleryPinLikeAggregateType<T extends GalleryPinLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateGalleryPinLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGalleryPinLike[P]>
      : GetScalarType<T[P], AggregateGalleryPinLike[P]>
  }




  export type GalleryPinLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryPinLikeWhereInput
    orderBy?: GalleryPinLikeOrderByWithAggregationInput | GalleryPinLikeOrderByWithAggregationInput[]
    by: GalleryPinLikeScalarFieldEnum[] | GalleryPinLikeScalarFieldEnum
    having?: GalleryPinLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GalleryPinLikeCountAggregateInputType | true
    _avg?: GalleryPinLikeAvgAggregateInputType
    _sum?: GalleryPinLikeSumAggregateInputType
    _min?: GalleryPinLikeMinAggregateInputType
    _max?: GalleryPinLikeMaxAggregateInputType
  }

  export type GalleryPinLikeGroupByOutputType = {
    id: number
    pinId: number
    userId: string
    _count: GalleryPinLikeCountAggregateOutputType | null
    _avg: GalleryPinLikeAvgAggregateOutputType | null
    _sum: GalleryPinLikeSumAggregateOutputType | null
    _min: GalleryPinLikeMinAggregateOutputType | null
    _max: GalleryPinLikeMaxAggregateOutputType | null
  }

  type GetGalleryPinLikeGroupByPayload<T extends GalleryPinLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GalleryPinLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GalleryPinLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GalleryPinLikeGroupByOutputType[P]>
            : GetScalarType<T[P], GalleryPinLikeGroupByOutputType[P]>
        }
      >
    >


  export type GalleryPinLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pinId?: boolean
    userId?: boolean
    pin?: boolean | GalleryPinDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryPinLike"]>

  export type GalleryPinLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pinId?: boolean
    userId?: boolean
    pin?: boolean | GalleryPinDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryPinLike"]>

  export type GalleryPinLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pinId?: boolean
    userId?: boolean
    pin?: boolean | GalleryPinDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryPinLike"]>

  export type GalleryPinLikeSelectScalar = {
    id?: boolean
    pinId?: boolean
    userId?: boolean
  }

  export type GalleryPinLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pinId" | "userId", ExtArgs["result"]["galleryPinLike"]>
  export type GalleryPinLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pin?: boolean | GalleryPinDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GalleryPinLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pin?: boolean | GalleryPinDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GalleryPinLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pin?: boolean | GalleryPinDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GalleryPinLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GalleryPinLike"
    objects: {
      pin: Prisma.$GalleryPinPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pinId: number
      userId: string
    }, ExtArgs["result"]["galleryPinLike"]>
    composites: {}
  }

  type GalleryPinLikeGetPayload<S extends boolean | null | undefined | GalleryPinLikeDefaultArgs> = $Result.GetResult<Prisma.$GalleryPinLikePayload, S>

  type GalleryPinLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GalleryPinLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GalleryPinLikeCountAggregateInputType | true
    }

  export interface GalleryPinLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GalleryPinLike'], meta: { name: 'GalleryPinLike' } }
    /**
     * Find zero or one GalleryPinLike that matches the filter.
     * @param {GalleryPinLikeFindUniqueArgs} args - Arguments to find a GalleryPinLike
     * @example
     * // Get one GalleryPinLike
     * const galleryPinLike = await prisma.galleryPinLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GalleryPinLikeFindUniqueArgs>(args: SelectSubset<T, GalleryPinLikeFindUniqueArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GalleryPinLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GalleryPinLikeFindUniqueOrThrowArgs} args - Arguments to find a GalleryPinLike
     * @example
     * // Get one GalleryPinLike
     * const galleryPinLike = await prisma.galleryPinLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GalleryPinLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, GalleryPinLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GalleryPinLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeFindFirstArgs} args - Arguments to find a GalleryPinLike
     * @example
     * // Get one GalleryPinLike
     * const galleryPinLike = await prisma.galleryPinLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GalleryPinLikeFindFirstArgs>(args?: SelectSubset<T, GalleryPinLikeFindFirstArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GalleryPinLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeFindFirstOrThrowArgs} args - Arguments to find a GalleryPinLike
     * @example
     * // Get one GalleryPinLike
     * const galleryPinLike = await prisma.galleryPinLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GalleryPinLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, GalleryPinLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GalleryPinLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GalleryPinLikes
     * const galleryPinLikes = await prisma.galleryPinLike.findMany()
     * 
     * // Get first 10 GalleryPinLikes
     * const galleryPinLikes = await prisma.galleryPinLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const galleryPinLikeWithIdOnly = await prisma.galleryPinLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GalleryPinLikeFindManyArgs>(args?: SelectSubset<T, GalleryPinLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GalleryPinLike.
     * @param {GalleryPinLikeCreateArgs} args - Arguments to create a GalleryPinLike.
     * @example
     * // Create one GalleryPinLike
     * const GalleryPinLike = await prisma.galleryPinLike.create({
     *   data: {
     *     // ... data to create a GalleryPinLike
     *   }
     * })
     * 
     */
    create<T extends GalleryPinLikeCreateArgs>(args: SelectSubset<T, GalleryPinLikeCreateArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GalleryPinLikes.
     * @param {GalleryPinLikeCreateManyArgs} args - Arguments to create many GalleryPinLikes.
     * @example
     * // Create many GalleryPinLikes
     * const galleryPinLike = await prisma.galleryPinLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GalleryPinLikeCreateManyArgs>(args?: SelectSubset<T, GalleryPinLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GalleryPinLikes and returns the data saved in the database.
     * @param {GalleryPinLikeCreateManyAndReturnArgs} args - Arguments to create many GalleryPinLikes.
     * @example
     * // Create many GalleryPinLikes
     * const galleryPinLike = await prisma.galleryPinLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GalleryPinLikes and only return the `id`
     * const galleryPinLikeWithIdOnly = await prisma.galleryPinLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GalleryPinLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, GalleryPinLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GalleryPinLike.
     * @param {GalleryPinLikeDeleteArgs} args - Arguments to delete one GalleryPinLike.
     * @example
     * // Delete one GalleryPinLike
     * const GalleryPinLike = await prisma.galleryPinLike.delete({
     *   where: {
     *     // ... filter to delete one GalleryPinLike
     *   }
     * })
     * 
     */
    delete<T extends GalleryPinLikeDeleteArgs>(args: SelectSubset<T, GalleryPinLikeDeleteArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GalleryPinLike.
     * @param {GalleryPinLikeUpdateArgs} args - Arguments to update one GalleryPinLike.
     * @example
     * // Update one GalleryPinLike
     * const galleryPinLike = await prisma.galleryPinLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GalleryPinLikeUpdateArgs>(args: SelectSubset<T, GalleryPinLikeUpdateArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GalleryPinLikes.
     * @param {GalleryPinLikeDeleteManyArgs} args - Arguments to filter GalleryPinLikes to delete.
     * @example
     * // Delete a few GalleryPinLikes
     * const { count } = await prisma.galleryPinLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GalleryPinLikeDeleteManyArgs>(args?: SelectSubset<T, GalleryPinLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryPinLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GalleryPinLikes
     * const galleryPinLike = await prisma.galleryPinLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GalleryPinLikeUpdateManyArgs>(args: SelectSubset<T, GalleryPinLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryPinLikes and returns the data updated in the database.
     * @param {GalleryPinLikeUpdateManyAndReturnArgs} args - Arguments to update many GalleryPinLikes.
     * @example
     * // Update many GalleryPinLikes
     * const galleryPinLike = await prisma.galleryPinLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GalleryPinLikes and only return the `id`
     * const galleryPinLikeWithIdOnly = await prisma.galleryPinLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GalleryPinLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, GalleryPinLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GalleryPinLike.
     * @param {GalleryPinLikeUpsertArgs} args - Arguments to update or create a GalleryPinLike.
     * @example
     * // Update or create a GalleryPinLike
     * const galleryPinLike = await prisma.galleryPinLike.upsert({
     *   create: {
     *     // ... data to create a GalleryPinLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GalleryPinLike we want to update
     *   }
     * })
     */
    upsert<T extends GalleryPinLikeUpsertArgs>(args: SelectSubset<T, GalleryPinLikeUpsertArgs<ExtArgs>>): Prisma__GalleryPinLikeClient<$Result.GetResult<Prisma.$GalleryPinLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GalleryPinLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeCountArgs} args - Arguments to filter GalleryPinLikes to count.
     * @example
     * // Count the number of GalleryPinLikes
     * const count = await prisma.galleryPinLike.count({
     *   where: {
     *     // ... the filter for the GalleryPinLikes we want to count
     *   }
     * })
    **/
    count<T extends GalleryPinLikeCountArgs>(
      args?: Subset<T, GalleryPinLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GalleryPinLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GalleryPinLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GalleryPinLikeAggregateArgs>(args: Subset<T, GalleryPinLikeAggregateArgs>): Prisma.PrismaPromise<GetGalleryPinLikeAggregateType<T>>

    /**
     * Group by GalleryPinLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPinLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GalleryPinLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GalleryPinLikeGroupByArgs['orderBy'] }
        : { orderBy?: GalleryPinLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GalleryPinLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGalleryPinLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GalleryPinLike model
   */
  readonly fields: GalleryPinLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GalleryPinLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GalleryPinLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pin<T extends GalleryPinDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GalleryPinDefaultArgs<ExtArgs>>): Prisma__GalleryPinClient<$Result.GetResult<Prisma.$GalleryPinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GalleryPinLike model
   */
  interface GalleryPinLikeFieldRefs {
    readonly id: FieldRef<"GalleryPinLike", 'Int'>
    readonly pinId: FieldRef<"GalleryPinLike", 'Int'>
    readonly userId: FieldRef<"GalleryPinLike", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GalleryPinLike findUnique
   */
  export type GalleryPinLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPinLike to fetch.
     */
    where: GalleryPinLikeWhereUniqueInput
  }

  /**
   * GalleryPinLike findUniqueOrThrow
   */
  export type GalleryPinLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPinLike to fetch.
     */
    where: GalleryPinLikeWhereUniqueInput
  }

  /**
   * GalleryPinLike findFirst
   */
  export type GalleryPinLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPinLike to fetch.
     */
    where?: GalleryPinLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPinLikes to fetch.
     */
    orderBy?: GalleryPinLikeOrderByWithRelationInput | GalleryPinLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryPinLikes.
     */
    cursor?: GalleryPinLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPinLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPinLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPinLikes.
     */
    distinct?: GalleryPinLikeScalarFieldEnum | GalleryPinLikeScalarFieldEnum[]
  }

  /**
   * GalleryPinLike findFirstOrThrow
   */
  export type GalleryPinLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPinLike to fetch.
     */
    where?: GalleryPinLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPinLikes to fetch.
     */
    orderBy?: GalleryPinLikeOrderByWithRelationInput | GalleryPinLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryPinLikes.
     */
    cursor?: GalleryPinLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPinLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPinLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPinLikes.
     */
    distinct?: GalleryPinLikeScalarFieldEnum | GalleryPinLikeScalarFieldEnum[]
  }

  /**
   * GalleryPinLike findMany
   */
  export type GalleryPinLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * Filter, which GalleryPinLikes to fetch.
     */
    where?: GalleryPinLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPinLikes to fetch.
     */
    orderBy?: GalleryPinLikeOrderByWithRelationInput | GalleryPinLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GalleryPinLikes.
     */
    cursor?: GalleryPinLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPinLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPinLikes.
     */
    skip?: number
    distinct?: GalleryPinLikeScalarFieldEnum | GalleryPinLikeScalarFieldEnum[]
  }

  /**
   * GalleryPinLike create
   */
  export type GalleryPinLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a GalleryPinLike.
     */
    data: XOR<GalleryPinLikeCreateInput, GalleryPinLikeUncheckedCreateInput>
  }

  /**
   * GalleryPinLike createMany
   */
  export type GalleryPinLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GalleryPinLikes.
     */
    data: GalleryPinLikeCreateManyInput | GalleryPinLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryPinLike createManyAndReturn
   */
  export type GalleryPinLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * The data used to create many GalleryPinLikes.
     */
    data: GalleryPinLikeCreateManyInput | GalleryPinLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GalleryPinLike update
   */
  export type GalleryPinLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a GalleryPinLike.
     */
    data: XOR<GalleryPinLikeUpdateInput, GalleryPinLikeUncheckedUpdateInput>
    /**
     * Choose, which GalleryPinLike to update.
     */
    where: GalleryPinLikeWhereUniqueInput
  }

  /**
   * GalleryPinLike updateMany
   */
  export type GalleryPinLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GalleryPinLikes.
     */
    data: XOR<GalleryPinLikeUpdateManyMutationInput, GalleryPinLikeUncheckedUpdateManyInput>
    /**
     * Filter which GalleryPinLikes to update
     */
    where?: GalleryPinLikeWhereInput
    /**
     * Limit how many GalleryPinLikes to update.
     */
    limit?: number
  }

  /**
   * GalleryPinLike updateManyAndReturn
   */
  export type GalleryPinLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * The data used to update GalleryPinLikes.
     */
    data: XOR<GalleryPinLikeUpdateManyMutationInput, GalleryPinLikeUncheckedUpdateManyInput>
    /**
     * Filter which GalleryPinLikes to update
     */
    where?: GalleryPinLikeWhereInput
    /**
     * Limit how many GalleryPinLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GalleryPinLike upsert
   */
  export type GalleryPinLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the GalleryPinLike to update in case it exists.
     */
    where: GalleryPinLikeWhereUniqueInput
    /**
     * In case the GalleryPinLike found by the `where` argument doesn't exist, create a new GalleryPinLike with this data.
     */
    create: XOR<GalleryPinLikeCreateInput, GalleryPinLikeUncheckedCreateInput>
    /**
     * In case the GalleryPinLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GalleryPinLikeUpdateInput, GalleryPinLikeUncheckedUpdateInput>
  }

  /**
   * GalleryPinLike delete
   */
  export type GalleryPinLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
    /**
     * Filter which GalleryPinLike to delete.
     */
    where: GalleryPinLikeWhereUniqueInput
  }

  /**
   * GalleryPinLike deleteMany
   */
  export type GalleryPinLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryPinLikes to delete
     */
    where?: GalleryPinLikeWhereInput
    /**
     * Limit how many GalleryPinLikes to delete.
     */
    limit?: number
  }

  /**
   * GalleryPinLike without action
   */
  export type GalleryPinLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPinLike
     */
    select?: GalleryPinLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPinLike
     */
    omit?: GalleryPinLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryPinLikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    userName: 'userName',
    birthday: 'birthday',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FontScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    url: 'url',
    tips: 'tips'
  };

  export type FontScalarFieldEnum = (typeof FontScalarFieldEnum)[keyof typeof FontScalarFieldEnum]


  export const PaletteScalarFieldEnum: {
    id: 'id',
    mainColor: 'mainColor',
    mixinColors: 'mixinColors',
    tags: 'tags',
    description: 'description'
  };

  export type PaletteScalarFieldEnum = (typeof PaletteScalarFieldEnum)[keyof typeof PaletteScalarFieldEnum]


  export const SegmentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    content: 'content',
    type: 'type',
    difficulty: 'difficulty',
    duration: 'duration',
    icon: 'icon',
    color: 'color',
    tags: 'tags',
    questions: 'questions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SegmentScalarFieldEnum = (typeof SegmentScalarFieldEnum)[keyof typeof SegmentScalarFieldEnum]


  export const AttributeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive'
  };

  export type AttributeScalarFieldEnum = (typeof AttributeScalarFieldEnum)[keyof typeof AttributeScalarFieldEnum]


  export const ElementTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive'
  };

  export type ElementTypeScalarFieldEnum = (typeof ElementTypeScalarFieldEnum)[keyof typeof ElementTypeScalarFieldEnum]


  export const ElementAttributeScalarFieldEnum: {
    elementTypeId: 'elementTypeId',
    attributeId: 'attributeId'
  };

  export type ElementAttributeScalarFieldEnum = (typeof ElementAttributeScalarFieldEnum)[keyof typeof ElementAttributeScalarFieldEnum]


  export const ElementScalarFieldEnum: {
    id: 'id',
    name: 'name',
    coordsX: 'coordsX',
    coordsY: 'coordsY',
    opacity: 'opacity',
    rotation: 'rotation',
    height: 'height',
    width: 'width',
    layer: 'layer',
    elementTypeId: 'elementTypeId',
    moodboardId: 'moodboardId'
  };

  export type ElementScalarFieldEnum = (typeof ElementScalarFieldEnum)[keyof typeof ElementScalarFieldEnum]


  export const ElementValueScalarFieldEnum: {
    elementId: 'elementId',
    attributeId: 'attributeId',
    value: 'value'
  };

  export type ElementValueScalarFieldEnum = (typeof ElementValueScalarFieldEnum)[keyof typeof ElementValueScalarFieldEnum]


  export const MoodboardScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type MoodboardScalarFieldEnum = (typeof MoodboardScalarFieldEnum)[keyof typeof MoodboardScalarFieldEnum]


  export const GalleryPinScalarFieldEnum: {
    id: 'id',
    title: 'title',
    imageUrl: 'imageUrl',
    description: 'description',
    createdAt: 'createdAt',
    authorId: 'authorId'
  };

  export type GalleryPinScalarFieldEnum = (typeof GalleryPinScalarFieldEnum)[keyof typeof GalleryPinScalarFieldEnum]


  export const GalleryPinLikeScalarFieldEnum: {
    id: 'id',
    pinId: 'pinId',
    userId: 'userId'
  };

  export type GalleryPinLikeScalarFieldEnum = (typeof GalleryPinLikeScalarFieldEnum)[keyof typeof GalleryPinLikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SegmentType'
   */
  export type EnumSegmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SegmentType'>
    


  /**
   * Reference to a field of type 'SegmentType[]'
   */
  export type ListEnumSegmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SegmentType[]'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    userName?: StringFilter<"User"> | string
    birthday?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    galleryPins?: GalleryPinListRelationFilter
    galleryPinLikes?: GalleryPinLikeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    userName?: SortOrder
    birthday?: SortOrderInput | SortOrder
    role?: SortOrder
    galleryPins?: GalleryPinOrderByRelationAggregateInput
    galleryPinLikes?: GalleryPinLikeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    userName?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    birthday?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    galleryPins?: GalleryPinListRelationFilter
    galleryPinLikes?: GalleryPinLikeListRelationFilter
  }, "id" | "email" | "userName">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    userName?: SortOrder
    birthday?: SortOrderInput | SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    userName?: StringWithAggregatesFilter<"User"> | string
    birthday?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
  }

  export type FontWhereInput = {
    AND?: FontWhereInput | FontWhereInput[]
    OR?: FontWhereInput[]
    NOT?: FontWhereInput | FontWhereInput[]
    id?: IntFilter<"Font"> | number
    name?: StringFilter<"Font"> | string
    category?: StringFilter<"Font"> | string
    url?: StringFilter<"Font"> | string
    tips?: StringNullableFilter<"Font"> | string | null
  }

  export type FontOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    url?: SortOrder
    tips?: SortOrderInput | SortOrder
  }

  export type FontWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FontWhereInput | FontWhereInput[]
    OR?: FontWhereInput[]
    NOT?: FontWhereInput | FontWhereInput[]
    name?: StringFilter<"Font"> | string
    category?: StringFilter<"Font"> | string
    url?: StringFilter<"Font"> | string
    tips?: StringNullableFilter<"Font"> | string | null
  }, "id">

  export type FontOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    url?: SortOrder
    tips?: SortOrderInput | SortOrder
    _count?: FontCountOrderByAggregateInput
    _avg?: FontAvgOrderByAggregateInput
    _max?: FontMaxOrderByAggregateInput
    _min?: FontMinOrderByAggregateInput
    _sum?: FontSumOrderByAggregateInput
  }

  export type FontScalarWhereWithAggregatesInput = {
    AND?: FontScalarWhereWithAggregatesInput | FontScalarWhereWithAggregatesInput[]
    OR?: FontScalarWhereWithAggregatesInput[]
    NOT?: FontScalarWhereWithAggregatesInput | FontScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Font"> | number
    name?: StringWithAggregatesFilter<"Font"> | string
    category?: StringWithAggregatesFilter<"Font"> | string
    url?: StringWithAggregatesFilter<"Font"> | string
    tips?: StringNullableWithAggregatesFilter<"Font"> | string | null
  }

  export type PaletteWhereInput = {
    AND?: PaletteWhereInput | PaletteWhereInput[]
    OR?: PaletteWhereInput[]
    NOT?: PaletteWhereInput | PaletteWhereInput[]
    id?: IntFilter<"Palette"> | number
    mainColor?: StringFilter<"Palette"> | string
    mixinColors?: StringNullableListFilter<"Palette">
    tags?: StringNullableListFilter<"Palette">
    description?: StringNullableFilter<"Palette"> | string | null
  }

  export type PaletteOrderByWithRelationInput = {
    id?: SortOrder
    mainColor?: SortOrder
    mixinColors?: SortOrder
    tags?: SortOrder
    description?: SortOrderInput | SortOrder
  }

  export type PaletteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaletteWhereInput | PaletteWhereInput[]
    OR?: PaletteWhereInput[]
    NOT?: PaletteWhereInput | PaletteWhereInput[]
    mainColor?: StringFilter<"Palette"> | string
    mixinColors?: StringNullableListFilter<"Palette">
    tags?: StringNullableListFilter<"Palette">
    description?: StringNullableFilter<"Palette"> | string | null
  }, "id">

  export type PaletteOrderByWithAggregationInput = {
    id?: SortOrder
    mainColor?: SortOrder
    mixinColors?: SortOrder
    tags?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: PaletteCountOrderByAggregateInput
    _avg?: PaletteAvgOrderByAggregateInput
    _max?: PaletteMaxOrderByAggregateInput
    _min?: PaletteMinOrderByAggregateInput
    _sum?: PaletteSumOrderByAggregateInput
  }

  export type PaletteScalarWhereWithAggregatesInput = {
    AND?: PaletteScalarWhereWithAggregatesInput | PaletteScalarWhereWithAggregatesInput[]
    OR?: PaletteScalarWhereWithAggregatesInput[]
    NOT?: PaletteScalarWhereWithAggregatesInput | PaletteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Palette"> | number
    mainColor?: StringWithAggregatesFilter<"Palette"> | string
    mixinColors?: StringNullableListFilter<"Palette">
    tags?: StringNullableListFilter<"Palette">
    description?: StringNullableWithAggregatesFilter<"Palette"> | string | null
  }

  export type SegmentWhereInput = {
    AND?: SegmentWhereInput | SegmentWhereInput[]
    OR?: SegmentWhereInput[]
    NOT?: SegmentWhereInput | SegmentWhereInput[]
    id?: IntFilter<"Segment"> | number
    title?: StringFilter<"Segment"> | string
    slug?: StringFilter<"Segment"> | string
    description?: StringNullableFilter<"Segment"> | string | null
    content?: StringNullableFilter<"Segment"> | string | null
    type?: EnumSegmentTypeFilter<"Segment"> | $Enums.SegmentType
    difficulty?: EnumDifficultyFilter<"Segment"> | $Enums.Difficulty
    duration?: StringNullableFilter<"Segment"> | string | null
    icon?: StringNullableFilter<"Segment"> | string | null
    color?: StringNullableFilter<"Segment"> | string | null
    tags?: StringNullableListFilter<"Segment">
    questions?: JsonNullableFilter<"Segment">
    createdAt?: DateTimeFilter<"Segment"> | Date | string
    updatedAt?: DateTimeFilter<"Segment"> | Date | string
  }

  export type SegmentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    type?: SortOrder
    difficulty?: SortOrder
    duration?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    tags?: SortOrder
    questions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SegmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: SegmentWhereInput | SegmentWhereInput[]
    OR?: SegmentWhereInput[]
    NOT?: SegmentWhereInput | SegmentWhereInput[]
    title?: StringFilter<"Segment"> | string
    description?: StringNullableFilter<"Segment"> | string | null
    content?: StringNullableFilter<"Segment"> | string | null
    type?: EnumSegmentTypeFilter<"Segment"> | $Enums.SegmentType
    difficulty?: EnumDifficultyFilter<"Segment"> | $Enums.Difficulty
    duration?: StringNullableFilter<"Segment"> | string | null
    icon?: StringNullableFilter<"Segment"> | string | null
    color?: StringNullableFilter<"Segment"> | string | null
    tags?: StringNullableListFilter<"Segment">
    questions?: JsonNullableFilter<"Segment">
    createdAt?: DateTimeFilter<"Segment"> | Date | string
    updatedAt?: DateTimeFilter<"Segment"> | Date | string
  }, "id" | "slug">

  export type SegmentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    type?: SortOrder
    difficulty?: SortOrder
    duration?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    tags?: SortOrder
    questions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SegmentCountOrderByAggregateInput
    _avg?: SegmentAvgOrderByAggregateInput
    _max?: SegmentMaxOrderByAggregateInput
    _min?: SegmentMinOrderByAggregateInput
    _sum?: SegmentSumOrderByAggregateInput
  }

  export type SegmentScalarWhereWithAggregatesInput = {
    AND?: SegmentScalarWhereWithAggregatesInput | SegmentScalarWhereWithAggregatesInput[]
    OR?: SegmentScalarWhereWithAggregatesInput[]
    NOT?: SegmentScalarWhereWithAggregatesInput | SegmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Segment"> | number
    title?: StringWithAggregatesFilter<"Segment"> | string
    slug?: StringWithAggregatesFilter<"Segment"> | string
    description?: StringNullableWithAggregatesFilter<"Segment"> | string | null
    content?: StringNullableWithAggregatesFilter<"Segment"> | string | null
    type?: EnumSegmentTypeWithAggregatesFilter<"Segment"> | $Enums.SegmentType
    difficulty?: EnumDifficultyWithAggregatesFilter<"Segment"> | $Enums.Difficulty
    duration?: StringNullableWithAggregatesFilter<"Segment"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Segment"> | string | null
    color?: StringNullableWithAggregatesFilter<"Segment"> | string | null
    tags?: StringNullableListFilter<"Segment">
    questions?: JsonNullableWithAggregatesFilter<"Segment">
    createdAt?: DateTimeWithAggregatesFilter<"Segment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Segment"> | Date | string
  }

  export type AttributeWhereInput = {
    AND?: AttributeWhereInput | AttributeWhereInput[]
    OR?: AttributeWhereInput[]
    NOT?: AttributeWhereInput | AttributeWhereInput[]
    id?: IntFilter<"Attribute"> | number
    name?: StringFilter<"Attribute"> | string
    description?: StringNullableFilter<"Attribute"> | string | null
    isActive?: BoolFilter<"Attribute"> | boolean
    elementTypes?: ElementAttributeListRelationFilter
    elementValues?: ElementValueListRelationFilter
  }

  export type AttributeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    elementTypes?: ElementAttributeOrderByRelationAggregateInput
    elementValues?: ElementValueOrderByRelationAggregateInput
  }

  export type AttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttributeWhereInput | AttributeWhereInput[]
    OR?: AttributeWhereInput[]
    NOT?: AttributeWhereInput | AttributeWhereInput[]
    name?: StringFilter<"Attribute"> | string
    description?: StringNullableFilter<"Attribute"> | string | null
    isActive?: BoolFilter<"Attribute"> | boolean
    elementTypes?: ElementAttributeListRelationFilter
    elementValues?: ElementValueListRelationFilter
  }, "id">

  export type AttributeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: AttributeCountOrderByAggregateInput
    _avg?: AttributeAvgOrderByAggregateInput
    _max?: AttributeMaxOrderByAggregateInput
    _min?: AttributeMinOrderByAggregateInput
    _sum?: AttributeSumOrderByAggregateInput
  }

  export type AttributeScalarWhereWithAggregatesInput = {
    AND?: AttributeScalarWhereWithAggregatesInput | AttributeScalarWhereWithAggregatesInput[]
    OR?: AttributeScalarWhereWithAggregatesInput[]
    NOT?: AttributeScalarWhereWithAggregatesInput | AttributeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attribute"> | number
    name?: StringWithAggregatesFilter<"Attribute"> | string
    description?: StringNullableWithAggregatesFilter<"Attribute"> | string | null
    isActive?: BoolWithAggregatesFilter<"Attribute"> | boolean
  }

  export type ElementTypeWhereInput = {
    AND?: ElementTypeWhereInput | ElementTypeWhereInput[]
    OR?: ElementTypeWhereInput[]
    NOT?: ElementTypeWhereInput | ElementTypeWhereInput[]
    id?: IntFilter<"ElementType"> | number
    name?: StringFilter<"ElementType"> | string
    description?: StringNullableFilter<"ElementType"> | string | null
    isActive?: BoolFilter<"ElementType"> | boolean
    elements?: ElementListRelationFilter
    attributes?: ElementAttributeListRelationFilter
  }

  export type ElementTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    elements?: ElementOrderByRelationAggregateInput
    attributes?: ElementAttributeOrderByRelationAggregateInput
  }

  export type ElementTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ElementTypeWhereInput | ElementTypeWhereInput[]
    OR?: ElementTypeWhereInput[]
    NOT?: ElementTypeWhereInput | ElementTypeWhereInput[]
    name?: StringFilter<"ElementType"> | string
    description?: StringNullableFilter<"ElementType"> | string | null
    isActive?: BoolFilter<"ElementType"> | boolean
    elements?: ElementListRelationFilter
    attributes?: ElementAttributeListRelationFilter
  }, "id">

  export type ElementTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: ElementTypeCountOrderByAggregateInput
    _avg?: ElementTypeAvgOrderByAggregateInput
    _max?: ElementTypeMaxOrderByAggregateInput
    _min?: ElementTypeMinOrderByAggregateInput
    _sum?: ElementTypeSumOrderByAggregateInput
  }

  export type ElementTypeScalarWhereWithAggregatesInput = {
    AND?: ElementTypeScalarWhereWithAggregatesInput | ElementTypeScalarWhereWithAggregatesInput[]
    OR?: ElementTypeScalarWhereWithAggregatesInput[]
    NOT?: ElementTypeScalarWhereWithAggregatesInput | ElementTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ElementType"> | number
    name?: StringWithAggregatesFilter<"ElementType"> | string
    description?: StringNullableWithAggregatesFilter<"ElementType"> | string | null
    isActive?: BoolWithAggregatesFilter<"ElementType"> | boolean
  }

  export type ElementAttributeWhereInput = {
    AND?: ElementAttributeWhereInput | ElementAttributeWhereInput[]
    OR?: ElementAttributeWhereInput[]
    NOT?: ElementAttributeWhereInput | ElementAttributeWhereInput[]
    elementTypeId?: IntFilter<"ElementAttribute"> | number
    attributeId?: IntFilter<"ElementAttribute"> | number
    elementType?: XOR<ElementTypeScalarRelationFilter, ElementTypeWhereInput>
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
  }

  export type ElementAttributeOrderByWithRelationInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
    elementType?: ElementTypeOrderByWithRelationInput
    attribute?: AttributeOrderByWithRelationInput
  }

  export type ElementAttributeWhereUniqueInput = Prisma.AtLeast<{
    elementTypeId_attributeId?: ElementAttributeElementTypeIdAttributeIdCompoundUniqueInput
    AND?: ElementAttributeWhereInput | ElementAttributeWhereInput[]
    OR?: ElementAttributeWhereInput[]
    NOT?: ElementAttributeWhereInput | ElementAttributeWhereInput[]
    elementTypeId?: IntFilter<"ElementAttribute"> | number
    attributeId?: IntFilter<"ElementAttribute"> | number
    elementType?: XOR<ElementTypeScalarRelationFilter, ElementTypeWhereInput>
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
  }, "elementTypeId_attributeId">

  export type ElementAttributeOrderByWithAggregationInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
    _count?: ElementAttributeCountOrderByAggregateInput
    _avg?: ElementAttributeAvgOrderByAggregateInput
    _max?: ElementAttributeMaxOrderByAggregateInput
    _min?: ElementAttributeMinOrderByAggregateInput
    _sum?: ElementAttributeSumOrderByAggregateInput
  }

  export type ElementAttributeScalarWhereWithAggregatesInput = {
    AND?: ElementAttributeScalarWhereWithAggregatesInput | ElementAttributeScalarWhereWithAggregatesInput[]
    OR?: ElementAttributeScalarWhereWithAggregatesInput[]
    NOT?: ElementAttributeScalarWhereWithAggregatesInput | ElementAttributeScalarWhereWithAggregatesInput[]
    elementTypeId?: IntWithAggregatesFilter<"ElementAttribute"> | number
    attributeId?: IntWithAggregatesFilter<"ElementAttribute"> | number
  }

  export type ElementWhereInput = {
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    id?: IntFilter<"Element"> | number
    name?: StringFilter<"Element"> | string
    coordsX?: IntFilter<"Element"> | number
    coordsY?: IntFilter<"Element"> | number
    opacity?: IntFilter<"Element"> | number
    rotation?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    width?: IntFilter<"Element"> | number
    layer?: IntFilter<"Element"> | number
    elementTypeId?: IntFilter<"Element"> | number
    moodboardId?: IntFilter<"Element"> | number
    elementType?: XOR<ElementTypeScalarRelationFilter, ElementTypeWhereInput>
    moodboard?: XOR<MoodboardScalarRelationFilter, MoodboardWhereInput>
    values?: ElementValueListRelationFilter
  }

  export type ElementOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
    elementType?: ElementTypeOrderByWithRelationInput
    moodboard?: MoodboardOrderByWithRelationInput
    values?: ElementValueOrderByRelationAggregateInput
  }

  export type ElementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    name?: StringFilter<"Element"> | string
    coordsX?: IntFilter<"Element"> | number
    coordsY?: IntFilter<"Element"> | number
    opacity?: IntFilter<"Element"> | number
    rotation?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    width?: IntFilter<"Element"> | number
    layer?: IntFilter<"Element"> | number
    elementTypeId?: IntFilter<"Element"> | number
    moodboardId?: IntFilter<"Element"> | number
    elementType?: XOR<ElementTypeScalarRelationFilter, ElementTypeWhereInput>
    moodboard?: XOR<MoodboardScalarRelationFilter, MoodboardWhereInput>
    values?: ElementValueListRelationFilter
  }, "id">

  export type ElementOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
    _count?: ElementCountOrderByAggregateInput
    _avg?: ElementAvgOrderByAggregateInput
    _max?: ElementMaxOrderByAggregateInput
    _min?: ElementMinOrderByAggregateInput
    _sum?: ElementSumOrderByAggregateInput
  }

  export type ElementScalarWhereWithAggregatesInput = {
    AND?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    OR?: ElementScalarWhereWithAggregatesInput[]
    NOT?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Element"> | number
    name?: StringWithAggregatesFilter<"Element"> | string
    coordsX?: IntWithAggregatesFilter<"Element"> | number
    coordsY?: IntWithAggregatesFilter<"Element"> | number
    opacity?: IntWithAggregatesFilter<"Element"> | number
    rotation?: IntWithAggregatesFilter<"Element"> | number
    height?: IntWithAggregatesFilter<"Element"> | number
    width?: IntWithAggregatesFilter<"Element"> | number
    layer?: IntWithAggregatesFilter<"Element"> | number
    elementTypeId?: IntWithAggregatesFilter<"Element"> | number
    moodboardId?: IntWithAggregatesFilter<"Element"> | number
  }

  export type ElementValueWhereInput = {
    AND?: ElementValueWhereInput | ElementValueWhereInput[]
    OR?: ElementValueWhereInput[]
    NOT?: ElementValueWhereInput | ElementValueWhereInput[]
    elementId?: IntFilter<"ElementValue"> | number
    attributeId?: IntFilter<"ElementValue"> | number
    value?: StringFilter<"ElementValue"> | string
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
  }

  export type ElementValueOrderByWithRelationInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
    element?: ElementOrderByWithRelationInput
    attribute?: AttributeOrderByWithRelationInput
  }

  export type ElementValueWhereUniqueInput = Prisma.AtLeast<{
    elementId_attributeId?: ElementValueElementIdAttributeIdCompoundUniqueInput
    AND?: ElementValueWhereInput | ElementValueWhereInput[]
    OR?: ElementValueWhereInput[]
    NOT?: ElementValueWhereInput | ElementValueWhereInput[]
    elementId?: IntFilter<"ElementValue"> | number
    attributeId?: IntFilter<"ElementValue"> | number
    value?: StringFilter<"ElementValue"> | string
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
  }, "elementId_attributeId">

  export type ElementValueOrderByWithAggregationInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
    _count?: ElementValueCountOrderByAggregateInput
    _avg?: ElementValueAvgOrderByAggregateInput
    _max?: ElementValueMaxOrderByAggregateInput
    _min?: ElementValueMinOrderByAggregateInput
    _sum?: ElementValueSumOrderByAggregateInput
  }

  export type ElementValueScalarWhereWithAggregatesInput = {
    AND?: ElementValueScalarWhereWithAggregatesInput | ElementValueScalarWhereWithAggregatesInput[]
    OR?: ElementValueScalarWhereWithAggregatesInput[]
    NOT?: ElementValueScalarWhereWithAggregatesInput | ElementValueScalarWhereWithAggregatesInput[]
    elementId?: IntWithAggregatesFilter<"ElementValue"> | number
    attributeId?: IntWithAggregatesFilter<"ElementValue"> | number
    value?: StringWithAggregatesFilter<"ElementValue"> | string
  }

  export type MoodboardWhereInput = {
    AND?: MoodboardWhereInput | MoodboardWhereInput[]
    OR?: MoodboardWhereInput[]
    NOT?: MoodboardWhereInput | MoodboardWhereInput[]
    id?: IntFilter<"Moodboard"> | number
    name?: StringFilter<"Moodboard"> | string
    createdAt?: DateTimeFilter<"Moodboard"> | Date | string
    userId?: StringFilter<"Moodboard"> | string
    elements?: ElementListRelationFilter
  }

  export type MoodboardOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    elements?: ElementOrderByRelationAggregateInput
  }

  export type MoodboardWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MoodboardWhereInput | MoodboardWhereInput[]
    OR?: MoodboardWhereInput[]
    NOT?: MoodboardWhereInput | MoodboardWhereInput[]
    name?: StringFilter<"Moodboard"> | string
    createdAt?: DateTimeFilter<"Moodboard"> | Date | string
    userId?: StringFilter<"Moodboard"> | string
    elements?: ElementListRelationFilter
  }, "id">

  export type MoodboardOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: MoodboardCountOrderByAggregateInput
    _avg?: MoodboardAvgOrderByAggregateInput
    _max?: MoodboardMaxOrderByAggregateInput
    _min?: MoodboardMinOrderByAggregateInput
    _sum?: MoodboardSumOrderByAggregateInput
  }

  export type MoodboardScalarWhereWithAggregatesInput = {
    AND?: MoodboardScalarWhereWithAggregatesInput | MoodboardScalarWhereWithAggregatesInput[]
    OR?: MoodboardScalarWhereWithAggregatesInput[]
    NOT?: MoodboardScalarWhereWithAggregatesInput | MoodboardScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Moodboard"> | number
    name?: StringWithAggregatesFilter<"Moodboard"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Moodboard"> | Date | string
    userId?: StringWithAggregatesFilter<"Moodboard"> | string
  }

  export type GalleryPinWhereInput = {
    AND?: GalleryPinWhereInput | GalleryPinWhereInput[]
    OR?: GalleryPinWhereInput[]
    NOT?: GalleryPinWhereInput | GalleryPinWhereInput[]
    id?: IntFilter<"GalleryPin"> | number
    title?: StringFilter<"GalleryPin"> | string
    imageUrl?: StringFilter<"GalleryPin"> | string
    description?: StringNullableFilter<"GalleryPin"> | string | null
    createdAt?: DateTimeFilter<"GalleryPin"> | Date | string
    authorId?: StringFilter<"GalleryPin"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: GalleryPinLikeListRelationFilter
  }

  export type GalleryPinOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
    likes?: GalleryPinLikeOrderByRelationAggregateInput
  }

  export type GalleryPinWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GalleryPinWhereInput | GalleryPinWhereInput[]
    OR?: GalleryPinWhereInput[]
    NOT?: GalleryPinWhereInput | GalleryPinWhereInput[]
    title?: StringFilter<"GalleryPin"> | string
    imageUrl?: StringFilter<"GalleryPin"> | string
    description?: StringNullableFilter<"GalleryPin"> | string | null
    createdAt?: DateTimeFilter<"GalleryPin"> | Date | string
    authorId?: StringFilter<"GalleryPin"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: GalleryPinLikeListRelationFilter
  }, "id">

  export type GalleryPinOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
    _count?: GalleryPinCountOrderByAggregateInput
    _avg?: GalleryPinAvgOrderByAggregateInput
    _max?: GalleryPinMaxOrderByAggregateInput
    _min?: GalleryPinMinOrderByAggregateInput
    _sum?: GalleryPinSumOrderByAggregateInput
  }

  export type GalleryPinScalarWhereWithAggregatesInput = {
    AND?: GalleryPinScalarWhereWithAggregatesInput | GalleryPinScalarWhereWithAggregatesInput[]
    OR?: GalleryPinScalarWhereWithAggregatesInput[]
    NOT?: GalleryPinScalarWhereWithAggregatesInput | GalleryPinScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GalleryPin"> | number
    title?: StringWithAggregatesFilter<"GalleryPin"> | string
    imageUrl?: StringWithAggregatesFilter<"GalleryPin"> | string
    description?: StringNullableWithAggregatesFilter<"GalleryPin"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GalleryPin"> | Date | string
    authorId?: StringWithAggregatesFilter<"GalleryPin"> | string
  }

  export type GalleryPinLikeWhereInput = {
    AND?: GalleryPinLikeWhereInput | GalleryPinLikeWhereInput[]
    OR?: GalleryPinLikeWhereInput[]
    NOT?: GalleryPinLikeWhereInput | GalleryPinLikeWhereInput[]
    id?: IntFilter<"GalleryPinLike"> | number
    pinId?: IntFilter<"GalleryPinLike"> | number
    userId?: StringFilter<"GalleryPinLike"> | string
    pin?: XOR<GalleryPinScalarRelationFilter, GalleryPinWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GalleryPinLikeOrderByWithRelationInput = {
    id?: SortOrder
    pinId?: SortOrder
    userId?: SortOrder
    pin?: GalleryPinOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GalleryPinLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pinId_userId?: GalleryPinLikePinIdUserIdCompoundUniqueInput
    AND?: GalleryPinLikeWhereInput | GalleryPinLikeWhereInput[]
    OR?: GalleryPinLikeWhereInput[]
    NOT?: GalleryPinLikeWhereInput | GalleryPinLikeWhereInput[]
    pinId?: IntFilter<"GalleryPinLike"> | number
    userId?: StringFilter<"GalleryPinLike"> | string
    pin?: XOR<GalleryPinScalarRelationFilter, GalleryPinWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "pinId_userId">

  export type GalleryPinLikeOrderByWithAggregationInput = {
    id?: SortOrder
    pinId?: SortOrder
    userId?: SortOrder
    _count?: GalleryPinLikeCountOrderByAggregateInput
    _avg?: GalleryPinLikeAvgOrderByAggregateInput
    _max?: GalleryPinLikeMaxOrderByAggregateInput
    _min?: GalleryPinLikeMinOrderByAggregateInput
    _sum?: GalleryPinLikeSumOrderByAggregateInput
  }

  export type GalleryPinLikeScalarWhereWithAggregatesInput = {
    AND?: GalleryPinLikeScalarWhereWithAggregatesInput | GalleryPinLikeScalarWhereWithAggregatesInput[]
    OR?: GalleryPinLikeScalarWhereWithAggregatesInput[]
    NOT?: GalleryPinLikeScalarWhereWithAggregatesInput | GalleryPinLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GalleryPinLike"> | number
    pinId?: IntWithAggregatesFilter<"GalleryPinLike"> | number
    userId?: StringWithAggregatesFilter<"GalleryPinLike"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
    galleryPins?: GalleryPinCreateNestedManyWithoutAuthorInput
    galleryPinLikes?: GalleryPinLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
    galleryPins?: GalleryPinUncheckedCreateNestedManyWithoutAuthorInput
    galleryPinLikes?: GalleryPinLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    galleryPins?: GalleryPinUpdateManyWithoutAuthorNestedInput
    galleryPinLikes?: GalleryPinLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    galleryPins?: GalleryPinUncheckedUpdateManyWithoutAuthorNestedInput
    galleryPinLikes?: GalleryPinLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type FontCreateInput = {
    name: string
    category: string
    url: string
    tips?: string | null
  }

  export type FontUncheckedCreateInput = {
    id?: number
    name: string
    category: string
    url: string
    tips?: string | null
  }

  export type FontUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tips?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FontUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tips?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FontCreateManyInput = {
    id?: number
    name: string
    category: string
    url: string
    tips?: string | null
  }

  export type FontUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tips?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FontUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tips?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaletteCreateInput = {
    mainColor: string
    mixinColors?: PaletteCreatemixinColorsInput | string[]
    tags?: PaletteCreatetagsInput | string[]
    description?: string | null
  }

  export type PaletteUncheckedCreateInput = {
    id?: number
    mainColor: string
    mixinColors?: PaletteCreatemixinColorsInput | string[]
    tags?: PaletteCreatetagsInput | string[]
    description?: string | null
  }

  export type PaletteUpdateInput = {
    mainColor?: StringFieldUpdateOperationsInput | string
    mixinColors?: PaletteUpdatemixinColorsInput | string[]
    tags?: PaletteUpdatetagsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaletteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mainColor?: StringFieldUpdateOperationsInput | string
    mixinColors?: PaletteUpdatemixinColorsInput | string[]
    tags?: PaletteUpdatetagsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaletteCreateManyInput = {
    id?: number
    mainColor: string
    mixinColors?: PaletteCreatemixinColorsInput | string[]
    tags?: PaletteCreatetagsInput | string[]
    description?: string | null
  }

  export type PaletteUpdateManyMutationInput = {
    mainColor?: StringFieldUpdateOperationsInput | string
    mixinColors?: PaletteUpdatemixinColorsInput | string[]
    tags?: PaletteUpdatetagsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaletteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mainColor?: StringFieldUpdateOperationsInput | string
    mixinColors?: PaletteUpdatemixinColorsInput | string[]
    tags?: PaletteUpdatetagsInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SegmentCreateInput = {
    title: string
    slug: string
    description?: string | null
    content?: string | null
    type?: $Enums.SegmentType
    difficulty?: $Enums.Difficulty
    duration?: string | null
    icon?: string | null
    color?: string | null
    tags?: SegmentCreatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SegmentUncheckedCreateInput = {
    id?: number
    title: string
    slug: string
    description?: string | null
    content?: string | null
    type?: $Enums.SegmentType
    difficulty?: $Enums.Difficulty
    duration?: string | null
    icon?: string | null
    color?: string | null
    tags?: SegmentCreatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SegmentUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumSegmentTypeFieldUpdateOperationsInput | $Enums.SegmentType
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SegmentUpdatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SegmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumSegmentTypeFieldUpdateOperationsInput | $Enums.SegmentType
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SegmentUpdatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SegmentCreateManyInput = {
    id?: number
    title: string
    slug: string
    description?: string | null
    content?: string | null
    type?: $Enums.SegmentType
    difficulty?: $Enums.Difficulty
    duration?: string | null
    icon?: string | null
    color?: string | null
    tags?: SegmentCreatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SegmentUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumSegmentTypeFieldUpdateOperationsInput | $Enums.SegmentType
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SegmentUpdatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SegmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumSegmentTypeFieldUpdateOperationsInput | $Enums.SegmentType
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SegmentUpdatetagsInput | string[]
    questions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttributeCreateInput = {
    name: string
    description?: string | null
    isActive?: boolean
    elementTypes?: ElementAttributeCreateNestedManyWithoutAttributeInput
    elementValues?: ElementValueCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    elementTypes?: ElementAttributeUncheckedCreateNestedManyWithoutAttributeInput
    elementValues?: ElementValueUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elementTypes?: ElementAttributeUpdateManyWithoutAttributeNestedInput
    elementValues?: ElementValueUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elementTypes?: ElementAttributeUncheckedUpdateManyWithoutAttributeNestedInput
    elementValues?: ElementValueUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type AttributeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AttributeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ElementTypeCreateInput = {
    name: string
    description?: string | null
    isActive?: boolean
    elements?: ElementCreateNestedManyWithoutElementTypeInput
    attributes?: ElementAttributeCreateNestedManyWithoutElementTypeInput
  }

  export type ElementTypeUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    elements?: ElementUncheckedCreateNestedManyWithoutElementTypeInput
    attributes?: ElementAttributeUncheckedCreateNestedManyWithoutElementTypeInput
  }

  export type ElementTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elements?: ElementUpdateManyWithoutElementTypeNestedInput
    attributes?: ElementAttributeUpdateManyWithoutElementTypeNestedInput
  }

  export type ElementTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elements?: ElementUncheckedUpdateManyWithoutElementTypeNestedInput
    attributes?: ElementAttributeUncheckedUpdateManyWithoutElementTypeNestedInput
  }

  export type ElementTypeCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type ElementTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ElementTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ElementAttributeCreateInput = {
    elementType: ElementTypeCreateNestedOneWithoutAttributesInput
    attribute: AttributeCreateNestedOneWithoutElementTypesInput
  }

  export type ElementAttributeUncheckedCreateInput = {
    elementTypeId: number
    attributeId: number
  }

  export type ElementAttributeUpdateInput = {
    elementType?: ElementTypeUpdateOneRequiredWithoutAttributesNestedInput
    attribute?: AttributeUpdateOneRequiredWithoutElementTypesNestedInput
  }

  export type ElementAttributeUncheckedUpdateInput = {
    elementTypeId?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementAttributeCreateManyInput = {
    elementTypeId: number
    attributeId: number
  }

  export type ElementAttributeUpdateManyMutationInput = {

  }

  export type ElementAttributeUncheckedUpdateManyInput = {
    elementTypeId?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementCreateInput = {
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementType: ElementTypeCreateNestedOneWithoutElementsInput
    moodboard: MoodboardCreateNestedOneWithoutElementsInput
    values?: ElementValueCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementTypeId: number
    moodboardId: number
    values?: ElementValueUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementType?: ElementTypeUpdateOneRequiredWithoutElementsNestedInput
    moodboard?: MoodboardUpdateOneRequiredWithoutElementsNestedInput
    values?: ElementValueUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementTypeId?: IntFieldUpdateOperationsInput | number
    moodboardId?: IntFieldUpdateOperationsInput | number
    values?: ElementValueUncheckedUpdateManyWithoutElementNestedInput
  }

  export type ElementCreateManyInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementTypeId: number
    moodboardId: number
  }

  export type ElementUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
  }

  export type ElementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementTypeId?: IntFieldUpdateOperationsInput | number
    moodboardId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementValueCreateInput = {
    value: string
    element: ElementCreateNestedOneWithoutValuesInput
    attribute: AttributeCreateNestedOneWithoutElementValuesInput
  }

  export type ElementValueUncheckedCreateInput = {
    elementId: number
    attributeId: number
    value: string
  }

  export type ElementValueUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    element?: ElementUpdateOneRequiredWithoutValuesNestedInput
    attribute?: AttributeUpdateOneRequiredWithoutElementValuesNestedInput
  }

  export type ElementValueUncheckedUpdateInput = {
    elementId?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElementValueCreateManyInput = {
    elementId: number
    attributeId: number
    value: string
  }

  export type ElementValueUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElementValueUncheckedUpdateManyInput = {
    elementId?: IntFieldUpdateOperationsInput | number
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type MoodboardCreateInput = {
    name: string
    createdAt?: Date | string
    userId: string
    elements?: ElementCreateNestedManyWithoutMoodboardInput
  }

  export type MoodboardUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    userId: string
    elements?: ElementUncheckedCreateNestedManyWithoutMoodboardInput
  }

  export type MoodboardUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    elements?: ElementUpdateManyWithoutMoodboardNestedInput
  }

  export type MoodboardUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    elements?: ElementUncheckedUpdateManyWithoutMoodboardNestedInput
  }

  export type MoodboardCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    userId: string
  }

  export type MoodboardUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MoodboardUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type GalleryPinCreateInput = {
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutGalleryPinsInput
    likes?: GalleryPinLikeCreateNestedManyWithoutPinInput
  }

  export type GalleryPinUncheckedCreateInput = {
    id?: number
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    authorId: string
    likes?: GalleryPinLikeUncheckedCreateNestedManyWithoutPinInput
  }

  export type GalleryPinUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutGalleryPinsNestedInput
    likes?: GalleryPinLikeUpdateManyWithoutPinNestedInput
  }

  export type GalleryPinUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    likes?: GalleryPinLikeUncheckedUpdateManyWithoutPinNestedInput
  }

  export type GalleryPinCreateManyInput = {
    id?: number
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    authorId: string
  }

  export type GalleryPinUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryPinUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type GalleryPinLikeCreateInput = {
    pin: GalleryPinCreateNestedOneWithoutLikesInput
    user: UserCreateNestedOneWithoutGalleryPinLikesInput
  }

  export type GalleryPinLikeUncheckedCreateInput = {
    id?: number
    pinId: number
    userId: string
  }

  export type GalleryPinLikeUpdateInput = {
    pin?: GalleryPinUpdateOneRequiredWithoutLikesNestedInput
    user?: UserUpdateOneRequiredWithoutGalleryPinLikesNestedInput
  }

  export type GalleryPinLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pinId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type GalleryPinLikeCreateManyInput = {
    id?: number
    pinId: number
    userId: string
  }

  export type GalleryPinLikeUpdateManyMutationInput = {

  }

  export type GalleryPinLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pinId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type GalleryPinListRelationFilter = {
    every?: GalleryPinWhereInput
    some?: GalleryPinWhereInput
    none?: GalleryPinWhereInput
  }

  export type GalleryPinLikeListRelationFilter = {
    every?: GalleryPinLikeWhereInput
    some?: GalleryPinLikeWhereInput
    none?: GalleryPinLikeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GalleryPinOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GalleryPinLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    userName?: SortOrder
    birthday?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    userName?: SortOrder
    birthday?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    userName?: SortOrder
    birthday?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FontCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    url?: SortOrder
    tips?: SortOrder
  }

  export type FontAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FontMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    url?: SortOrder
    tips?: SortOrder
  }

  export type FontMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    url?: SortOrder
    tips?: SortOrder
  }

  export type FontSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PaletteCountOrderByAggregateInput = {
    id?: SortOrder
    mainColor?: SortOrder
    mixinColors?: SortOrder
    tags?: SortOrder
    description?: SortOrder
  }

  export type PaletteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PaletteMaxOrderByAggregateInput = {
    id?: SortOrder
    mainColor?: SortOrder
    description?: SortOrder
  }

  export type PaletteMinOrderByAggregateInput = {
    id?: SortOrder
    mainColor?: SortOrder
    description?: SortOrder
  }

  export type PaletteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumSegmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SegmentType | EnumSegmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSegmentTypeFilter<$PrismaModel> | $Enums.SegmentType
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SegmentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    type?: SortOrder
    difficulty?: SortOrder
    duration?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    tags?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SegmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SegmentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    type?: SortOrder
    difficulty?: SortOrder
    duration?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SegmentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    type?: SortOrder
    difficulty?: SortOrder
    duration?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SegmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumSegmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SegmentType | EnumSegmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSegmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.SegmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSegmentTypeFilter<$PrismaModel>
    _max?: NestedEnumSegmentTypeFilter<$PrismaModel>
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ElementAttributeListRelationFilter = {
    every?: ElementAttributeWhereInput
    some?: ElementAttributeWhereInput
    none?: ElementAttributeWhereInput
  }

  export type ElementValueListRelationFilter = {
    every?: ElementValueWhereInput
    some?: ElementValueWhereInput
    none?: ElementValueWhereInput
  }

  export type ElementAttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElementValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttributeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type AttributeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type AttributeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type AttributeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ElementListRelationFilter = {
    every?: ElementWhereInput
    some?: ElementWhereInput
    none?: ElementWhereInput
  }

  export type ElementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElementTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type ElementTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ElementTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type ElementTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type ElementTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ElementTypeScalarRelationFilter = {
    is?: ElementTypeWhereInput
    isNot?: ElementTypeWhereInput
  }

  export type AttributeScalarRelationFilter = {
    is?: AttributeWhereInput
    isNot?: AttributeWhereInput
  }

  export type ElementAttributeElementTypeIdAttributeIdCompoundUniqueInput = {
    elementTypeId: number
    attributeId: number
  }

  export type ElementAttributeCountOrderByAggregateInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
  }

  export type ElementAttributeAvgOrderByAggregateInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
  }

  export type ElementAttributeMaxOrderByAggregateInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
  }

  export type ElementAttributeMinOrderByAggregateInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
  }

  export type ElementAttributeSumOrderByAggregateInput = {
    elementTypeId?: SortOrder
    attributeId?: SortOrder
  }

  export type MoodboardScalarRelationFilter = {
    is?: MoodboardWhereInput
    isNot?: MoodboardWhereInput
  }

  export type ElementCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
  }

  export type ElementAvgOrderByAggregateInput = {
    id?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
  }

  export type ElementMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
  }

  export type ElementMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
  }

  export type ElementSumOrderByAggregateInput = {
    id?: SortOrder
    coordsX?: SortOrder
    coordsY?: SortOrder
    opacity?: SortOrder
    rotation?: SortOrder
    height?: SortOrder
    width?: SortOrder
    layer?: SortOrder
    elementTypeId?: SortOrder
    moodboardId?: SortOrder
  }

  export type ElementScalarRelationFilter = {
    is?: ElementWhereInput
    isNot?: ElementWhereInput
  }

  export type ElementValueElementIdAttributeIdCompoundUniqueInput = {
    elementId: number
    attributeId: number
  }

  export type ElementValueCountOrderByAggregateInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ElementValueAvgOrderByAggregateInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
  }

  export type ElementValueMaxOrderByAggregateInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ElementValueMinOrderByAggregateInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ElementValueSumOrderByAggregateInput = {
    elementId?: SortOrder
    attributeId?: SortOrder
  }

  export type MoodboardCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type MoodboardAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MoodboardMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type MoodboardMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type MoodboardSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GalleryPinCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
  }

  export type GalleryPinAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GalleryPinMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
  }

  export type GalleryPinMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
  }

  export type GalleryPinSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GalleryPinScalarRelationFilter = {
    is?: GalleryPinWhereInput
    isNot?: GalleryPinWhereInput
  }

  export type GalleryPinLikePinIdUserIdCompoundUniqueInput = {
    pinId: number
    userId: string
  }

  export type GalleryPinLikeCountOrderByAggregateInput = {
    id?: SortOrder
    pinId?: SortOrder
    userId?: SortOrder
  }

  export type GalleryPinLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    pinId?: SortOrder
  }

  export type GalleryPinLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    pinId?: SortOrder
    userId?: SortOrder
  }

  export type GalleryPinLikeMinOrderByAggregateInput = {
    id?: SortOrder
    pinId?: SortOrder
    userId?: SortOrder
  }

  export type GalleryPinLikeSumOrderByAggregateInput = {
    id?: SortOrder
    pinId?: SortOrder
  }

  export type GalleryPinCreateNestedManyWithoutAuthorInput = {
    create?: XOR<GalleryPinCreateWithoutAuthorInput, GalleryPinUncheckedCreateWithoutAuthorInput> | GalleryPinCreateWithoutAuthorInput[] | GalleryPinUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: GalleryPinCreateOrConnectWithoutAuthorInput | GalleryPinCreateOrConnectWithoutAuthorInput[]
    createMany?: GalleryPinCreateManyAuthorInputEnvelope
    connect?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
  }

  export type GalleryPinLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<GalleryPinLikeCreateWithoutUserInput, GalleryPinLikeUncheckedCreateWithoutUserInput> | GalleryPinLikeCreateWithoutUserInput[] | GalleryPinLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutUserInput | GalleryPinLikeCreateOrConnectWithoutUserInput[]
    createMany?: GalleryPinLikeCreateManyUserInputEnvelope
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
  }

  export type GalleryPinUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<GalleryPinCreateWithoutAuthorInput, GalleryPinUncheckedCreateWithoutAuthorInput> | GalleryPinCreateWithoutAuthorInput[] | GalleryPinUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: GalleryPinCreateOrConnectWithoutAuthorInput | GalleryPinCreateOrConnectWithoutAuthorInput[]
    createMany?: GalleryPinCreateManyAuthorInputEnvelope
    connect?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
  }

  export type GalleryPinLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GalleryPinLikeCreateWithoutUserInput, GalleryPinLikeUncheckedCreateWithoutUserInput> | GalleryPinLikeCreateWithoutUserInput[] | GalleryPinLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutUserInput | GalleryPinLikeCreateOrConnectWithoutUserInput[]
    createMany?: GalleryPinLikeCreateManyUserInputEnvelope
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type GalleryPinUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<GalleryPinCreateWithoutAuthorInput, GalleryPinUncheckedCreateWithoutAuthorInput> | GalleryPinCreateWithoutAuthorInput[] | GalleryPinUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: GalleryPinCreateOrConnectWithoutAuthorInput | GalleryPinCreateOrConnectWithoutAuthorInput[]
    upsert?: GalleryPinUpsertWithWhereUniqueWithoutAuthorInput | GalleryPinUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: GalleryPinCreateManyAuthorInputEnvelope
    set?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    disconnect?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    delete?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    connect?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    update?: GalleryPinUpdateWithWhereUniqueWithoutAuthorInput | GalleryPinUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: GalleryPinUpdateManyWithWhereWithoutAuthorInput | GalleryPinUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: GalleryPinScalarWhereInput | GalleryPinScalarWhereInput[]
  }

  export type GalleryPinLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<GalleryPinLikeCreateWithoutUserInput, GalleryPinLikeUncheckedCreateWithoutUserInput> | GalleryPinLikeCreateWithoutUserInput[] | GalleryPinLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutUserInput | GalleryPinLikeCreateOrConnectWithoutUserInput[]
    upsert?: GalleryPinLikeUpsertWithWhereUniqueWithoutUserInput | GalleryPinLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GalleryPinLikeCreateManyUserInputEnvelope
    set?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    disconnect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    delete?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    update?: GalleryPinLikeUpdateWithWhereUniqueWithoutUserInput | GalleryPinLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GalleryPinLikeUpdateManyWithWhereWithoutUserInput | GalleryPinLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GalleryPinLikeScalarWhereInput | GalleryPinLikeScalarWhereInput[]
  }

  export type GalleryPinUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<GalleryPinCreateWithoutAuthorInput, GalleryPinUncheckedCreateWithoutAuthorInput> | GalleryPinCreateWithoutAuthorInput[] | GalleryPinUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: GalleryPinCreateOrConnectWithoutAuthorInput | GalleryPinCreateOrConnectWithoutAuthorInput[]
    upsert?: GalleryPinUpsertWithWhereUniqueWithoutAuthorInput | GalleryPinUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: GalleryPinCreateManyAuthorInputEnvelope
    set?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    disconnect?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    delete?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    connect?: GalleryPinWhereUniqueInput | GalleryPinWhereUniqueInput[]
    update?: GalleryPinUpdateWithWhereUniqueWithoutAuthorInput | GalleryPinUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: GalleryPinUpdateManyWithWhereWithoutAuthorInput | GalleryPinUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: GalleryPinScalarWhereInput | GalleryPinScalarWhereInput[]
  }

  export type GalleryPinLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GalleryPinLikeCreateWithoutUserInput, GalleryPinLikeUncheckedCreateWithoutUserInput> | GalleryPinLikeCreateWithoutUserInput[] | GalleryPinLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutUserInput | GalleryPinLikeCreateOrConnectWithoutUserInput[]
    upsert?: GalleryPinLikeUpsertWithWhereUniqueWithoutUserInput | GalleryPinLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GalleryPinLikeCreateManyUserInputEnvelope
    set?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    disconnect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    delete?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    update?: GalleryPinLikeUpdateWithWhereUniqueWithoutUserInput | GalleryPinLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GalleryPinLikeUpdateManyWithWhereWithoutUserInput | GalleryPinLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GalleryPinLikeScalarWhereInput | GalleryPinLikeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PaletteCreatemixinColorsInput = {
    set: string[]
  }

  export type PaletteCreatetagsInput = {
    set: string[]
  }

  export type PaletteUpdatemixinColorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PaletteUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SegmentCreatetagsInput = {
    set: string[]
  }

  export type EnumSegmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.SegmentType
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type SegmentUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ElementAttributeCreateNestedManyWithoutAttributeInput = {
    create?: XOR<ElementAttributeCreateWithoutAttributeInput, ElementAttributeUncheckedCreateWithoutAttributeInput> | ElementAttributeCreateWithoutAttributeInput[] | ElementAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutAttributeInput | ElementAttributeCreateOrConnectWithoutAttributeInput[]
    createMany?: ElementAttributeCreateManyAttributeInputEnvelope
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
  }

  export type ElementValueCreateNestedManyWithoutAttributeInput = {
    create?: XOR<ElementValueCreateWithoutAttributeInput, ElementValueUncheckedCreateWithoutAttributeInput> | ElementValueCreateWithoutAttributeInput[] | ElementValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutAttributeInput | ElementValueCreateOrConnectWithoutAttributeInput[]
    createMany?: ElementValueCreateManyAttributeInputEnvelope
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
  }

  export type ElementAttributeUncheckedCreateNestedManyWithoutAttributeInput = {
    create?: XOR<ElementAttributeCreateWithoutAttributeInput, ElementAttributeUncheckedCreateWithoutAttributeInput> | ElementAttributeCreateWithoutAttributeInput[] | ElementAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutAttributeInput | ElementAttributeCreateOrConnectWithoutAttributeInput[]
    createMany?: ElementAttributeCreateManyAttributeInputEnvelope
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
  }

  export type ElementValueUncheckedCreateNestedManyWithoutAttributeInput = {
    create?: XOR<ElementValueCreateWithoutAttributeInput, ElementValueUncheckedCreateWithoutAttributeInput> | ElementValueCreateWithoutAttributeInput[] | ElementValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutAttributeInput | ElementValueCreateOrConnectWithoutAttributeInput[]
    createMany?: ElementValueCreateManyAttributeInputEnvelope
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ElementAttributeUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<ElementAttributeCreateWithoutAttributeInput, ElementAttributeUncheckedCreateWithoutAttributeInput> | ElementAttributeCreateWithoutAttributeInput[] | ElementAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutAttributeInput | ElementAttributeCreateOrConnectWithoutAttributeInput[]
    upsert?: ElementAttributeUpsertWithWhereUniqueWithoutAttributeInput | ElementAttributeUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: ElementAttributeCreateManyAttributeInputEnvelope
    set?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    disconnect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    delete?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    update?: ElementAttributeUpdateWithWhereUniqueWithoutAttributeInput | ElementAttributeUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: ElementAttributeUpdateManyWithWhereWithoutAttributeInput | ElementAttributeUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: ElementAttributeScalarWhereInput | ElementAttributeScalarWhereInput[]
  }

  export type ElementValueUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<ElementValueCreateWithoutAttributeInput, ElementValueUncheckedCreateWithoutAttributeInput> | ElementValueCreateWithoutAttributeInput[] | ElementValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutAttributeInput | ElementValueCreateOrConnectWithoutAttributeInput[]
    upsert?: ElementValueUpsertWithWhereUniqueWithoutAttributeInput | ElementValueUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: ElementValueCreateManyAttributeInputEnvelope
    set?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    disconnect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    delete?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    update?: ElementValueUpdateWithWhereUniqueWithoutAttributeInput | ElementValueUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: ElementValueUpdateManyWithWhereWithoutAttributeInput | ElementValueUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: ElementValueScalarWhereInput | ElementValueScalarWhereInput[]
  }

  export type ElementAttributeUncheckedUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<ElementAttributeCreateWithoutAttributeInput, ElementAttributeUncheckedCreateWithoutAttributeInput> | ElementAttributeCreateWithoutAttributeInput[] | ElementAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutAttributeInput | ElementAttributeCreateOrConnectWithoutAttributeInput[]
    upsert?: ElementAttributeUpsertWithWhereUniqueWithoutAttributeInput | ElementAttributeUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: ElementAttributeCreateManyAttributeInputEnvelope
    set?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    disconnect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    delete?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    update?: ElementAttributeUpdateWithWhereUniqueWithoutAttributeInput | ElementAttributeUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: ElementAttributeUpdateManyWithWhereWithoutAttributeInput | ElementAttributeUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: ElementAttributeScalarWhereInput | ElementAttributeScalarWhereInput[]
  }

  export type ElementValueUncheckedUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<ElementValueCreateWithoutAttributeInput, ElementValueUncheckedCreateWithoutAttributeInput> | ElementValueCreateWithoutAttributeInput[] | ElementValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutAttributeInput | ElementValueCreateOrConnectWithoutAttributeInput[]
    upsert?: ElementValueUpsertWithWhereUniqueWithoutAttributeInput | ElementValueUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: ElementValueCreateManyAttributeInputEnvelope
    set?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    disconnect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    delete?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    update?: ElementValueUpdateWithWhereUniqueWithoutAttributeInput | ElementValueUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: ElementValueUpdateManyWithWhereWithoutAttributeInput | ElementValueUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: ElementValueScalarWhereInput | ElementValueScalarWhereInput[]
  }

  export type ElementCreateNestedManyWithoutElementTypeInput = {
    create?: XOR<ElementCreateWithoutElementTypeInput, ElementUncheckedCreateWithoutElementTypeInput> | ElementCreateWithoutElementTypeInput[] | ElementUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutElementTypeInput | ElementCreateOrConnectWithoutElementTypeInput[]
    createMany?: ElementCreateManyElementTypeInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type ElementAttributeCreateNestedManyWithoutElementTypeInput = {
    create?: XOR<ElementAttributeCreateWithoutElementTypeInput, ElementAttributeUncheckedCreateWithoutElementTypeInput> | ElementAttributeCreateWithoutElementTypeInput[] | ElementAttributeUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutElementTypeInput | ElementAttributeCreateOrConnectWithoutElementTypeInput[]
    createMany?: ElementAttributeCreateManyElementTypeInputEnvelope
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
  }

  export type ElementUncheckedCreateNestedManyWithoutElementTypeInput = {
    create?: XOR<ElementCreateWithoutElementTypeInput, ElementUncheckedCreateWithoutElementTypeInput> | ElementCreateWithoutElementTypeInput[] | ElementUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutElementTypeInput | ElementCreateOrConnectWithoutElementTypeInput[]
    createMany?: ElementCreateManyElementTypeInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type ElementAttributeUncheckedCreateNestedManyWithoutElementTypeInput = {
    create?: XOR<ElementAttributeCreateWithoutElementTypeInput, ElementAttributeUncheckedCreateWithoutElementTypeInput> | ElementAttributeCreateWithoutElementTypeInput[] | ElementAttributeUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutElementTypeInput | ElementAttributeCreateOrConnectWithoutElementTypeInput[]
    createMany?: ElementAttributeCreateManyElementTypeInputEnvelope
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
  }

  export type ElementUpdateManyWithoutElementTypeNestedInput = {
    create?: XOR<ElementCreateWithoutElementTypeInput, ElementUncheckedCreateWithoutElementTypeInput> | ElementCreateWithoutElementTypeInput[] | ElementUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutElementTypeInput | ElementCreateOrConnectWithoutElementTypeInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutElementTypeInput | ElementUpsertWithWhereUniqueWithoutElementTypeInput[]
    createMany?: ElementCreateManyElementTypeInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutElementTypeInput | ElementUpdateWithWhereUniqueWithoutElementTypeInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutElementTypeInput | ElementUpdateManyWithWhereWithoutElementTypeInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type ElementAttributeUpdateManyWithoutElementTypeNestedInput = {
    create?: XOR<ElementAttributeCreateWithoutElementTypeInput, ElementAttributeUncheckedCreateWithoutElementTypeInput> | ElementAttributeCreateWithoutElementTypeInput[] | ElementAttributeUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutElementTypeInput | ElementAttributeCreateOrConnectWithoutElementTypeInput[]
    upsert?: ElementAttributeUpsertWithWhereUniqueWithoutElementTypeInput | ElementAttributeUpsertWithWhereUniqueWithoutElementTypeInput[]
    createMany?: ElementAttributeCreateManyElementTypeInputEnvelope
    set?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    disconnect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    delete?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    update?: ElementAttributeUpdateWithWhereUniqueWithoutElementTypeInput | ElementAttributeUpdateWithWhereUniqueWithoutElementTypeInput[]
    updateMany?: ElementAttributeUpdateManyWithWhereWithoutElementTypeInput | ElementAttributeUpdateManyWithWhereWithoutElementTypeInput[]
    deleteMany?: ElementAttributeScalarWhereInput | ElementAttributeScalarWhereInput[]
  }

  export type ElementUncheckedUpdateManyWithoutElementTypeNestedInput = {
    create?: XOR<ElementCreateWithoutElementTypeInput, ElementUncheckedCreateWithoutElementTypeInput> | ElementCreateWithoutElementTypeInput[] | ElementUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutElementTypeInput | ElementCreateOrConnectWithoutElementTypeInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutElementTypeInput | ElementUpsertWithWhereUniqueWithoutElementTypeInput[]
    createMany?: ElementCreateManyElementTypeInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutElementTypeInput | ElementUpdateWithWhereUniqueWithoutElementTypeInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutElementTypeInput | ElementUpdateManyWithWhereWithoutElementTypeInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type ElementAttributeUncheckedUpdateManyWithoutElementTypeNestedInput = {
    create?: XOR<ElementAttributeCreateWithoutElementTypeInput, ElementAttributeUncheckedCreateWithoutElementTypeInput> | ElementAttributeCreateWithoutElementTypeInput[] | ElementAttributeUncheckedCreateWithoutElementTypeInput[]
    connectOrCreate?: ElementAttributeCreateOrConnectWithoutElementTypeInput | ElementAttributeCreateOrConnectWithoutElementTypeInput[]
    upsert?: ElementAttributeUpsertWithWhereUniqueWithoutElementTypeInput | ElementAttributeUpsertWithWhereUniqueWithoutElementTypeInput[]
    createMany?: ElementAttributeCreateManyElementTypeInputEnvelope
    set?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    disconnect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    delete?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    connect?: ElementAttributeWhereUniqueInput | ElementAttributeWhereUniqueInput[]
    update?: ElementAttributeUpdateWithWhereUniqueWithoutElementTypeInput | ElementAttributeUpdateWithWhereUniqueWithoutElementTypeInput[]
    updateMany?: ElementAttributeUpdateManyWithWhereWithoutElementTypeInput | ElementAttributeUpdateManyWithWhereWithoutElementTypeInput[]
    deleteMany?: ElementAttributeScalarWhereInput | ElementAttributeScalarWhereInput[]
  }

  export type ElementTypeCreateNestedOneWithoutAttributesInput = {
    create?: XOR<ElementTypeCreateWithoutAttributesInput, ElementTypeUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ElementTypeCreateOrConnectWithoutAttributesInput
    connect?: ElementTypeWhereUniqueInput
  }

  export type AttributeCreateNestedOneWithoutElementTypesInput = {
    create?: XOR<AttributeCreateWithoutElementTypesInput, AttributeUncheckedCreateWithoutElementTypesInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutElementTypesInput
    connect?: AttributeWhereUniqueInput
  }

  export type ElementTypeUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<ElementTypeCreateWithoutAttributesInput, ElementTypeUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ElementTypeCreateOrConnectWithoutAttributesInput
    upsert?: ElementTypeUpsertWithoutAttributesInput
    connect?: ElementTypeWhereUniqueInput
    update?: XOR<XOR<ElementTypeUpdateToOneWithWhereWithoutAttributesInput, ElementTypeUpdateWithoutAttributesInput>, ElementTypeUncheckedUpdateWithoutAttributesInput>
  }

  export type AttributeUpdateOneRequiredWithoutElementTypesNestedInput = {
    create?: XOR<AttributeCreateWithoutElementTypesInput, AttributeUncheckedCreateWithoutElementTypesInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutElementTypesInput
    upsert?: AttributeUpsertWithoutElementTypesInput
    connect?: AttributeWhereUniqueInput
    update?: XOR<XOR<AttributeUpdateToOneWithWhereWithoutElementTypesInput, AttributeUpdateWithoutElementTypesInput>, AttributeUncheckedUpdateWithoutElementTypesInput>
  }

  export type ElementTypeCreateNestedOneWithoutElementsInput = {
    create?: XOR<ElementTypeCreateWithoutElementsInput, ElementTypeUncheckedCreateWithoutElementsInput>
    connectOrCreate?: ElementTypeCreateOrConnectWithoutElementsInput
    connect?: ElementTypeWhereUniqueInput
  }

  export type MoodboardCreateNestedOneWithoutElementsInput = {
    create?: XOR<MoodboardCreateWithoutElementsInput, MoodboardUncheckedCreateWithoutElementsInput>
    connectOrCreate?: MoodboardCreateOrConnectWithoutElementsInput
    connect?: MoodboardWhereUniqueInput
  }

  export type ElementValueCreateNestedManyWithoutElementInput = {
    create?: XOR<ElementValueCreateWithoutElementInput, ElementValueUncheckedCreateWithoutElementInput> | ElementValueCreateWithoutElementInput[] | ElementValueUncheckedCreateWithoutElementInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutElementInput | ElementValueCreateOrConnectWithoutElementInput[]
    createMany?: ElementValueCreateManyElementInputEnvelope
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
  }

  export type ElementValueUncheckedCreateNestedManyWithoutElementInput = {
    create?: XOR<ElementValueCreateWithoutElementInput, ElementValueUncheckedCreateWithoutElementInput> | ElementValueCreateWithoutElementInput[] | ElementValueUncheckedCreateWithoutElementInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutElementInput | ElementValueCreateOrConnectWithoutElementInput[]
    createMany?: ElementValueCreateManyElementInputEnvelope
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
  }

  export type ElementTypeUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<ElementTypeCreateWithoutElementsInput, ElementTypeUncheckedCreateWithoutElementsInput>
    connectOrCreate?: ElementTypeCreateOrConnectWithoutElementsInput
    upsert?: ElementTypeUpsertWithoutElementsInput
    connect?: ElementTypeWhereUniqueInput
    update?: XOR<XOR<ElementTypeUpdateToOneWithWhereWithoutElementsInput, ElementTypeUpdateWithoutElementsInput>, ElementTypeUncheckedUpdateWithoutElementsInput>
  }

  export type MoodboardUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<MoodboardCreateWithoutElementsInput, MoodboardUncheckedCreateWithoutElementsInput>
    connectOrCreate?: MoodboardCreateOrConnectWithoutElementsInput
    upsert?: MoodboardUpsertWithoutElementsInput
    connect?: MoodboardWhereUniqueInput
    update?: XOR<XOR<MoodboardUpdateToOneWithWhereWithoutElementsInput, MoodboardUpdateWithoutElementsInput>, MoodboardUncheckedUpdateWithoutElementsInput>
  }

  export type ElementValueUpdateManyWithoutElementNestedInput = {
    create?: XOR<ElementValueCreateWithoutElementInput, ElementValueUncheckedCreateWithoutElementInput> | ElementValueCreateWithoutElementInput[] | ElementValueUncheckedCreateWithoutElementInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutElementInput | ElementValueCreateOrConnectWithoutElementInput[]
    upsert?: ElementValueUpsertWithWhereUniqueWithoutElementInput | ElementValueUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: ElementValueCreateManyElementInputEnvelope
    set?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    disconnect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    delete?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    update?: ElementValueUpdateWithWhereUniqueWithoutElementInput | ElementValueUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: ElementValueUpdateManyWithWhereWithoutElementInput | ElementValueUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: ElementValueScalarWhereInput | ElementValueScalarWhereInput[]
  }

  export type ElementValueUncheckedUpdateManyWithoutElementNestedInput = {
    create?: XOR<ElementValueCreateWithoutElementInput, ElementValueUncheckedCreateWithoutElementInput> | ElementValueCreateWithoutElementInput[] | ElementValueUncheckedCreateWithoutElementInput[]
    connectOrCreate?: ElementValueCreateOrConnectWithoutElementInput | ElementValueCreateOrConnectWithoutElementInput[]
    upsert?: ElementValueUpsertWithWhereUniqueWithoutElementInput | ElementValueUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: ElementValueCreateManyElementInputEnvelope
    set?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    disconnect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    delete?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    connect?: ElementValueWhereUniqueInput | ElementValueWhereUniqueInput[]
    update?: ElementValueUpdateWithWhereUniqueWithoutElementInput | ElementValueUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: ElementValueUpdateManyWithWhereWithoutElementInput | ElementValueUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: ElementValueScalarWhereInput | ElementValueScalarWhereInput[]
  }

  export type ElementCreateNestedOneWithoutValuesInput = {
    create?: XOR<ElementCreateWithoutValuesInput, ElementUncheckedCreateWithoutValuesInput>
    connectOrCreate?: ElementCreateOrConnectWithoutValuesInput
    connect?: ElementWhereUniqueInput
  }

  export type AttributeCreateNestedOneWithoutElementValuesInput = {
    create?: XOR<AttributeCreateWithoutElementValuesInput, AttributeUncheckedCreateWithoutElementValuesInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutElementValuesInput
    connect?: AttributeWhereUniqueInput
  }

  export type ElementUpdateOneRequiredWithoutValuesNestedInput = {
    create?: XOR<ElementCreateWithoutValuesInput, ElementUncheckedCreateWithoutValuesInput>
    connectOrCreate?: ElementCreateOrConnectWithoutValuesInput
    upsert?: ElementUpsertWithoutValuesInput
    connect?: ElementWhereUniqueInput
    update?: XOR<XOR<ElementUpdateToOneWithWhereWithoutValuesInput, ElementUpdateWithoutValuesInput>, ElementUncheckedUpdateWithoutValuesInput>
  }

  export type AttributeUpdateOneRequiredWithoutElementValuesNestedInput = {
    create?: XOR<AttributeCreateWithoutElementValuesInput, AttributeUncheckedCreateWithoutElementValuesInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutElementValuesInput
    upsert?: AttributeUpsertWithoutElementValuesInput
    connect?: AttributeWhereUniqueInput
    update?: XOR<XOR<AttributeUpdateToOneWithWhereWithoutElementValuesInput, AttributeUpdateWithoutElementValuesInput>, AttributeUncheckedUpdateWithoutElementValuesInput>
  }

  export type ElementCreateNestedManyWithoutMoodboardInput = {
    create?: XOR<ElementCreateWithoutMoodboardInput, ElementUncheckedCreateWithoutMoodboardInput> | ElementCreateWithoutMoodboardInput[] | ElementUncheckedCreateWithoutMoodboardInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutMoodboardInput | ElementCreateOrConnectWithoutMoodboardInput[]
    createMany?: ElementCreateManyMoodboardInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type ElementUncheckedCreateNestedManyWithoutMoodboardInput = {
    create?: XOR<ElementCreateWithoutMoodboardInput, ElementUncheckedCreateWithoutMoodboardInput> | ElementCreateWithoutMoodboardInput[] | ElementUncheckedCreateWithoutMoodboardInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutMoodboardInput | ElementCreateOrConnectWithoutMoodboardInput[]
    createMany?: ElementCreateManyMoodboardInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type ElementUpdateManyWithoutMoodboardNestedInput = {
    create?: XOR<ElementCreateWithoutMoodboardInput, ElementUncheckedCreateWithoutMoodboardInput> | ElementCreateWithoutMoodboardInput[] | ElementUncheckedCreateWithoutMoodboardInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutMoodboardInput | ElementCreateOrConnectWithoutMoodboardInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutMoodboardInput | ElementUpsertWithWhereUniqueWithoutMoodboardInput[]
    createMany?: ElementCreateManyMoodboardInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutMoodboardInput | ElementUpdateWithWhereUniqueWithoutMoodboardInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutMoodboardInput | ElementUpdateManyWithWhereWithoutMoodboardInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type ElementUncheckedUpdateManyWithoutMoodboardNestedInput = {
    create?: XOR<ElementCreateWithoutMoodboardInput, ElementUncheckedCreateWithoutMoodboardInput> | ElementCreateWithoutMoodboardInput[] | ElementUncheckedCreateWithoutMoodboardInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutMoodboardInput | ElementCreateOrConnectWithoutMoodboardInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutMoodboardInput | ElementUpsertWithWhereUniqueWithoutMoodboardInput[]
    createMany?: ElementCreateManyMoodboardInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutMoodboardInput | ElementUpdateWithWhereUniqueWithoutMoodboardInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutMoodboardInput | ElementUpdateManyWithWhereWithoutMoodboardInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGalleryPinsInput = {
    create?: XOR<UserCreateWithoutGalleryPinsInput, UserUncheckedCreateWithoutGalleryPinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGalleryPinsInput
    connect?: UserWhereUniqueInput
  }

  export type GalleryPinLikeCreateNestedManyWithoutPinInput = {
    create?: XOR<GalleryPinLikeCreateWithoutPinInput, GalleryPinLikeUncheckedCreateWithoutPinInput> | GalleryPinLikeCreateWithoutPinInput[] | GalleryPinLikeUncheckedCreateWithoutPinInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutPinInput | GalleryPinLikeCreateOrConnectWithoutPinInput[]
    createMany?: GalleryPinLikeCreateManyPinInputEnvelope
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
  }

  export type GalleryPinLikeUncheckedCreateNestedManyWithoutPinInput = {
    create?: XOR<GalleryPinLikeCreateWithoutPinInput, GalleryPinLikeUncheckedCreateWithoutPinInput> | GalleryPinLikeCreateWithoutPinInput[] | GalleryPinLikeUncheckedCreateWithoutPinInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutPinInput | GalleryPinLikeCreateOrConnectWithoutPinInput[]
    createMany?: GalleryPinLikeCreateManyPinInputEnvelope
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutGalleryPinsNestedInput = {
    create?: XOR<UserCreateWithoutGalleryPinsInput, UserUncheckedCreateWithoutGalleryPinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGalleryPinsInput
    upsert?: UserUpsertWithoutGalleryPinsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGalleryPinsInput, UserUpdateWithoutGalleryPinsInput>, UserUncheckedUpdateWithoutGalleryPinsInput>
  }

  export type GalleryPinLikeUpdateManyWithoutPinNestedInput = {
    create?: XOR<GalleryPinLikeCreateWithoutPinInput, GalleryPinLikeUncheckedCreateWithoutPinInput> | GalleryPinLikeCreateWithoutPinInput[] | GalleryPinLikeUncheckedCreateWithoutPinInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutPinInput | GalleryPinLikeCreateOrConnectWithoutPinInput[]
    upsert?: GalleryPinLikeUpsertWithWhereUniqueWithoutPinInput | GalleryPinLikeUpsertWithWhereUniqueWithoutPinInput[]
    createMany?: GalleryPinLikeCreateManyPinInputEnvelope
    set?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    disconnect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    delete?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    update?: GalleryPinLikeUpdateWithWhereUniqueWithoutPinInput | GalleryPinLikeUpdateWithWhereUniqueWithoutPinInput[]
    updateMany?: GalleryPinLikeUpdateManyWithWhereWithoutPinInput | GalleryPinLikeUpdateManyWithWhereWithoutPinInput[]
    deleteMany?: GalleryPinLikeScalarWhereInput | GalleryPinLikeScalarWhereInput[]
  }

  export type GalleryPinLikeUncheckedUpdateManyWithoutPinNestedInput = {
    create?: XOR<GalleryPinLikeCreateWithoutPinInput, GalleryPinLikeUncheckedCreateWithoutPinInput> | GalleryPinLikeCreateWithoutPinInput[] | GalleryPinLikeUncheckedCreateWithoutPinInput[]
    connectOrCreate?: GalleryPinLikeCreateOrConnectWithoutPinInput | GalleryPinLikeCreateOrConnectWithoutPinInput[]
    upsert?: GalleryPinLikeUpsertWithWhereUniqueWithoutPinInput | GalleryPinLikeUpsertWithWhereUniqueWithoutPinInput[]
    createMany?: GalleryPinLikeCreateManyPinInputEnvelope
    set?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    disconnect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    delete?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    connect?: GalleryPinLikeWhereUniqueInput | GalleryPinLikeWhereUniqueInput[]
    update?: GalleryPinLikeUpdateWithWhereUniqueWithoutPinInput | GalleryPinLikeUpdateWithWhereUniqueWithoutPinInput[]
    updateMany?: GalleryPinLikeUpdateManyWithWhereWithoutPinInput | GalleryPinLikeUpdateManyWithWhereWithoutPinInput[]
    deleteMany?: GalleryPinLikeScalarWhereInput | GalleryPinLikeScalarWhereInput[]
  }

  export type GalleryPinCreateNestedOneWithoutLikesInput = {
    create?: XOR<GalleryPinCreateWithoutLikesInput, GalleryPinUncheckedCreateWithoutLikesInput>
    connectOrCreate?: GalleryPinCreateOrConnectWithoutLikesInput
    connect?: GalleryPinWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGalleryPinLikesInput = {
    create?: XOR<UserCreateWithoutGalleryPinLikesInput, UserUncheckedCreateWithoutGalleryPinLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGalleryPinLikesInput
    connect?: UserWhereUniqueInput
  }

  export type GalleryPinUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<GalleryPinCreateWithoutLikesInput, GalleryPinUncheckedCreateWithoutLikesInput>
    connectOrCreate?: GalleryPinCreateOrConnectWithoutLikesInput
    upsert?: GalleryPinUpsertWithoutLikesInput
    connect?: GalleryPinWhereUniqueInput
    update?: XOR<XOR<GalleryPinUpdateToOneWithWhereWithoutLikesInput, GalleryPinUpdateWithoutLikesInput>, GalleryPinUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutGalleryPinLikesNestedInput = {
    create?: XOR<UserCreateWithoutGalleryPinLikesInput, UserUncheckedCreateWithoutGalleryPinLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGalleryPinLikesInput
    upsert?: UserUpsertWithoutGalleryPinLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGalleryPinLikesInput, UserUpdateWithoutGalleryPinLikesInput>, UserUncheckedUpdateWithoutGalleryPinLikesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumSegmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SegmentType | EnumSegmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSegmentTypeFilter<$PrismaModel> | $Enums.SegmentType
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumSegmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SegmentType | EnumSegmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SegmentType[] | ListEnumSegmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSegmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.SegmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSegmentTypeFilter<$PrismaModel>
    _max?: NestedEnumSegmentTypeFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GalleryPinCreateWithoutAuthorInput = {
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    likes?: GalleryPinLikeCreateNestedManyWithoutPinInput
  }

  export type GalleryPinUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    likes?: GalleryPinLikeUncheckedCreateNestedManyWithoutPinInput
  }

  export type GalleryPinCreateOrConnectWithoutAuthorInput = {
    where: GalleryPinWhereUniqueInput
    create: XOR<GalleryPinCreateWithoutAuthorInput, GalleryPinUncheckedCreateWithoutAuthorInput>
  }

  export type GalleryPinCreateManyAuthorInputEnvelope = {
    data: GalleryPinCreateManyAuthorInput | GalleryPinCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type GalleryPinLikeCreateWithoutUserInput = {
    pin: GalleryPinCreateNestedOneWithoutLikesInput
  }

  export type GalleryPinLikeUncheckedCreateWithoutUserInput = {
    id?: number
    pinId: number
  }

  export type GalleryPinLikeCreateOrConnectWithoutUserInput = {
    where: GalleryPinLikeWhereUniqueInput
    create: XOR<GalleryPinLikeCreateWithoutUserInput, GalleryPinLikeUncheckedCreateWithoutUserInput>
  }

  export type GalleryPinLikeCreateManyUserInputEnvelope = {
    data: GalleryPinLikeCreateManyUserInput | GalleryPinLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GalleryPinUpsertWithWhereUniqueWithoutAuthorInput = {
    where: GalleryPinWhereUniqueInput
    update: XOR<GalleryPinUpdateWithoutAuthorInput, GalleryPinUncheckedUpdateWithoutAuthorInput>
    create: XOR<GalleryPinCreateWithoutAuthorInput, GalleryPinUncheckedCreateWithoutAuthorInput>
  }

  export type GalleryPinUpdateWithWhereUniqueWithoutAuthorInput = {
    where: GalleryPinWhereUniqueInput
    data: XOR<GalleryPinUpdateWithoutAuthorInput, GalleryPinUncheckedUpdateWithoutAuthorInput>
  }

  export type GalleryPinUpdateManyWithWhereWithoutAuthorInput = {
    where: GalleryPinScalarWhereInput
    data: XOR<GalleryPinUpdateManyMutationInput, GalleryPinUncheckedUpdateManyWithoutAuthorInput>
  }

  export type GalleryPinScalarWhereInput = {
    AND?: GalleryPinScalarWhereInput | GalleryPinScalarWhereInput[]
    OR?: GalleryPinScalarWhereInput[]
    NOT?: GalleryPinScalarWhereInput | GalleryPinScalarWhereInput[]
    id?: IntFilter<"GalleryPin"> | number
    title?: StringFilter<"GalleryPin"> | string
    imageUrl?: StringFilter<"GalleryPin"> | string
    description?: StringNullableFilter<"GalleryPin"> | string | null
    createdAt?: DateTimeFilter<"GalleryPin"> | Date | string
    authorId?: StringFilter<"GalleryPin"> | string
  }

  export type GalleryPinLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: GalleryPinLikeWhereUniqueInput
    update: XOR<GalleryPinLikeUpdateWithoutUserInput, GalleryPinLikeUncheckedUpdateWithoutUserInput>
    create: XOR<GalleryPinLikeCreateWithoutUserInput, GalleryPinLikeUncheckedCreateWithoutUserInput>
  }

  export type GalleryPinLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: GalleryPinLikeWhereUniqueInput
    data: XOR<GalleryPinLikeUpdateWithoutUserInput, GalleryPinLikeUncheckedUpdateWithoutUserInput>
  }

  export type GalleryPinLikeUpdateManyWithWhereWithoutUserInput = {
    where: GalleryPinLikeScalarWhereInput
    data: XOR<GalleryPinLikeUpdateManyMutationInput, GalleryPinLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type GalleryPinLikeScalarWhereInput = {
    AND?: GalleryPinLikeScalarWhereInput | GalleryPinLikeScalarWhereInput[]
    OR?: GalleryPinLikeScalarWhereInput[]
    NOT?: GalleryPinLikeScalarWhereInput | GalleryPinLikeScalarWhereInput[]
    id?: IntFilter<"GalleryPinLike"> | number
    pinId?: IntFilter<"GalleryPinLike"> | number
    userId?: StringFilter<"GalleryPinLike"> | string
  }

  export type ElementAttributeCreateWithoutAttributeInput = {
    elementType: ElementTypeCreateNestedOneWithoutAttributesInput
  }

  export type ElementAttributeUncheckedCreateWithoutAttributeInput = {
    elementTypeId: number
  }

  export type ElementAttributeCreateOrConnectWithoutAttributeInput = {
    where: ElementAttributeWhereUniqueInput
    create: XOR<ElementAttributeCreateWithoutAttributeInput, ElementAttributeUncheckedCreateWithoutAttributeInput>
  }

  export type ElementAttributeCreateManyAttributeInputEnvelope = {
    data: ElementAttributeCreateManyAttributeInput | ElementAttributeCreateManyAttributeInput[]
    skipDuplicates?: boolean
  }

  export type ElementValueCreateWithoutAttributeInput = {
    value: string
    element: ElementCreateNestedOneWithoutValuesInput
  }

  export type ElementValueUncheckedCreateWithoutAttributeInput = {
    elementId: number
    value: string
  }

  export type ElementValueCreateOrConnectWithoutAttributeInput = {
    where: ElementValueWhereUniqueInput
    create: XOR<ElementValueCreateWithoutAttributeInput, ElementValueUncheckedCreateWithoutAttributeInput>
  }

  export type ElementValueCreateManyAttributeInputEnvelope = {
    data: ElementValueCreateManyAttributeInput | ElementValueCreateManyAttributeInput[]
    skipDuplicates?: boolean
  }

  export type ElementAttributeUpsertWithWhereUniqueWithoutAttributeInput = {
    where: ElementAttributeWhereUniqueInput
    update: XOR<ElementAttributeUpdateWithoutAttributeInput, ElementAttributeUncheckedUpdateWithoutAttributeInput>
    create: XOR<ElementAttributeCreateWithoutAttributeInput, ElementAttributeUncheckedCreateWithoutAttributeInput>
  }

  export type ElementAttributeUpdateWithWhereUniqueWithoutAttributeInput = {
    where: ElementAttributeWhereUniqueInput
    data: XOR<ElementAttributeUpdateWithoutAttributeInput, ElementAttributeUncheckedUpdateWithoutAttributeInput>
  }

  export type ElementAttributeUpdateManyWithWhereWithoutAttributeInput = {
    where: ElementAttributeScalarWhereInput
    data: XOR<ElementAttributeUpdateManyMutationInput, ElementAttributeUncheckedUpdateManyWithoutAttributeInput>
  }

  export type ElementAttributeScalarWhereInput = {
    AND?: ElementAttributeScalarWhereInput | ElementAttributeScalarWhereInput[]
    OR?: ElementAttributeScalarWhereInput[]
    NOT?: ElementAttributeScalarWhereInput | ElementAttributeScalarWhereInput[]
    elementTypeId?: IntFilter<"ElementAttribute"> | number
    attributeId?: IntFilter<"ElementAttribute"> | number
  }

  export type ElementValueUpsertWithWhereUniqueWithoutAttributeInput = {
    where: ElementValueWhereUniqueInput
    update: XOR<ElementValueUpdateWithoutAttributeInput, ElementValueUncheckedUpdateWithoutAttributeInput>
    create: XOR<ElementValueCreateWithoutAttributeInput, ElementValueUncheckedCreateWithoutAttributeInput>
  }

  export type ElementValueUpdateWithWhereUniqueWithoutAttributeInput = {
    where: ElementValueWhereUniqueInput
    data: XOR<ElementValueUpdateWithoutAttributeInput, ElementValueUncheckedUpdateWithoutAttributeInput>
  }

  export type ElementValueUpdateManyWithWhereWithoutAttributeInput = {
    where: ElementValueScalarWhereInput
    data: XOR<ElementValueUpdateManyMutationInput, ElementValueUncheckedUpdateManyWithoutAttributeInput>
  }

  export type ElementValueScalarWhereInput = {
    AND?: ElementValueScalarWhereInput | ElementValueScalarWhereInput[]
    OR?: ElementValueScalarWhereInput[]
    NOT?: ElementValueScalarWhereInput | ElementValueScalarWhereInput[]
    elementId?: IntFilter<"ElementValue"> | number
    attributeId?: IntFilter<"ElementValue"> | number
    value?: StringFilter<"ElementValue"> | string
  }

  export type ElementCreateWithoutElementTypeInput = {
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    moodboard: MoodboardCreateNestedOneWithoutElementsInput
    values?: ElementValueCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateWithoutElementTypeInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    moodboardId: number
    values?: ElementValueUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementCreateOrConnectWithoutElementTypeInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutElementTypeInput, ElementUncheckedCreateWithoutElementTypeInput>
  }

  export type ElementCreateManyElementTypeInputEnvelope = {
    data: ElementCreateManyElementTypeInput | ElementCreateManyElementTypeInput[]
    skipDuplicates?: boolean
  }

  export type ElementAttributeCreateWithoutElementTypeInput = {
    attribute: AttributeCreateNestedOneWithoutElementTypesInput
  }

  export type ElementAttributeUncheckedCreateWithoutElementTypeInput = {
    attributeId: number
  }

  export type ElementAttributeCreateOrConnectWithoutElementTypeInput = {
    where: ElementAttributeWhereUniqueInput
    create: XOR<ElementAttributeCreateWithoutElementTypeInput, ElementAttributeUncheckedCreateWithoutElementTypeInput>
  }

  export type ElementAttributeCreateManyElementTypeInputEnvelope = {
    data: ElementAttributeCreateManyElementTypeInput | ElementAttributeCreateManyElementTypeInput[]
    skipDuplicates?: boolean
  }

  export type ElementUpsertWithWhereUniqueWithoutElementTypeInput = {
    where: ElementWhereUniqueInput
    update: XOR<ElementUpdateWithoutElementTypeInput, ElementUncheckedUpdateWithoutElementTypeInput>
    create: XOR<ElementCreateWithoutElementTypeInput, ElementUncheckedCreateWithoutElementTypeInput>
  }

  export type ElementUpdateWithWhereUniqueWithoutElementTypeInput = {
    where: ElementWhereUniqueInput
    data: XOR<ElementUpdateWithoutElementTypeInput, ElementUncheckedUpdateWithoutElementTypeInput>
  }

  export type ElementUpdateManyWithWhereWithoutElementTypeInput = {
    where: ElementScalarWhereInput
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyWithoutElementTypeInput>
  }

  export type ElementScalarWhereInput = {
    AND?: ElementScalarWhereInput | ElementScalarWhereInput[]
    OR?: ElementScalarWhereInput[]
    NOT?: ElementScalarWhereInput | ElementScalarWhereInput[]
    id?: IntFilter<"Element"> | number
    name?: StringFilter<"Element"> | string
    coordsX?: IntFilter<"Element"> | number
    coordsY?: IntFilter<"Element"> | number
    opacity?: IntFilter<"Element"> | number
    rotation?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    width?: IntFilter<"Element"> | number
    layer?: IntFilter<"Element"> | number
    elementTypeId?: IntFilter<"Element"> | number
    moodboardId?: IntFilter<"Element"> | number
  }

  export type ElementAttributeUpsertWithWhereUniqueWithoutElementTypeInput = {
    where: ElementAttributeWhereUniqueInput
    update: XOR<ElementAttributeUpdateWithoutElementTypeInput, ElementAttributeUncheckedUpdateWithoutElementTypeInput>
    create: XOR<ElementAttributeCreateWithoutElementTypeInput, ElementAttributeUncheckedCreateWithoutElementTypeInput>
  }

  export type ElementAttributeUpdateWithWhereUniqueWithoutElementTypeInput = {
    where: ElementAttributeWhereUniqueInput
    data: XOR<ElementAttributeUpdateWithoutElementTypeInput, ElementAttributeUncheckedUpdateWithoutElementTypeInput>
  }

  export type ElementAttributeUpdateManyWithWhereWithoutElementTypeInput = {
    where: ElementAttributeScalarWhereInput
    data: XOR<ElementAttributeUpdateManyMutationInput, ElementAttributeUncheckedUpdateManyWithoutElementTypeInput>
  }

  export type ElementTypeCreateWithoutAttributesInput = {
    name: string
    description?: string | null
    isActive?: boolean
    elements?: ElementCreateNestedManyWithoutElementTypeInput
  }

  export type ElementTypeUncheckedCreateWithoutAttributesInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    elements?: ElementUncheckedCreateNestedManyWithoutElementTypeInput
  }

  export type ElementTypeCreateOrConnectWithoutAttributesInput = {
    where: ElementTypeWhereUniqueInput
    create: XOR<ElementTypeCreateWithoutAttributesInput, ElementTypeUncheckedCreateWithoutAttributesInput>
  }

  export type AttributeCreateWithoutElementTypesInput = {
    name: string
    description?: string | null
    isActive?: boolean
    elementValues?: ElementValueCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUncheckedCreateWithoutElementTypesInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    elementValues?: ElementValueUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type AttributeCreateOrConnectWithoutElementTypesInput = {
    where: AttributeWhereUniqueInput
    create: XOR<AttributeCreateWithoutElementTypesInput, AttributeUncheckedCreateWithoutElementTypesInput>
  }

  export type ElementTypeUpsertWithoutAttributesInput = {
    update: XOR<ElementTypeUpdateWithoutAttributesInput, ElementTypeUncheckedUpdateWithoutAttributesInput>
    create: XOR<ElementTypeCreateWithoutAttributesInput, ElementTypeUncheckedCreateWithoutAttributesInput>
    where?: ElementTypeWhereInput
  }

  export type ElementTypeUpdateToOneWithWhereWithoutAttributesInput = {
    where?: ElementTypeWhereInput
    data: XOR<ElementTypeUpdateWithoutAttributesInput, ElementTypeUncheckedUpdateWithoutAttributesInput>
  }

  export type ElementTypeUpdateWithoutAttributesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elements?: ElementUpdateManyWithoutElementTypeNestedInput
  }

  export type ElementTypeUncheckedUpdateWithoutAttributesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elements?: ElementUncheckedUpdateManyWithoutElementTypeNestedInput
  }

  export type AttributeUpsertWithoutElementTypesInput = {
    update: XOR<AttributeUpdateWithoutElementTypesInput, AttributeUncheckedUpdateWithoutElementTypesInput>
    create: XOR<AttributeCreateWithoutElementTypesInput, AttributeUncheckedCreateWithoutElementTypesInput>
    where?: AttributeWhereInput
  }

  export type AttributeUpdateToOneWithWhereWithoutElementTypesInput = {
    where?: AttributeWhereInput
    data: XOR<AttributeUpdateWithoutElementTypesInput, AttributeUncheckedUpdateWithoutElementTypesInput>
  }

  export type AttributeUpdateWithoutElementTypesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elementValues?: ElementValueUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeUncheckedUpdateWithoutElementTypesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elementValues?: ElementValueUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type ElementTypeCreateWithoutElementsInput = {
    name: string
    description?: string | null
    isActive?: boolean
    attributes?: ElementAttributeCreateNestedManyWithoutElementTypeInput
  }

  export type ElementTypeUncheckedCreateWithoutElementsInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    attributes?: ElementAttributeUncheckedCreateNestedManyWithoutElementTypeInput
  }

  export type ElementTypeCreateOrConnectWithoutElementsInput = {
    where: ElementTypeWhereUniqueInput
    create: XOR<ElementTypeCreateWithoutElementsInput, ElementTypeUncheckedCreateWithoutElementsInput>
  }

  export type MoodboardCreateWithoutElementsInput = {
    name: string
    createdAt?: Date | string
    userId: string
  }

  export type MoodboardUncheckedCreateWithoutElementsInput = {
    id?: number
    name: string
    createdAt?: Date | string
    userId: string
  }

  export type MoodboardCreateOrConnectWithoutElementsInput = {
    where: MoodboardWhereUniqueInput
    create: XOR<MoodboardCreateWithoutElementsInput, MoodboardUncheckedCreateWithoutElementsInput>
  }

  export type ElementValueCreateWithoutElementInput = {
    value: string
    attribute: AttributeCreateNestedOneWithoutElementValuesInput
  }

  export type ElementValueUncheckedCreateWithoutElementInput = {
    attributeId: number
    value: string
  }

  export type ElementValueCreateOrConnectWithoutElementInput = {
    where: ElementValueWhereUniqueInput
    create: XOR<ElementValueCreateWithoutElementInput, ElementValueUncheckedCreateWithoutElementInput>
  }

  export type ElementValueCreateManyElementInputEnvelope = {
    data: ElementValueCreateManyElementInput | ElementValueCreateManyElementInput[]
    skipDuplicates?: boolean
  }

  export type ElementTypeUpsertWithoutElementsInput = {
    update: XOR<ElementTypeUpdateWithoutElementsInput, ElementTypeUncheckedUpdateWithoutElementsInput>
    create: XOR<ElementTypeCreateWithoutElementsInput, ElementTypeUncheckedCreateWithoutElementsInput>
    where?: ElementTypeWhereInput
  }

  export type ElementTypeUpdateToOneWithWhereWithoutElementsInput = {
    where?: ElementTypeWhereInput
    data: XOR<ElementTypeUpdateWithoutElementsInput, ElementTypeUncheckedUpdateWithoutElementsInput>
  }

  export type ElementTypeUpdateWithoutElementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    attributes?: ElementAttributeUpdateManyWithoutElementTypeNestedInput
  }

  export type ElementTypeUncheckedUpdateWithoutElementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    attributes?: ElementAttributeUncheckedUpdateManyWithoutElementTypeNestedInput
  }

  export type MoodboardUpsertWithoutElementsInput = {
    update: XOR<MoodboardUpdateWithoutElementsInput, MoodboardUncheckedUpdateWithoutElementsInput>
    create: XOR<MoodboardCreateWithoutElementsInput, MoodboardUncheckedCreateWithoutElementsInput>
    where?: MoodboardWhereInput
  }

  export type MoodboardUpdateToOneWithWhereWithoutElementsInput = {
    where?: MoodboardWhereInput
    data: XOR<MoodboardUpdateWithoutElementsInput, MoodboardUncheckedUpdateWithoutElementsInput>
  }

  export type MoodboardUpdateWithoutElementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MoodboardUncheckedUpdateWithoutElementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ElementValueUpsertWithWhereUniqueWithoutElementInput = {
    where: ElementValueWhereUniqueInput
    update: XOR<ElementValueUpdateWithoutElementInput, ElementValueUncheckedUpdateWithoutElementInput>
    create: XOR<ElementValueCreateWithoutElementInput, ElementValueUncheckedCreateWithoutElementInput>
  }

  export type ElementValueUpdateWithWhereUniqueWithoutElementInput = {
    where: ElementValueWhereUniqueInput
    data: XOR<ElementValueUpdateWithoutElementInput, ElementValueUncheckedUpdateWithoutElementInput>
  }

  export type ElementValueUpdateManyWithWhereWithoutElementInput = {
    where: ElementValueScalarWhereInput
    data: XOR<ElementValueUpdateManyMutationInput, ElementValueUncheckedUpdateManyWithoutElementInput>
  }

  export type ElementCreateWithoutValuesInput = {
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementType: ElementTypeCreateNestedOneWithoutElementsInput
    moodboard: MoodboardCreateNestedOneWithoutElementsInput
  }

  export type ElementUncheckedCreateWithoutValuesInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementTypeId: number
    moodboardId: number
  }

  export type ElementCreateOrConnectWithoutValuesInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutValuesInput, ElementUncheckedCreateWithoutValuesInput>
  }

  export type AttributeCreateWithoutElementValuesInput = {
    name: string
    description?: string | null
    isActive?: boolean
    elementTypes?: ElementAttributeCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUncheckedCreateWithoutElementValuesInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    elementTypes?: ElementAttributeUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type AttributeCreateOrConnectWithoutElementValuesInput = {
    where: AttributeWhereUniqueInput
    create: XOR<AttributeCreateWithoutElementValuesInput, AttributeUncheckedCreateWithoutElementValuesInput>
  }

  export type ElementUpsertWithoutValuesInput = {
    update: XOR<ElementUpdateWithoutValuesInput, ElementUncheckedUpdateWithoutValuesInput>
    create: XOR<ElementCreateWithoutValuesInput, ElementUncheckedCreateWithoutValuesInput>
    where?: ElementWhereInput
  }

  export type ElementUpdateToOneWithWhereWithoutValuesInput = {
    where?: ElementWhereInput
    data: XOR<ElementUpdateWithoutValuesInput, ElementUncheckedUpdateWithoutValuesInput>
  }

  export type ElementUpdateWithoutValuesInput = {
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementType?: ElementTypeUpdateOneRequiredWithoutElementsNestedInput
    moodboard?: MoodboardUpdateOneRequiredWithoutElementsNestedInput
  }

  export type ElementUncheckedUpdateWithoutValuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementTypeId?: IntFieldUpdateOperationsInput | number
    moodboardId?: IntFieldUpdateOperationsInput | number
  }

  export type AttributeUpsertWithoutElementValuesInput = {
    update: XOR<AttributeUpdateWithoutElementValuesInput, AttributeUncheckedUpdateWithoutElementValuesInput>
    create: XOR<AttributeCreateWithoutElementValuesInput, AttributeUncheckedCreateWithoutElementValuesInput>
    where?: AttributeWhereInput
  }

  export type AttributeUpdateToOneWithWhereWithoutElementValuesInput = {
    where?: AttributeWhereInput
    data: XOR<AttributeUpdateWithoutElementValuesInput, AttributeUncheckedUpdateWithoutElementValuesInput>
  }

  export type AttributeUpdateWithoutElementValuesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elementTypes?: ElementAttributeUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeUncheckedUpdateWithoutElementValuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    elementTypes?: ElementAttributeUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type ElementCreateWithoutMoodboardInput = {
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementType: ElementTypeCreateNestedOneWithoutElementsInput
    values?: ElementValueCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateWithoutMoodboardInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementTypeId: number
    values?: ElementValueUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementCreateOrConnectWithoutMoodboardInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutMoodboardInput, ElementUncheckedCreateWithoutMoodboardInput>
  }

  export type ElementCreateManyMoodboardInputEnvelope = {
    data: ElementCreateManyMoodboardInput | ElementCreateManyMoodboardInput[]
    skipDuplicates?: boolean
  }

  export type ElementUpsertWithWhereUniqueWithoutMoodboardInput = {
    where: ElementWhereUniqueInput
    update: XOR<ElementUpdateWithoutMoodboardInput, ElementUncheckedUpdateWithoutMoodboardInput>
    create: XOR<ElementCreateWithoutMoodboardInput, ElementUncheckedCreateWithoutMoodboardInput>
  }

  export type ElementUpdateWithWhereUniqueWithoutMoodboardInput = {
    where: ElementWhereUniqueInput
    data: XOR<ElementUpdateWithoutMoodboardInput, ElementUncheckedUpdateWithoutMoodboardInput>
  }

  export type ElementUpdateManyWithWhereWithoutMoodboardInput = {
    where: ElementScalarWhereInput
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyWithoutMoodboardInput>
  }

  export type UserCreateWithoutGalleryPinsInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
    galleryPinLikes?: GalleryPinLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGalleryPinsInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
    galleryPinLikes?: GalleryPinLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGalleryPinsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGalleryPinsInput, UserUncheckedCreateWithoutGalleryPinsInput>
  }

  export type GalleryPinLikeCreateWithoutPinInput = {
    user: UserCreateNestedOneWithoutGalleryPinLikesInput
  }

  export type GalleryPinLikeUncheckedCreateWithoutPinInput = {
    id?: number
    userId: string
  }

  export type GalleryPinLikeCreateOrConnectWithoutPinInput = {
    where: GalleryPinLikeWhereUniqueInput
    create: XOR<GalleryPinLikeCreateWithoutPinInput, GalleryPinLikeUncheckedCreateWithoutPinInput>
  }

  export type GalleryPinLikeCreateManyPinInputEnvelope = {
    data: GalleryPinLikeCreateManyPinInput | GalleryPinLikeCreateManyPinInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutGalleryPinsInput = {
    update: XOR<UserUpdateWithoutGalleryPinsInput, UserUncheckedUpdateWithoutGalleryPinsInput>
    create: XOR<UserCreateWithoutGalleryPinsInput, UserUncheckedCreateWithoutGalleryPinsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGalleryPinsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGalleryPinsInput, UserUncheckedUpdateWithoutGalleryPinsInput>
  }

  export type UserUpdateWithoutGalleryPinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    galleryPinLikes?: GalleryPinLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGalleryPinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    galleryPinLikes?: GalleryPinLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GalleryPinLikeUpsertWithWhereUniqueWithoutPinInput = {
    where: GalleryPinLikeWhereUniqueInput
    update: XOR<GalleryPinLikeUpdateWithoutPinInput, GalleryPinLikeUncheckedUpdateWithoutPinInput>
    create: XOR<GalleryPinLikeCreateWithoutPinInput, GalleryPinLikeUncheckedCreateWithoutPinInput>
  }

  export type GalleryPinLikeUpdateWithWhereUniqueWithoutPinInput = {
    where: GalleryPinLikeWhereUniqueInput
    data: XOR<GalleryPinLikeUpdateWithoutPinInput, GalleryPinLikeUncheckedUpdateWithoutPinInput>
  }

  export type GalleryPinLikeUpdateManyWithWhereWithoutPinInput = {
    where: GalleryPinLikeScalarWhereInput
    data: XOR<GalleryPinLikeUpdateManyMutationInput, GalleryPinLikeUncheckedUpdateManyWithoutPinInput>
  }

  export type GalleryPinCreateWithoutLikesInput = {
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutGalleryPinsInput
  }

  export type GalleryPinUncheckedCreateWithoutLikesInput = {
    id?: number
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
    authorId: string
  }

  export type GalleryPinCreateOrConnectWithoutLikesInput = {
    where: GalleryPinWhereUniqueInput
    create: XOR<GalleryPinCreateWithoutLikesInput, GalleryPinUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutGalleryPinLikesInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
    galleryPins?: GalleryPinCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutGalleryPinLikesInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    userName: string
    birthday?: Date | string | null
    role?: $Enums.UserRole
    galleryPins?: GalleryPinUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutGalleryPinLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGalleryPinLikesInput, UserUncheckedCreateWithoutGalleryPinLikesInput>
  }

  export type GalleryPinUpsertWithoutLikesInput = {
    update: XOR<GalleryPinUpdateWithoutLikesInput, GalleryPinUncheckedUpdateWithoutLikesInput>
    create: XOR<GalleryPinCreateWithoutLikesInput, GalleryPinUncheckedCreateWithoutLikesInput>
    where?: GalleryPinWhereInput
  }

  export type GalleryPinUpdateToOneWithWhereWithoutLikesInput = {
    where?: GalleryPinWhereInput
    data: XOR<GalleryPinUpdateWithoutLikesInput, GalleryPinUncheckedUpdateWithoutLikesInput>
  }

  export type GalleryPinUpdateWithoutLikesInput = {
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutGalleryPinsNestedInput
  }

  export type GalleryPinUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutGalleryPinLikesInput = {
    update: XOR<UserUpdateWithoutGalleryPinLikesInput, UserUncheckedUpdateWithoutGalleryPinLikesInput>
    create: XOR<UserCreateWithoutGalleryPinLikesInput, UserUncheckedCreateWithoutGalleryPinLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGalleryPinLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGalleryPinLikesInput, UserUncheckedUpdateWithoutGalleryPinLikesInput>
  }

  export type UserUpdateWithoutGalleryPinLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    galleryPins?: GalleryPinUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutGalleryPinLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    galleryPins?: GalleryPinUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type GalleryPinCreateManyAuthorInput = {
    id?: number
    title: string
    imageUrl: string
    description?: string | null
    createdAt?: Date | string
  }

  export type GalleryPinLikeCreateManyUserInput = {
    id?: number
    pinId: number
  }

  export type GalleryPinUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: GalleryPinLikeUpdateManyWithoutPinNestedInput
  }

  export type GalleryPinUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: GalleryPinLikeUncheckedUpdateManyWithoutPinNestedInput
  }

  export type GalleryPinUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryPinLikeUpdateWithoutUserInput = {
    pin?: GalleryPinUpdateOneRequiredWithoutLikesNestedInput
  }

  export type GalleryPinLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    pinId?: IntFieldUpdateOperationsInput | number
  }

  export type GalleryPinLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    pinId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementAttributeCreateManyAttributeInput = {
    elementTypeId: number
  }

  export type ElementValueCreateManyAttributeInput = {
    elementId: number
    value: string
  }

  export type ElementAttributeUpdateWithoutAttributeInput = {
    elementType?: ElementTypeUpdateOneRequiredWithoutAttributesNestedInput
  }

  export type ElementAttributeUncheckedUpdateWithoutAttributeInput = {
    elementTypeId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementAttributeUncheckedUpdateManyWithoutAttributeInput = {
    elementTypeId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementValueUpdateWithoutAttributeInput = {
    value?: StringFieldUpdateOperationsInput | string
    element?: ElementUpdateOneRequiredWithoutValuesNestedInput
  }

  export type ElementValueUncheckedUpdateWithoutAttributeInput = {
    elementId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElementValueUncheckedUpdateManyWithoutAttributeInput = {
    elementId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElementCreateManyElementTypeInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    moodboardId: number
  }

  export type ElementAttributeCreateManyElementTypeInput = {
    attributeId: number
  }

  export type ElementUpdateWithoutElementTypeInput = {
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    moodboard?: MoodboardUpdateOneRequiredWithoutElementsNestedInput
    values?: ElementValueUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateWithoutElementTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    moodboardId?: IntFieldUpdateOperationsInput | number
    values?: ElementValueUncheckedUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateManyWithoutElementTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    moodboardId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementAttributeUpdateWithoutElementTypeInput = {
    attribute?: AttributeUpdateOneRequiredWithoutElementTypesNestedInput
  }

  export type ElementAttributeUncheckedUpdateWithoutElementTypeInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementAttributeUncheckedUpdateManyWithoutElementTypeInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementValueCreateManyElementInput = {
    attributeId: number
    value: string
  }

  export type ElementValueUpdateWithoutElementInput = {
    value?: StringFieldUpdateOperationsInput | string
    attribute?: AttributeUpdateOneRequiredWithoutElementValuesNestedInput
  }

  export type ElementValueUncheckedUpdateWithoutElementInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElementValueUncheckedUpdateManyWithoutElementInput = {
    attributeId?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElementCreateManyMoodboardInput = {
    id?: number
    name: string
    coordsX: number
    coordsY: number
    opacity?: number
    rotation?: number
    height: number
    width: number
    layer?: number
    elementTypeId: number
  }

  export type ElementUpdateWithoutMoodboardInput = {
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementType?: ElementTypeUpdateOneRequiredWithoutElementsNestedInput
    values?: ElementValueUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateWithoutMoodboardInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementTypeId?: IntFieldUpdateOperationsInput | number
    values?: ElementValueUncheckedUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateManyWithoutMoodboardInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    coordsX?: IntFieldUpdateOperationsInput | number
    coordsY?: IntFieldUpdateOperationsInput | number
    opacity?: IntFieldUpdateOperationsInput | number
    rotation?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    layer?: IntFieldUpdateOperationsInput | number
    elementTypeId?: IntFieldUpdateOperationsInput | number
  }

  export type GalleryPinLikeCreateManyPinInput = {
    id?: number
    userId: string
  }

  export type GalleryPinLikeUpdateWithoutPinInput = {
    user?: UserUpdateOneRequiredWithoutGalleryPinLikesNestedInput
  }

  export type GalleryPinLikeUncheckedUpdateWithoutPinInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type GalleryPinLikeUncheckedUpdateManyWithoutPinInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}