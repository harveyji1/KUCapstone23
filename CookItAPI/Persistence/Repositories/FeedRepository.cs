using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Repo layer for feed. Gets feed for user based on following

namespace Persistence.Repositories
{
    public interface IFeedRepository
    {
        Task<List<PostModel>> GetFeedAsync(int userID);
    }

    public class FeedRepository : IFeedRepository
    {
        private readonly SqlServerContext _context;

        public FeedRepository(SqlServerContext context)
        {
            _context = context;
        }

        public async Task<List<PostModel>> GetFeedAsync(int userID)
        {

            var userProfile = await _context.Profiles
        .FirstOrDefaultAsync(p => p.UserId == userID);

            if (userProfile == null)
            {
                return new List<PostModel>();
            }

            var profileID = userProfile.Id;

            var followingIDs = await _context.Follower
                .Where(f => f.FollowerID == profileID)
                .Select(f => f.ProfileID)
                .ToListAsync();

            var posts = await _context.Posts
                .Include(p => p.Profile)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
                .Where(p => followingIDs.Contains(p.ProfileID))
                .Select(p => new PostModel
                {
                    ID = p.ID,
                    ProfileID = p.ProfileID,
                    Profile = p.Profile,
                    Title = p.Title,
                    Ingredients = p.Ingredients,
                    Instructions = p.Instructions,
                    Cost = p.Cost,
                    PrepTime = p.PrepTime,
                    CookTime = p.CookTime, 
                    NumOfLikes = p.NumOfLikes,
                    NumOfComments = p.NumOfComments,
                    NumOfDislikes = p.NumOfDislikes,
                    PostImage = p.PostImage,
                    CreatedAt = p.CreatedAt,
                    IsLikedByUser = _context.Likes.Any(like => like.PostId == p.ID && like.UserId == userID),
                    IsDislikedByUser = _context.Dislikes.Any(dislike => dislike.PostId == p.ID && dislike.UserId == userID),
                    Comments = p.Comments.Select(c => new CommentModel 
                    {
                        ID = c.ID,
                        PostID = c.PostID,
                        UserID = c.UserID,
                        Comment = c.Comment,
                        User = c.User 
                    }).ToList()
                })
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();


            return posts;

        }
    }
}
