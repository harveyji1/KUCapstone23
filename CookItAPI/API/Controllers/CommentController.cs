using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.DTOs;
using System.Security.Claims;

//Comments controller.
//Create new comment that will be attached to a post

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IBlobService _blobService;
        private readonly ICommentService _service;

        public CommentController(IBlobService blobService, ICommentService service)
        {
            _blobService = blobService;
            _service = service;
        }

        [Authorize]
        [HttpPost("comment")]
        public async Task<IActionResult> CreateCommentAsync([FromBody] CommentRequestDTO comment)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);
            await _service.CreateCommentAsync(comment, userId);
            return Ok();
        }
    }
}
