using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Shared.DTOs;
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
        public async Task<IActionResult> CreatePostAsync([FromForm] PostRequestDTO post)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            if (await _postService.CreatePostAsync(post, userId))
            {
                return Ok();
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPost("upvote")]
        public async Task<IActionResult> UpvoteAsync(int postID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            await _postService.UpvoteAsync(postID, userId);
            return Ok();
        }

        [Authorize]
        [HttpPost("revertUpvote")]
        public async Task<IActionResult> RevertUpvoteAsync(int postID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            await _postService.RevertUpvoteAsync(postID, userId);
            return Ok();
        }

        [Authorize]
        [HttpPost("downvote")]
        public async Task<IActionResult> DownvoteAsync(int postID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            await _postService.DownvoteAsync(postID, userId);
            return Ok();
        }

        [Authorize]
        [HttpPost("revertDownvote")]
        public async Task<IActionResult> RevertDownvoteAsync(int postID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            await _postService.RevertDownvoteAsync(postID, userId);
            return Ok();
        }


    }
}
