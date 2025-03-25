using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private readonly WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp) => _waterContext = temp;

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {

            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            var totalNumProjects = query.Count();

            var projectList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();


            var response = new
            {
                Projects = projectList,
                TotalNumProjects = totalNumProjects
            };

            return Ok(response);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
            return Ok(projectTypes);
        }
    }
}
