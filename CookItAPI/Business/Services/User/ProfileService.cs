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
        Task<bool> CreateProfileAsync(ProfileRequest profile);
        Task<ProfileModel> GetProfileModelAsync(int profileID);
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
        public async Task<ProfileModel> GetProfileModelAsync(int profileID)
        {
            return await _profileRepo.GetProfileModelAsync(profileID);
        }
        //creates profile. Param is the profile object to post. Calls our blob service for uploading of profile image. passes to repo layer
        public async Task<bool> CreateProfileAsync(ProfileRequest profile)
        {
            string imageURL = await _blob.UploadBlob("profileimagescontainer", profile.UserId, profile.ProfilePicture);
            return await _profileRepo.CreateProfileAsync(profile, imageURL);
        }
    }
}
