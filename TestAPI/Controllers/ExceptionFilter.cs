using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TestAPI.Controllers
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var statusCode = StatusCodes.Status500InternalServerError;
            var message = context.Exception.Message;
            var exceptionType = context.Exception.GetType().Name;
            var timestamp = DateTime.UtcNow;

            if (context.Exception is ArgumentOutOfRangeException || context.Exception is ArgumentException)
            {
                statusCode = StatusCodes.Status400BadRequest;
            }

            context.Result = new ObjectResult(new
            {
                message,
                exceptionType,
                timestamp
            })
            {
                StatusCode = statusCode
            };
            context.ExceptionHandled = true;
        }
    }
}
