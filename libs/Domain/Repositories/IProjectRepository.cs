using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;
using Domain.Repositories;

namespace Domain.Repositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        // Add any project-specific methods here if needed
    }
}
