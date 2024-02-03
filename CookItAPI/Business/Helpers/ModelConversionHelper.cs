using Persistence.Models;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Helpers
{
    public static class ModelConversionHelper
    {
        public static ProfileResponseDTO ProfileModelToDTO(ProfileModel model)
        {
            return new ProfileResponseDTO
            {
                FullName = model.FullName,
                Bio = model.Bio,
                FollowerCount = model.FollowerCount,
                FollowingCount = model.FollowingCount,
                PostCount = model.PostCount,
                PrivateAccount = model.PrivateAccount,
                VerifiedAccount = model.VerifiedAccount,
                ProfilePicture = model.ProfilePicture
            };
        }

        public static ProfileModel ProfileRequestDTOToModel(ProfileRequest profile)
        {
            return new ProfileModel
            {
                FullName = profile.FullName,
                Bio = profile.Bio
            };
        }

        public static PostModel PostModelToDTO(PostRequest postRequest)
        {
            return new PostModel
            {
                Title = postRequest.Title,
                Ingredients = postRequest.Ingredients,
                Instructions = postRequest.Instructions,
                Cost = postRequest.Cost,
                PrepTime = postRequest.PrepTime            
            };
        }
    }
}
