export type ValidationError={

 type:string

 loc:(string|number)[]

 msg:string

 input?:unknown

}

export type ApiErrorPayload={

 error?:{

  code?:string

  meta?:Record<string,unknown>

 }

 detail?:string | ValidationError[]

}

export class ApiError extends Error{

 public readonly code:string

 public readonly status:number

 public readonly meta?:Record<string,unknown>

 constructor(

  message:string,

  code:string,

  status:number,

  meta?:Record<string,unknown>

 ){

  super(message)

  this.name="ApiError"

  this.code=code

  this.status=status

  this.meta=meta

 }

}

export function parseApiError(

 response:Response,

 payload:ApiErrorPayload|null

){

 let errorCode="unknown_error"

 if(typeof payload?.detail==="string"){

  errorCode=payload.detail

 }
 else if(
  Array.isArray(payload?.detail)
 ){

  errorCode=

   payload.detail[0]?.msg
   ?? "validation_error"

 }
 else if(
  payload?.error?.code
 ){

  errorCode=
   payload.error.code

 }

 return new ApiError(

  errorCode,

  errorCode,

  response.status,

  payload?.error?.meta

 )

}

export function networkError(){

 return new ApiError(

  "network_error",

  "network_error",

  0

 )

}

export function unauthorizedError(){

 return new ApiError(

  "unauthorized",

  "unauthorized",

  401

 )

}

export function isApiError(

 error:unknown

):error is ApiError{

 return error instanceof ApiError

}