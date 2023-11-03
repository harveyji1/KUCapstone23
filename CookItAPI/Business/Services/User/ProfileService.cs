using Persistence.Models;
using Persistence.Repositories;
using Shared.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    public interface IProfileService
    {
        Task<ProfileDTO> GetProfileModelAsync(int profileID);
    }

    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepo;

        public ProfileService(IProfileRepository profileRepo)
        {
            _profileRepo = profileRepo;
        }



        public async Task<ProfileDTO> GetProfileModelAsync(int userID)
        {
            return await _profileRepo.GetProfileModelAsync(userID);
        }
    }
}
