using Persistence.Models;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    public interface IProfileService
    {
        Task<ProfileModel> GetProfileModelAsync(int profileID);
    }

    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepo;

        public ProfileService(IProfileRepository profileRepo)
        {
            _profileRepo = profileRepo;
        }



        public async Task<ProfileModel> GetProfileModelAsync(int profileID)
        {
            return await _profileRepo.GetProfileModelAsync(profileID);
        }
    }
}
