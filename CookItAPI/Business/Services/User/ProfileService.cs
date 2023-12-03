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
    //profile interface
    public interface IProfileService
    {
        Task<bool> CreateProfileAsync(ProfileRequest profile, int userID);
        Task<ProfileModel> GetProfileModelAsync(int userID);
    }

    //profile class. handles crud related functionality for profile
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepo;
        private readonly IBlobService _blob;

        public ProfileService(IProfileRepository profileRepo, IBlobService blob)
        {
            _profileRepo = profileRepo;
            _blob = blob;
        }


        //retrieves profile. This will take userid in the future
        public async Task<ProfileModel> GetProfileModelAsync(int userID)
        {
            return await _profileRepo.GetProfileModelAsync(userID);
        }
        //creates profile. Param is the profile object to post. Calls our blob service for uploading of profile image. passes to repo layer
        public async Task<bool> CreateProfileAsync(ProfileRequest profile, int userID)
        {
            string imageURL = await _blob.UploadBlob("profileimagescontainer", userID, profile.ProfilePicture);
            return await _profileRepo.CreateProfileAsync(profile, imageURL, userID);
        }

    }
}
