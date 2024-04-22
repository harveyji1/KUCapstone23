using Azure.Core;
using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.DTOs;
using System.ComponentModel.Design;
using System.Security.Claims;

//Save endpoint
//Used when a user wants to save a post to their "Saved" list (bookmarking)

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly IListService _service;

        public ListController(IListService service)
        {
            _service = service;
        }

        [HttpPost("createList")]
        [Authorize]
        public async Task<IActionResult> CreateListAsync(ListRequestDTO request)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            return Ok(await _service.CreateListAsync(userId, request));
        }

        [HttpGet("getUserLists")]
        [Authorize]
        public async Task<IActionResult> GetUserListsAsync()
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            return Ok(await _service.GetUserListsAsync(userId));
        }

        [HttpDelete("deleteUserList")]
        [Authorize]
        public async Task<IActionResult> DeleteListAsync(int listID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            return Ok(await _service.DeleteListAsync(userId, listID));
        }

        [HttpPost("saveRecipeToList")]
        [Authorize]
        public async Task<IActionResult> SaveRecipeAsync(int listID, int postID)
        {
            if (await _service.SaveRecipeAsync(listID, postID))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("deleteRecipeFromList")]
        [Authorize]
        public async Task<IActionResult> DeleteRecipeFromListAsync(int listID, int postID)
        {
            if (await _service.DeleteRecipeFromListAsync(listID, postID))
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
