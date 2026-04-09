using System;
using FluentValidation;
using MediatR;
using Persistence;


namespace Application.Core;

public class ValidationBehaviour<TRequest, TResponse>(IValidator<TRequest>? validator = null) : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator == null) return await next();
        var validtionResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validtionResult.IsValid)
        {
            throw new ValidationException(validtionResult.Errors);
        }
        return await next();
    }
}
