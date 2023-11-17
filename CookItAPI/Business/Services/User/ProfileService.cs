using Business.Services.Azure;
using Persistence.Models;
using Persistence.Repositories;
using Shared.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    
    public interface IProfileService
    {
        Task<bool> CreateProfileAsync(ProfileRequest profile);
        Task<ProfileModel> GetProfileModelAsync(int profileID);
    }

    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepo;
        private readonly IBlobService _blob;

        public ProfileService(IProfileRepository profileRepo, IBlobService blob)
        {
            _profileRepo = profileRepo;
            _blob = blob;
        }



        public async Task<ProfileModel> GetProfileModelAsync(int profileID)
        {
            return await _profileRepo.GetProfileModelAsync(profileID);
        }

        public async Task<bool> CreateProfileAsync(ProfileRequest profile)
        {
            string imageURL = await _blob.UploadBlob("profileimagescontainer", profile.UserId, profile.ProfilePicture);
            return await _profileRepo.CreateProfileAsync(profile, imageURL);
        }
    }
}
