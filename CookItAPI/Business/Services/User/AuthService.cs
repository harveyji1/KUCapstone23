using Azure.Core.GeoJson;
using Microsoft.AspNet.Identity;
using Persistence.Models;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(string username, string password, string email, string handle);
        Task<bool> LoginUserAsync(string username, string password);
    }


    public class AuthService : IAuthService
    {
        
            private readonly IUserRepository _userRepository;
            private readonly IPasswordHasher _passwordHasher;

            public AuthService(IUserRepository userRepository, IPasswordHasher passwordHasher)
            {
                _userRepository = userRepository;
                _passwordHasher = passwordHasher;
            }

            public async Task<bool> RegisterUserAsync(string username, string password, string email, string handle)
            {
                var existingUser = await _userRepository.GetUserByUsernameAsync(username);
                if (existingUser != null) return false;

                var hashedPassword = _passwordHasher.HashPassword(password);
                var user = new UserModel { Username = username, HashedPassword = hashedPassword, Email = email, IsActive = true, Creationdate = DateTime.UtcNow, Profile = new ProfileModel { Handle = handle } };

                await _userRepository.AddUserAsync(user);
                return true;
            }

            public async Task<bool> LoginUserAsync(string username, string password)
            {
                var user = await _userRepository.GetUserByUsernameAsync(username);
                if (user == null) return false;

                var verificationResult = _passwordHasher.VerifyHashedPassword(user.HashedPassword, password);
                return verificationResult == PasswordVerificationResult.Success;
            }
        }
}
