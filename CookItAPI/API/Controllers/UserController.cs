using Business.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //user controller. Login and register functionality

    [Route("api/v1.0")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IAuthService _authService;

        public UserController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Passes to service layer for processing
        /// </summary>
        /// <param name="username">username</param>
        /// /// <param name="password">password</param>
        /// <returns>Http status code</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var result = await _authService.LoginUserAsync(username, password);
            if (result == "Error") return Unauthorized("Invalid username or password.");
            return Ok(result);
        }

        /// <summary>
        /// Passes to service layer for processing
        /// </summary>
        /// <param name="username">username</param>
        /// <param name="password">password</param>
        /// /// <param name="email">email</param>
        /// <returns>Http status code</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password, string email)
        {
            var result = await _authService.RegisterUserAsync(username, password, email);
            if (result == "Error") return BadRequest("Username already exists");
            return Ok(result);
        }
    }
}
