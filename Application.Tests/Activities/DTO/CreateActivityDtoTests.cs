using System.ComponentModel.DataAnnotations;
using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using Domain;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace Application.Tests.Activities.DTO;

public class CreateActivityDtoTests
{
    private static CreateActivityDto ValidDto() => new()
    {
        Title = "Test",
        Date = new DateTime(2026, 6, 1, 12, 0, 0, DateTimeKind.Utc),
        Description = "Desc",
        Category = "music",
        City = "London",
        Venue = "Venue",
        Latitude = 51.5,
        Longitude = -0.12,
    };

    private static IList<ValidationResult> Validate(object instance)
    {
        var results = new List<ValidationResult>();
        var context = new ValidationContext(instance);
        Validator.TryValidateObject(instance, context, results, validateAllProperties: true);
        return results;
    }

    [Fact]
    public void Valid_dto_passes_data_annotations_validation()
    {
        var dto = ValidDto();
        var errors = Validate(dto);
        Assert.Empty(errors);
    }

    [Theory]
    [InlineData(nameof(CreateActivityDto.Title))]
    [InlineData(nameof(CreateActivityDto.Description))]
    [InlineData(nameof(CreateActivityDto.Category))]
    [InlineData(nameof(CreateActivityDto.City))]
    [InlineData(nameof(CreateActivityDto.Venue))]
    public void Required_string_property_empty_fails_validation(string propertyName)
    {
        var dto = ValidDto();
        typeof(CreateActivityDto).GetProperty(propertyName)!.SetValue(dto, "");
        var errors = Validate(dto);
        Assert.NotEmpty(errors);
        Assert.Contains(errors, e => e.MemberNames.Contains(propertyName));
    }

    [Fact]
    public void Maps_to_Activity_via_AutoMapper_with_expected_fields()
    {
        var config = new MapperConfiguration(
            cfg => cfg.AddProfile<MappingProfiles>(),
            NullLoggerFactory.Instance);
        config.AssertConfigurationIsValid();
        var mapper = config.CreateMapper();

        var dto = ValidDto();
        var activity = mapper.Map<Activity>(dto);

        Assert.NotNull(activity.Id);
        Assert.NotEqual(Guid.Empty.ToString(), activity.Id);
        Assert.Equal(dto.Title, activity.Title);
        Assert.Equal(dto.Date, activity.Date);
        Assert.Equal(dto.Description, activity.Description);
        Assert.Equal(dto.Category, activity.Category);
        Assert.False(activity.IsCancelled);
        Assert.Equal(dto.City, activity.City);
        Assert.Equal(dto.Venue, activity.Venue);
        Assert.Equal(dto.Latitude, activity.Latitude);
        Assert.Equal(dto.Longitude, activity.Longitude);
    }
}
