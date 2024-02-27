using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            var posts = await _context.Posts.Include("Profile")
                .Where(p => followingIDs.Contains(p.ProfileID))
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return posts;

        }
    }
}
