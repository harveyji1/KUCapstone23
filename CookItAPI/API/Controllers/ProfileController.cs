using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace API.Controllers
{
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

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            int.TryParse(userID, out var userId);

            return Ok(await _profileService.GetProfileModelAsync(userId));
        }

        [HttpPost("testProfileImageUpload")]
        public async Task<IActionResult> UploadProfileImage([FromForm] IFormFile image,  [FromForm]string fileName)
        {
            return Ok(await _blobService.UploadBlob(image, fileName));
        }

        
    }
}
