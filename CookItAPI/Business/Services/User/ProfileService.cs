using Business.Helpers;
using Business.Services.Azure;
using Microsoft.AspNetCore.Http;
using Persistence.Models;
using Persistence.Repositories;
using Shared.DTOs;
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
        Task<ProfileResponseDTO> GetProfileModelAsync(int userID);
        Task<ProfileResponseDTO> GetProfileByProfileIdAsync(int profileID, int userID);
        Task<ProfileResponseDTO> EditProfileAsync(ProfileRequestDTO profile, int userID);
        Task<ProfileResponseDTO> UploadProfileImageAsync(IFormFile image, int userID);
        Task<bool> FollowAsync(int profileID, int userID);
        Task<bool> UnfollowAsync(int profileID, int userID);

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
        public async Task<ProfileResponseDTO> GetProfileModelAsync(int userID)
        {
            return ModelConversionHelper.ProfileModelToResponseDTO(await _profileRepo.GetProfileModelAsync(userID));
        }

        public async Task<ProfileResponseDTO> GetProfileByProfileIdAsync(int profileID, int userID)
        {
            return ModelConversionHelper.ProfileModelToResponseDTO(await _profileRepo.GetProfileByProfileIdAsync(profileID, userID));
        }

        public async Task<ProfileResponseDTO> EditProfileAsync(ProfileRequestDTO profile, int userID)
        {
            var response = await _profileRepo.EditProfileAsync(ModelConversionHelper.ProfileRequestDTOToModel(profile), userID);
            return ModelConversionHelper.ProfileModelToResponseDTO(response);
        }

        public async Task<ProfileResponseDTO> UploadProfileImageAsync(IFormFile image, int userID)
        {
            string imageURL = await _blob.UploadBlob("profileimagescontainer", userID, image);
            return ModelConversionHelper.ProfileModelToResponseDTO(await _profileRepo.UploadProfileImageAsync(imageURL, userID));
        }

        public async Task<bool> FollowAsync(int profileID, int userID)
        {
            return await _profileRepo.FollowAsync(profileID, userID);
        }

        public async Task<bool> UnfollowAsync(int profileID, int userID)
        {
            return await _profileRepo.UnfollowAsync(profileID, userID);
        }

    }
}
