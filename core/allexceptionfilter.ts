import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomHttpExceptionResponse, HttpExceptionResponse } from "../model/httpresponse.interface";


// this eception filter catches all errors and exception throws them and still keep on running the server. just the best practice of handling exception
@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception:unknown, host:ArgumentsHost){
        const ctx =host.switchToHttp()
        const response =ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status :HttpStatus
        let errormessage:string

        if (exception instanceof HttpException ){
            status= exception.getStatus()
            const errorResponse = exception.getResponse()
            errormessage= (errorResponse as HttpExceptionResponse).error || exception.message

        } else{
            status = HttpStatus.INTERNAL_SERVER_ERROR
            errormessage= "critical internal server error occured"

        }
        const errorResponse= this.getErrorResponse(status,errormessage,request)
        this.logError(errorResponse,request,exception)

    }

    //construction our error response 
    private getErrorResponse=(status:HttpStatus, errormessage:string, request:Request): CustomHttpExceptionResponse=>({
        statusCode:status,
        error:errormessage,
        path:request.url,
        method:request.method,
        timestamp: new Date()
    })

    //logging the error response 
     private logError=(errorResponse:CustomHttpExceptionResponse,request:Request, exception:unknown):void=>{
        const {statusCode,error}= errorResponse
        const {method, url} = request
        const errorlog =`
        Response code: ${statusCode} - Method: ${method} -Url: ${url} \n\n
        ${JSON.stringify(errorResponse)}\n\n
         User: ${JSON.stringify(request.user ?? "Not signed in")}
        ${exception instanceof HttpException ? exception.stack : error}\n\n
        `;
        console.log(7, errorlog) // temp to taste it 
     }
}