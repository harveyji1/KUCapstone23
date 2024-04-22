using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.DTOs;
using System.Security.Claims;

//Feed controller. Get user feed for home page.

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {

        private readonly IBlobService _blobService;
        private readonly IFeedService _service;

        public FeedController( IBlobService blobService, IFeedService service)
        {
            _blobService = blobService;
            _service = service;
        }

        [Authorize]
        [HttpGet("getFeed")]
        public async Task<IActionResult> GetFeedAsync()
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            return Ok(await _service.GetFeedAsync(userId));
        }

    }
}
