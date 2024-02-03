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
            newPost.ProfileID = profile.Id;
            await _context.Posts.AddAsync(newPost);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
