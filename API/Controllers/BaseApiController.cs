using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MediatR;
using Application.Core;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("Mediator not found");
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.isSuccess && result.Code == 404) return NotFound();
            if (result.isSuccess && result.Value != null) return Ok(result.Value);
            return BadRequest(result.Error);
        }
    }
}