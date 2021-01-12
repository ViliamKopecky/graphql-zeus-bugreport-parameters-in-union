/* tslint:disable */
/* eslint-disable */

export type ValueTypes = {
    ["Node"]:AliasType<{
		id?:true;
		['...on Cat']?: Omit<ValueTypes["Cat"],keyof ValueTypes["Node"]>;
		['...on Dog']?: Omit<ValueTypes["Dog"],keyof ValueTypes["Node"]>;
		__typename?: true
}>;
	["Cat"]: AliasType<{
	id?:true,
	isCat?:true,
relatedCats?: [{	first:number},ValueTypes["Cat"]],
		__typename?: true
}>;
	["Dog"]: AliasType<{
	id?:true,
	isDog?:true,
		__typename?: true
}>;
	["Query"]: AliasType<{
getCatOrDog?: [{	id:string},ValueTypes["Node"]],
getCat?: [{	id:string},ValueTypes["Cat"]],
getDog?: [{	id:string},ValueTypes["Dog"]],
		__typename?: true
}>
  }

export type PartialObjects = {
    ["Node"]:{
		id?:string
} & (PartialObjects["Cat"] | PartialObjects["Dog"]),
	["Cat"]: {
		__typename?: "Cat";
			id?:string,
			isCat?:boolean,
			relatedCats?:PartialObjects["Cat"][]
	},
	["Dog"]: {
		__typename?: "Dog";
			id?:string,
			isDog?:boolean
	},
	["Query"]: {
		__typename?: "Query";
			getCatOrDog?:PartialObjects["Node"],
			getCat?:PartialObjects["Cat"],
			getDog?:PartialObjects["Dog"]
	}
  }

export type Node = {
	__interface:{
			id:string
	};
	__resolve:{
		['...on Cat']: Cat;
		['...on Dog']: Dog;
	}
}

export type Cat = {
	__typename?: "Cat",
	id:string,
	isCat:boolean,
	relatedCats?:Cat[]
}

export type Dog = {
	__typename?: "Dog",
	id:string,
	isDog:boolean
}

export type Query = {
	__typename?: "Query",
	getCatOrDog?:Node,
	getCat?:Cat,
	getDog?:Dog
}



export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<
  UnwrapPromise<ReturnType<T>>
>;
export type ZeusHook<
  T extends (
    ...args: any[]
  ) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>
> = ZeusState<ReturnType<T>[N]>;

type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;

type WithTypeNameValue<T> = T & {
  __typename?: true;
};

type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};

type NotUndefined<T> = T extends undefined ? never : T;

export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;

interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}

export type ValuesOf<T> = T[keyof T];

export type MapResolve<SRC, DST> = SRC extends {
    __interface: infer INTERFACE;
    __resolve: Record<string, { __typename?: string }> & infer IMPLEMENTORS;
  }
  ?
  ValuesOf<{
    [k in (keyof SRC['__resolve'] & keyof DST)]: ({
      [rk in (keyof SRC['__resolve'][k] & keyof DST[k])]: LastMapTypeSRCResolver<SRC['__resolve'][k][rk], DST[k][rk]>
    } & {
      __typename: SRC['__resolve'][k]['__typename']
    })
  }>
  :
  never;

export type MapInterface<SRC, DST> = SRC extends {
    __interface: infer INTERFACE;
    __resolve: Record<string, { __typename?: string }> & infer IMPLEMENTORS;
  }
  ?
  (MapResolve<SRC, DST> extends never ? {} : MapResolve<SRC, DST>) & {
  [k in (keyof SRC['__interface'] & keyof DST)]: LastMapTypeSRCResolver<SRC['__interface'][k], DST[k]>
} : never;

export type ValueToUnion<T> = T extends {
  __typename: infer R;
}
  ? {
      [P in keyof Omit<T, '__typename'>]: T[P] & {
        __typename: R;
      };
    }
  : T;

export type ObjectToUnion<T> = {
  [P in keyof T]: T[P];
}[keyof T];

type Anify<T> = { [P in keyof T]?: any };


type LastMapTypeSRCResolver<SRC, DST> = SRC extends undefined
  ? undefined
  : SRC extends Array<infer AR>
  ? LastMapTypeSRCResolver<AR, DST>[]
  : SRC extends { __interface: any; __resolve: any }
  ? MapInterface<SRC, DST>
  : SRC extends { __union: any; __resolve: infer RESOLVE }
  ? ObjectToUnion<MapType<RESOLVE, ValueToUnion<DST>>>
  : DST extends boolean
  ? SRC
  : MapType<SRC, DST>;

export type MapType<SRC extends Anify<DST>, DST> = DST extends boolean
  ? SRC
  : DST extends {
      __alias: any;
    }
  ? {
      [A in keyof DST["__alias"]]: Required<SRC> extends Anify<
        DST["__alias"][A]
      >
        ? MapType<Required<SRC>, DST["__alias"][A]>
        : never;
    } &
      {
        [Key in keyof Omit<DST, "__alias">]: DST[Key] extends [
          any,
          infer PAYLOAD
        ]
          ? LastMapTypeSRCResolver<SRC[Key], PAYLOAD>
          : LastMapTypeSRCResolver<SRC[Key], DST[Key]>;
      }
  : {
      [Key in keyof DST]: DST[Key] extends [any, infer PAYLOAD]
        ? LastMapTypeSRCResolver<SRC[Key], PAYLOAD>
        : LastMapTypeSRCResolver<SRC[Key], DST[Key]>;
    };

type OperationToGraphQL<V, T> = <Z extends V>(o: Z | V, variables?: Record<string, any>) => Promise<MapType<T, Z>>;

type CastToGraphQL<V, T> = (
  resultOfYourQuery: any
) => <Z extends V>(o: Z | V) => MapType<T, Z>;

type fetchOptions = ArgsType<typeof fetch>;

export type SelectionFunction<V> = <T>(t: T | V) => T;
type FetchFunction = (query: string, variables?: Record<string, any>) => Promise<any>;


export declare function Thunder(
  fn: FetchFunction
):{
  query: OperationToGraphQL<ValueTypes["Query"],Query>
}

export declare function Chain(
  ...options: fetchOptions
):{
  query: OperationToGraphQL<ValueTypes["Query"],Query>
}

export declare const Zeus: {
  query: (o: ValueTypes["Query"]) => string
}

export declare const Cast: {
  query: CastToGraphQL<
  ValueTypes["Query"],
  Query
>
}

export declare const Selectors: {
  query: SelectionFunction<ValueTypes["Query"]>
}


export declare const Gql: ReturnType<typeof Chain>
