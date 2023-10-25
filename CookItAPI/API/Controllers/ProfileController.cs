using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v1.0")]
    [ApiController]
    public class ProfileController : Controller
    {
        
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            
            _profileService = profileService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile(int profileID)
        {
            return Ok(await _profileService.GetProfileModelAsync(profileID));
        }

        
    }
}
