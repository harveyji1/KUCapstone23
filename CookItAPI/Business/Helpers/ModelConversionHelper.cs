using Newtonsoft.Json;
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
                ProfileID = model.Id,
                FullName = model.FullName,
                Bio = model.Bio,
                FollowerCount = model.FollowerCount,
                FollowingCount = model.FollowingCount,
                PostCount = model.PostCount,
                PrivateAccount = model.PrivateAccount,
                VerifiedAccount = model.VerifiedAccount,
                ProfilePicture = model.ProfilePicture,
                Posts = PostModelsToPostResponseDTO(model.Posts),
                Handle = model.Handle,
                IsFollowedByUser = model.IsFollowedByUser
            };
        }

        public static List<PostResponseDTO> PostModelsToPostResponseDTO(List<PostModel> posts)
        {
            List<PostResponseDTO> postContainer = new List<PostResponseDTO>();
            if (posts != null)
            {
                foreach (PostModel post in posts)
                {
                    // Initialize the postDto with basic post information
                    var postDto = new PostResponseDTO
                    {
                        ID = post.ID,
                        Title = post.Title,
                        Description = post.Description,
                        Ingredients = post.Ingredients,
                        Instructions = post.Instructions,
                        Cost = post.Cost,
                        PrepTime = post.PrepTime,
                        NumOfLikes = post.NumOfLikes,
                        NumOfDislikes = post.NumOfDislikes,
                        NumOfComments = post.NumOfComments,
                        Image = post.PostImage,
                        CreatedAt = post.CreatedAt,
                        IsLikedByUser = post.IsLikedByUser,
                        IsDislikedByUser = post.IsDislikedByUser,
                        Handle = post.Profile.Handle,
                        ProfileImage = post.Profile.ProfilePicture,
                        Comments = new List<CommentResponseDTO>(),
                        SavedCount = post.SavedCount
                    };

                    if (post != null && post.Comments != null && post.Comments.Any())
                    {
                        postDto.Comments = post.Comments
                            .Where(comment => comment != null) // Ensure the comment is not null
                            .Select(comment =>
                            {
                                var handle = "Unknown";
                                var profilePicture = "DefaultImagePath";

                                if (comment.User != null)
                                {
                                    handle = comment.User.Profile?.Handle ?? "Unknown";
                                    profilePicture = comment.User.Profile?.ProfilePicture ?? "DefaultImagePath";
                                }

                                return new CommentResponseDTO
                                {
                                    UserID = comment.UserID,
                                    Comment = comment.Comment,
                                    Handle = handle,
                                    ProfilePicture = profilePicture,
                                    CreatedAt = comment.CreatedAt
                                };
                            }).ToList();
                    }

                    postContainer.Add(postDto);
                }
            }

            return postContainer;
        }



        public static ProfileModel ProfileRequestDTOToModel(ProfileRequestDTO profile)
        {
            return new ProfileModel
            {
                FullName = profile.FullName,
                Bio = profile.Bio,
            };
        }

        public static PostModel PostRequestDTOToModel(PostRequestDTO postRequest)
        {
            return new PostModel
            {
                Title = postRequest.Title,
                Description = postRequest.Description,
                Ingredients = JsonConvert.SerializeObject(postRequest.Ingredients),
                Instructions = JsonConvert.SerializeObject(postRequest.Instructions),
                Cost = postRequest.Cost,
                PrepTime = postRequest.PrepTime            
            };
        }

        public static CommentModel CommentRequestDTOToModel(CommentRequestDTO comment, int userID)
        {
            return new CommentModel
            {
                PostID = comment.PostID,
                Comment = comment.Comment,
                UserID = userID
            };
        }
    }
}
