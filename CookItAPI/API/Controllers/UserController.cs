using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v1.0")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IAuthService _authService;

        public UserController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var result = await _authService.LoginUserAsync(username, password);
            if (!result) return Unauthorized("Invalid username or password.");
            return Ok("Login successful.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password, string email, string handle)
        {
            var result = await _authService.RegisterUserAsync(username, password, email, handle);
            if (!result) return BadRequest("Username already exists or invalid data.");
            return Ok("Registration successful.");
        }
    }
}
