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
    //postrepo interface
    public interface IPostRepository
    {
        Task<bool> CreatePostAsync(PostModel newPost, string imageURL, int userID);
        Task<bool> UpvoteAsync(int postID, int userID);
        Task<bool> RevertUpvoteAsync(int postID, int userID);
        Task<bool> DownvoteAsync(int postID, int userID);
        Task<bool> RevertDownvoteAsync(int postID, int userID);
    }

    //post repo class. creates post for now. will handle edit delete etc 
    public class PostRepository : IPostRepository
    {
        private readonly SqlServerContext _context;

        public PostRepository(SqlServerContext context)
        {
            _context = context;
        }
        /// <summary>
        /// adds post in db.
        /// </summary>
        /// <param name="newPost"></param>
        /// <param name="imageURL"></param>
        /// <returns>boolean on success</returns>
        public async Task<bool> CreatePostAsync(PostModel newPost, string imageURL, int userID)
        {
            var profile = await _context.Profiles.SingleOrDefaultAsync(profile => profile.UserId == userID);

            if (profile == null)
            {
                return false;
            }

            newPost.ProfileID = profile.Id;
            newPost.PostImage = imageURL;

            await _context.Posts.AddAsync(newPost);

            profile.PostCount += 1;

            _context.Profiles.Update(profile);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpvoteAsync(int postID, int userID)
        {
            var existingLike = await _context.Likes
                                             .FirstOrDefaultAsync(l => l.PostId == postID && l.UserId == userID);
            if (existingLike != null)
            {
                return false;
            }

            var like = new LikeModel
            {
                PostId = postID,
                UserId = userID,
                CreatedAt = DateTime.UtcNow
            };
            _context.Likes.Add(like);

            var post = await _context.Posts.FindAsync(postID);
            if (post != null)
            {
                post.NumOfLikes += 1;
                _context.Posts.Update(post);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RevertUpvoteAsync(int postID, int userID)
        {
            var existingLike = await _context.Likes
                                             .FirstOrDefaultAsync(l => l.PostId == postID && l.UserId == userID);
            if (existingLike == null)
            {
                return false;
            }

            _context.Likes.Remove(existingLike);

            var post = await _context.Posts.FindAsync(postID);
            if (post != null && post.NumOfLikes > 0) 
            {
                post.NumOfLikes -= 1;
                _context.Posts.Update(post);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DownvoteAsync(int postID, int userID)
        {
            var existingDislike = await _context.Dislikes
                                                .FirstOrDefaultAsync(l => l.PostId == postID && l.UserId == userID);
            if (existingDislike != null)
            {
                return false;
            }

            var dislike = new DislikeModel 
            {
                PostId = postID,
                UserId = userID,
                CreatedAt = DateTime.UtcNow
            };
            _context.Dislikes.Add(dislike); 

            var post = await _context.Posts.FindAsync(postID);
            if (post != null)
            {
                post.NumOfDislikes += 1; 
                _context.Posts.Update(post);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RevertDownvoteAsync(int postID, int userID)
        {
            var existingDislike = await _context.Dislikes
                                                .FirstOrDefaultAsync(l => l.PostId == postID && l.UserId == userID);
            if (existingDislike == null)
            {
                return false;
            }

            _context.Dislikes.Remove(existingDislike);

            var post = await _context.Posts.FindAsync(postID);
            if (post != null)
            {
                post.NumOfDislikes = Math.Max(0, post.NumOfDislikes - 1); 
                _context.Posts.Update(post);
            }

            await _context.SaveChangesAsync();
            return true;
        }


    }
}
