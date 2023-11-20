using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Request;
using System.ComponentModel.DataAnnotations;

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
        
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile(int profileID)
        {
            return Ok(await _profileService.GetProfileModelAsync(profileID));
        }

        /// <summary>
        /// Passes to service layer for processing
        /// </summary>
        /// <param name="profile">Profile object</param>
        /// <returns>Http status code</returns>

        [HttpPost("profile")]
        public async Task<IActionResult> CreateProfileAsync([FromForm] ProfileRequest profile)
        {
            if (await _profileService.CreateProfileAsync(profile))
            {
                return Ok();
            }
            return BadRequest();

        }


    }
}
