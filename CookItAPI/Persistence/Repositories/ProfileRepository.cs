using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Models;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;




namespace Persistence.Repositories
{
    
    //profile repo interface
    public interface IProfileRepository
    {
        Task<bool> CreateProfileAsync(ProfileRequest profile, string imageURL, int userID);
        Task<ProfileModel> GetProfileModelAsync(int profileID);
        Task<ProfileModel> EditProfileAsync(ProfileModel profile, int userID);
        Task<ProfileModel> UploadProfileImageAsync(string imageURL, int userID);

    }

    //profile repo class. gets profile, edit profile, etc. (Crud func)
    public class ProfileRepository : IProfileRepository
    {
        private readonly SqlServerContext _context;

        public ProfileRepository(SqlServerContext context)
        {
            _context = context;
        }

        /// <summary>
        /// fetches profile from db
        /// </summary>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public async Task<ProfileModel> GetProfileModelAsync(int userID)
        {
            var profile = await _context.Profiles.Include("Posts").SingleOrDefaultAsync(profile => profile.UserId == userID);
            return profile;
        }

        /// <summary>
        /// Create/edit profile
        /// </summary>
        /// <param name="profile"></param>
        /// <param name="imageURL"></param>
        /// <returns></returns>
        public async Task<bool> CreateProfileAsync(ProfileRequest profile, string imageURL, int userID)
        {
            ProfileModel profileModel = new ProfileModel
            {
                ProfilePicture = imageURL,
                Bio = profile.Bio,
                FullName = profile.FullName,
                UserId = userID
            };
            _context.Profiles.Add(profileModel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ProfileModel> EditProfileAsync(ProfileModel profile, int userID)
        {
            var updatedProfile = await _context.Profiles.SingleOrDefaultAsync(profile => profile.UserId == userID);

            updatedProfile.FullName = profile.FullName;
            updatedProfile.Bio = profile.Bio;

            _context.SaveChanges();

            return updatedProfile;
        }

        public async Task<ProfileModel> UploadProfileImageAsync(string imageURL, int userID)
        {
            var profile = await _context.Profiles.SingleOrDefaultAsync(p => p.UserId == userID);
            profile.ProfilePicture = imageURL;
            await _context.SaveChangesAsync();
            return profile;
        }
    }
}
