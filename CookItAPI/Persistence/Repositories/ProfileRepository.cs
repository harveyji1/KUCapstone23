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
    public interface IProfileRepository
    {
        Task<ProfileModel> GetProfileModelAsync(int profileID);
    }

    public class ProfileRepository : IProfileRepository
    {
        private readonly SqlServerContext _context;

        public ProfileRepository(SqlServerContext context)
        {
            _context = context;
        }


        public async Task<ProfileModel> GetProfileModelAsync(int profileID)
        {
            return await _context.Profiles.SingleOrDefaultAsync(profile => profile.Id == profileID);
        }
    }
}
