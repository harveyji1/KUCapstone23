using Business.Services.Azure;
using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

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

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile(int profileID)
        {
            return Ok(await _profileService.GetProfileModelAsync(profileID));
        }

        [HttpPost("testProfileImageUpload")]
        public async Task<IActionResult> UploadProfileImage([FromForm] IFormFile image,  [FromForm]string fileName)
        {
            return Ok(await _blobService.UploadBlob(image, fileName));
        }

        
    }
}
