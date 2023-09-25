


using Microsoft.AspNetCore.Identity;
using Persistence.Models;
using Persistence.Repositories;

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
           

            public AuthService(IUserRepository userRepository)
            {
                _userRepository = userRepository;
                
            }

            public async Task<bool> RegisterUserAsync(string username, string password, string email, string handle)
            {
                var existingUser = await _userRepository.GetUserByUsernameAsync(username);
                if (existingUser != null) return false;
                var passwordHasher = new PasswordHasher<UserModel>();

                var hashedPassword = passwordHasher.HashPassword(null, password);
                var user = new UserModel { Username = username, HashedPassword = hashedPassword, Email = email, IsActive = true, Creationdate = DateTime.UtcNow, Profile = new ProfileModel { Handle = handle } };

                await _userRepository.AddUserAsync(user);
                return true;
            }

            public async Task<bool> LoginUserAsync(string username, string password)
            {
                var user = await _userRepository.GetUserByUsernameAsync(username);
                if (user == null) return false;

                var passwordHasher = new PasswordHasher<UserModel>();

                var result = passwordHasher.VerifyHashedPassword(user, user.HashedPassword, password);

                return result == PasswordVerificationResult.Success;
            }
        }
}
