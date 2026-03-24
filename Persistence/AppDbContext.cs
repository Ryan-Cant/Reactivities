using System;
using Domain;
using Microsoft.EntityFrameworkCore;
namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    //This is where we will add our DbSets and override the OnModelCreating method to configure our entities
    public required DbSet<Activity> Activities { get; set; }
}