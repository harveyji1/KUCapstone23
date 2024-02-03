using Persistence.Models;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Business.Helpers
{
    public static class ModelConversionHelper
    {
        public static ProfileResponseDTO ProfileModelToResponseDTO(ProfileModel model)
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
                ProfilePicture = model.ProfilePicture,
                Posts = PostModelsToPostResponseDTO(model.Posts)
            };
        }

        public static List<PostResponseDTO> PostModelsToPostResponseDTO(List<PostModel> posts)
        {
            List<PostResponseDTO> postContainer = new List<PostResponseDTO>();

            foreach (PostModel post in posts)
            {
                postContainer.Add(new PostResponseDTO
                {
                    ID = post.ID,
                    Title = post.Title,
                    Ingredients = post.Ingredients,
                    Instructions = post.Instructions,
                    Cost = post.Cost,
                    PrepTime = post.PrepTime,
                    NumOfLikes = post.NumOfLikes,
                    Image = post.PostImage
                });
            }

            return postContainer;
        }

        public static ProfileModel ProfileRequestDTOToModel(ProfileRequest profile)
        {
            return new ProfileModel
            {
                FullName = profile.FullName,
                Bio = profile.Bio
            };
        }

        public static PostModel PostRequestDTOToModel(PostRequest postRequest)
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
