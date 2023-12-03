using Persistence.Context;
using Persistence.Models;
using Shared.Request;
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
        Task<bool> CreatePostAsync(PostRequest newPost, string imageURL, int userID);
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
        public async Task<bool> CreatePostAsync(PostRequest newPost, string imageURL, int userID)
        {
            PostModel post = new PostModel
            {
                PostImage = imageURL,
                Title = newPost.Title,
                Cost = newPost.Cost,
                Ingredients = newPost.Ingredients,
                Instructions = newPost.Instructions,
                PrepTime = newPost.PrepTime,
                UserID = userID
            };
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
