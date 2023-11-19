using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Shared.Request;


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
        

        [HttpPost("posts")]
        public async Task<IActionResult> CreatePostAsync([FromForm] PostRequest post)
        {
            if (await _postService.CreatePostAsync(post))
            {
                return Ok();
            }
            return BadRequest();
            
        }


    }
}
