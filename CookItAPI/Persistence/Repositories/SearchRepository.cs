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
    public interface ISearchRepository
    {
        Task<List<UserModel>> SearchProfilesAsync(string keyWord);
    }

    public class SearchRepository : ISearchRepository
    {
        private readonly SqlServerContext _context;

        public SearchRepository(SqlServerContext context)
        {
            _context = context;
        }

        public async Task<List<UserModel>> SearchProfilesAsync(string keyWord)
        {
            var profiles = await _context.Users
                            .Include(u => u.Profile) 
                                .ThenInclude(p => p.Posts) 
                            .Where(u => EF.Functions.Like(u.Username, $"%{keyWord}%"))
                            .ToListAsync();

            return profiles;
        }
    }
}
