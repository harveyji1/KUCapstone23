using Business.Helpers;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Persistence.Models;
using Persistence.Repositories;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Middle layer for search functionality

namespace Business.Services.User
{
    public interface ISearchService
    {
        Task<List<ProfileResponseDTO>> SearchProfilesAsync(string keyWord);
    }

    public class SearchService : ISearchService
    {
        private readonly ISearchRepository _searchRepo;

        public SearchService(ISearchRepository searchRepo)
        {
            _searchRepo = searchRepo;
        }

        public async Task<List<ProfileResponseDTO>> SearchProfilesAsync(string keyWord)
        {
            List<UserModel> profiles = await _searchRepo.SearchProfilesAsync(keyWord);
            List<ProfileResponseDTO> result = new List<ProfileResponseDTO>();
            if(profiles != null)
            {
                foreach(var profile in profiles)
                {
                    result.Add(ModelConversionHelper.ProfileModelToResponseDTO(profile.Profile));
                }
            }

            return result;
        }
    }
}
