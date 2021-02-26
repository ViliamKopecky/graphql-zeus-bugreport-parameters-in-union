type ZEUS_INTERFACES = GraphQLTypes["Node"]
type ZEUS_UNIONS = never

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

export type ModelTypes = {
    ["Node"]: ModelTypes["Cat"] | ModelTypes["Dog"];
	["Cat"]: {
		id:string,
	isCat:boolean,
	relatedCats?:ModelTypes["Cat"][]
};
	["Dog"]: {
		id:string,
	isDog:boolean
};
	["Query"]: {
		getCatOrDog?:ModelTypes["Node"],
	getCat?:ModelTypes["Cat"],
	getDog?:ModelTypes["Dog"]
}
    }

export type GraphQLTypes = {
    ["Node"]: {
	__typename:"Cat" | "Dog"
	id: string
	['...on Cat']: '__union' & GraphQLTypes["Cat"];
	['...on Dog']: '__union' & GraphQLTypes["Dog"];
};
	["Cat"]: {
	__typename: "Cat",
	id: string,
	isCat: boolean,
	relatedCats: Array<GraphQLTypes["Cat"]> | null
};
	["Dog"]: {
	__typename: "Dog",
	id: string,
	isDog: boolean
};
	["Query"]: {
	__typename: "Query",
	getCatOrDog: GraphQLTypes["Node"] | null,
	getCat: GraphQLTypes["Cat"] | null,
	getDog: GraphQLTypes["Dog"] | null
}
    }



<<<<<<< HEAD

=======
>>>>>>> cf07ae9b78646df0b5d49572efb6c53e4d1abd2a
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
<<<<<<< HEAD

type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
=======
>>>>>>> cf07ae9b78646df0b5d49572efb6c53e4d1abd2a

type WithTypeNameValue<T> = T & {
  __typename?: true;
};
type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;

type NotUnionTypes<SRC extends DeepAnify<DST>, DST> = {
  [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
}[keyof DST];

type ExtractUnions<SRC extends DeepAnify<DST>, DST> = {
  [P in keyof SRC]: SRC[P] extends '__union' & infer R
    ? P extends keyof DST
      ? IsArray<R, DST[P] & { __typename: true }>
      : {}
    : never;
}[keyof SRC];

type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS
  ? ExtractUnions<SRC, DST> &
      {
        [P in keyof Omit<Pick<SRC, NotUnionTypes<SRC, DST>>, '__typename'>]: DST[P] extends true
          ? SRC[P]
          : IsArray<SRC[P], DST[P]>;
      }
  : {
      [P in keyof Pick<SRC, keyof DST>]: DST[P] extends true ? SRC[P] : IsArray<SRC[P], DST[P]>;
    };



type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
type InputType<SRC, DST> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P]>;
    } &
      MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>>
  : MapType<SRC, IsPayLoad<DST>>;
type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export type OperationToGraphQL<V, T> = <Z extends V>(o: Z | V, variables?: Record<string, any>) => Promise<InputType<T, Z>>;
export type SubscriptionToGraphQL<V, T> = <Z extends V>(
  o: Z | V,
  variables?: Record<string, any>,
) => {
  on: (fn: (args: InputType<T, Z>) => void) => void;
  off: (e: { data?: InputType<T, Z>; code?: number; reason?: string; message?: string }) => void;
  error: (e: { data?: InputType<T, Z>; message?: string }) => void;
  open: () => void;
};
export type CastToGraphQL<V, T> = (resultOfYourQuery: any) => <Z extends V>(o: Z | V) => InputType<T, Z>;
export type SelectionFunction<V> = <T>(t: T | V) => T;
export type fetchOptions = ArgsType<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (
  ...args: infer R
) => WebSocket
  ? R
  : never;
export type chainOptions =
  | [fetchOptions[0], fetchOptions[1] & {websocket?: websocketOptions}]
  | [fetchOptions[0]];
export type FetchFunction = (
  query: string,
  variables?: Record<string, any>,
) => Promise<any>;
export type SubscriptionFunction = (
  query: string,
  variables?: Record<string, any>,
) => void;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export declare function Thunder(
  fn: FetchFunction
):{
  query: OperationToGraphQL<ValueTypes["Query"],GraphQLTypes["Query"]>
}

export declare function Chain(
  ...options: chainOptions
):{
  query: OperationToGraphQL<ValueTypes["Query"],GraphQLTypes["Query"]>
}

export declare const Zeus: {
  query: (o: ValueTypes["Query"]) => string
}

export declare const Cast: {
  query: CastToGraphQL<
  ValueTypes["Query"],
  GraphQLTypes["Query"]
>
}

export declare const Selectors: {
  query: SelectionFunction<ValueTypes["Query"]>
}

export declare const resolverFor : <
  T extends keyof ValueTypes,
  Z extends keyof ValueTypes[T],
  Y extends (
    args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> : any
>(
  type: T,
  field: Z,
  fn: Y,
) => (args?:any, source?:any) => void;

export declare const Gql: ReturnType<typeof Chain>
