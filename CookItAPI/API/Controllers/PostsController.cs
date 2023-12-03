using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Shared.Request;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace API.Controllers
{

    /// <summary>
    /// Posts controller
    /// </summary>
    /// <remarks>
    /// Will handle all crud related ops for post objects
    /// </remarks>

    [Route("api/v1.0")]
    [ApiController]
    public class PostsController : Controller
    {

        private readonly IPostService _postService;
        private readonly IBlobService _blobService;

        public PostsController(IPostService postService, IBlobService blobService)
        {
            _postService = postService;
            _blobService = blobService;
        }


        /// <summary>
        /// Passes to service layer for processing
        /// </summary>
        /// <param name="post">Post object</param>
        /// <returns>Http status code</returns>

        [Authorize]
        [HttpPost("posts")]
        public async Task<IActionResult> CreatePostAsync([FromForm] PostRequest post)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            if (await _postService.CreatePostAsync(post, userId))
            {
                return Ok();
            }
            return BadRequest();
            
        }


    }
}
