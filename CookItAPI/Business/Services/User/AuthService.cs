

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence.Models;
using Persistence.Repositories;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Business.Services.User
{
    public interface IAuthService
    {
        Task<string> RegisterUserAsync(string username, string password, string email, string handle);
        Task<string> LoginUserAsync(string username, string password);
    }


    public class AuthService : IAuthService
    {

        private readonly IUserRepository _userRepository;
        private IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;

        }

        public async Task<string> RegisterUserAsync(string username, string password, string email, string handle)
        {
            var existingUser = await _userRepository.GetUserByUsernameAsync(username);
            if (existingUser != null) return "Error";
            var passwordHasher = new PasswordHasher<UserModel>();

            var hashedPassword = passwordHasher.HashPassword(null, password);
            var user = new UserModel { Username = username, HashedPassword = hashedPassword, Email = email, IsActive = true, Creationdate = DateTime.UtcNow, Profile = new ProfileModel { Handle = handle } };

            await _userRepository.AddUserAsync(user);

            return GenerateToken(user.Id, user.Username, _configuration["JwtSettings:Key"], _configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"]); ;
        }

        public async Task<string> LoginUserAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null) return "Error";

            var passwordHasher = new PasswordHasher<UserModel>();

            var result = passwordHasher.VerifyHashedPassword(user, user.HashedPassword, password);

            if(result == PasswordVerificationResult.Success)
            {
                return GenerateToken(user.Id, user.Username, _configuration["JwtSettings:Key"], _configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"]);
            }

            return "Error";
        }


        private string GenerateToken(int id, string username, string key, string issuer, string audience)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, username)
                
           };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            var token = tokenHandler.WriteToken(securityToken);
            return token;
        }
    }
}
