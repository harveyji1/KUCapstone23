using Persistence.Models;
using Persistence.Repositories;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Middle layer for list

namespace Business.Services.User
{
    public interface IListService
    {
        Task<List<ListModel>> CreateListAsync(int userID, ListRequestDTO list);
        Task<List<ListModel>> GetUserListsAsync(int userID);
        Task<List<ListModel>> DeleteListAsync(int userID, int listID);
        Task<bool> SaveRecipeAsync(int listID, int postID);
        Task<bool> DeleteRecipeFromListAsync(int listID, int postID);
    }

    public class ListService : IListService
    {
        private readonly IListRepository _repo;

        public ListService(IListRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<ListModel>> CreateListAsync(int userID, ListRequestDTO list)
        {
            var model = new ListModel();
            model.UserID = userID;
            model.Description = list.Description;
            model.ListName = list.ListName;

            await _repo.CreateListAsync(model);


            return await _repo.GetUserListsAsync(userID);
        }

        public async Task<List<ListModel>> GetUserListsAsync(int userID)
        {
            return await _repo.GetUserListsAsync(userID);
        }

        public async Task<List<ListModel>> DeleteListAsync(int userID, int listID)
        {
            await _repo.DeleteListAsync(listID);
            return await _repo.GetUserListsAsync(userID);
        }

        public async Task<bool> SaveRecipeAsync(int listID, int postID)
        {
            return await _repo.SaveRecipeAsync(listID, postID);
        }

        public async Task<bool> DeleteRecipeFromListAsync(int listID, int postID)
        {
            return await _repo.DeleteRecipeFromListAsync(listID, postID);
        }
    }
}
