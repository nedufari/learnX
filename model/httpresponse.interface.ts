export interface  HttpExceptionResponse{
    statusCode:number //the status code for the error 
    error:string //the error thrown
}

export interface  CustomHttpExceptionResponse extends HttpExceptionResponse{
    path: string //route the user tries to access
    method:string //the method performed 
    timestamp:Date //the timestamp the error occured or was thrown
  
}