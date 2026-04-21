using Application.Activities.Commands;
using Application.Activities.DTO;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities() => await Mediator.Send(new GetActivityList.Query());
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id) => HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

    [HttpPost]
    public async Task<IActionResult> CreateActivity(CreateActivityDto activityDto) => HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));

    [HttpPut]
    public async Task<IActionResult> EditActivity(EditActivityDto activityDto) => HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activityDto }));

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(string id) => HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
}