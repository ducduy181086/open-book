using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using quiz_app.Data;
using quiz_app.Models;

namespace quiz_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpenBookController : ControllerBase
    {
        private readonly ILogger<OpenBookController> logger;
        private readonly ApplicationDbContext applicationDbContext;

        public OpenBookController(
            ILogger<OpenBookController> logger,
            ApplicationDbContext applicationDbContext)
        {
            this.logger = logger;
            this.applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryParam queryParam)
        {
            var query = applicationDbContext.BookItems.OrderBy(c => c.Id);
            var items = await query
                .Skip(queryParam.Take * queryParam.PageIndex)
                .Take(queryParam.Take)
                .Select(m => new BookItemModel(m))
                .ToListAsync(HttpContext.RequestAborted);

            return Ok(new { Total = query.Count(), Items = items });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id = 0)
        {
            var model = await applicationDbContext.BookItems
                .Where(c => c.Id == id)
                .Select(m => new BookItemModel(m))
                .FirstOrDefaultAsync(HttpContext.RequestAborted);
            return Ok(new { Model = model });
        }
    }
}
