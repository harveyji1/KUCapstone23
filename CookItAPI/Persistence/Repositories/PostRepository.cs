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
    public interface IPostRepository
    {
        Task<bool> CreatePostAsync(PostRequest newPost, string imageURL);
    }

    public class PostRepository : IPostRepository
    {
        private readonly SqlServerContext _context;

        public PostRepository(SqlServerContext context)
        {
            _context = context;
        }

        public async Task<bool> CreatePostAsync(PostRequest newPost, string imageURL)
        {
            PostModel post = new PostModel
            {
                PostImage = imageURL,
                Title = newPost.Title,
                Cost = newPost.Cost,
                Ingredients = newPost.Ingredients,
                Instructions = newPost.Instructions,
                PrepTime = newPost.PrepTime,
                UserID = newPost.UserID
            };
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
