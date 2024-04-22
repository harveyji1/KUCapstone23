using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

//Simple search endpoint. Searching via username

namespace API.Controllers
{
    [Route("api/v1.0")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [Authorize]
        [HttpGet("Search")]
        public async Task<ActionResult> SearchProfilesAsync(string keyWord)
        {
            return Ok(await _searchService.SearchProfilesAsync(keyWord));
        }
    }
}
