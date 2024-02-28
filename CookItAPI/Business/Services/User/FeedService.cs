using Business.Helpers;
using Persistence.Repositories;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    public interface IFeedService
    {
        Task<List<PostResponseDTO>> GetFeedAsync(int userID);
    }

    public class FeedService : IFeedService
    {
        private readonly IFeedRepository _repo;

        public FeedService(IFeedRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<PostResponseDTO>> GetFeedAsync(int userID)
        {
            return ModelConversionHelper.PostModelsToPostResponseDTO(await _repo.GetFeedAsync(userID));
        }
    }
}
