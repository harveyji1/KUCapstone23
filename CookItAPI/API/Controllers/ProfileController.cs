using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.DTOs;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace API.Controllers
{
    /// <summary>
    /// Profile controller
    /// </summary>
    /// <remarks>
    /// Will handle all crud related ops for profile objects
    /// </remarks>

    [Route("api/v1.0")]
    [ApiController]
    public class ProfileController : Controller
    {
        
        private readonly IProfileService _profileService;
        private readonly IBlobService _blobService;

        public ProfileController(IProfileService profileService, IBlobService blobService)
        {
            
            _profileService = profileService;
            _blobService = blobService;
        }

        /// <summary>
        /// Passes to service layer for processing
        /// </summary>
        /// <param name="profileID">ID of profile for now. will take token later as this will contain the userid</param>
        /// <returns>Http status code</returns>
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);
            return Ok(await _profileService.GetProfileModelAsync(userId));
        }

        /// <summary>
        /// Passes to service layer for processing
        /// </summary>
        /// <param name="profile">Profile object</param>
        /// <returns>Http status code</returns>
        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> EditProfileAsync([FromBody] ProfileRequestDTO profile)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            return Ok(await _profileService.EditProfileAsync(profile, userId));
            

        }

        [Authorize]
        [HttpPut("profileImage")]
        public async Task<IActionResult> UploadProfileImageAsync(IFormFile image)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            return Ok(await _profileService.UploadProfileImageAsync(image, userId));
        }

        [Authorize]
        [HttpPost("follow")]
        public async Task<IActionResult> FollowAsync(int profileID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            if (await _profileService.FollowAsync(profileID, userId))
            {
                return Ok();
            }
            return BadRequest();
        }

        [Authorize]
        [HttpDelete("unfollow")]
        public async Task<IActionResult> UnfollowAsync(int profileID)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(userID, out var userId);

            if (await _profileService.UnfollowAsync(profileID, userId))
            {
                return Ok();
            }
            return BadRequest();
        }


    }
}
