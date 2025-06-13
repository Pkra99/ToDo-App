class ApiError extends Error{
    constructor(
        statusCode, 
        messsage = "somethign went wrong",
        errors  = [],
        stack = ""    
    ){
        super(messsage)
        this.statusCode = statusCode
        this.data = null
        this.messsage = messsage
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

export default ApiError;