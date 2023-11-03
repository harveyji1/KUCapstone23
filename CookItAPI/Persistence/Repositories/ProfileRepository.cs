using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Models;
using Shared.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;




namespace Persistence.Repositories
{
    public interface IProfileRepository
    {
        Task<ProfileDTO> GetProfileModelAsync(int userID);
    }

    public class ProfileRepository : IProfileRepository
    {
        private readonly SqlServerContext _context;

        public ProfileRepository(SqlServerContext context)
        {
            _context = context;
        }


        public async Task<ProfileDTO> GetProfileModelAsync(int userID)
        {
            ProfileModel profile = await _context.Profiles.SingleOrDefaultAsync(profile => profile.UserId == userID);
            return new ProfileDTO
            {
                FullName = profile.FullName,
                Bio = profile.Bio,
                FollowerCount = profile.FollowerCount,
                FollowingCount = profile.FollowingCount,
                PostCount = profile.PostCount,
                PrivateAccount = profile.PrivateAccount,
                VerifiedAccount = profile.VerifiedAccount,
                ProfilePicture = profile.ProfilePicture
            };
        }
    }
}
