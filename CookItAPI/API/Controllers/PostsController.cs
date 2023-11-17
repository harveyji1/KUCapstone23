using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Shared.Request;


namespace API.Controllers
{
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
