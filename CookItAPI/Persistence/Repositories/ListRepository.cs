using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

//Repo layer for Save.
//CRUD functionality for a user list

namespace Persistence.Repositories
{
    public interface IListRepository
    {
        Task<bool> CreateListAsync(ListModel list);
        Task<List<ListModel>> GetUserListsAsync(int userID);
        Task<bool> DeleteListAsync(int listID);
        Task<bool> SaveRecipeAsync(int listID, int postID);
        Task<bool> DeleteRecipeFromListAsync(int listID, int postID);
    }

    public class ListRepository : IListRepository
    {
        private readonly SqlServerContext _context;

        public ListRepository(SqlServerContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateListAsync(ListModel list)
        {
            if (list != null)
            {
                await _context.Lists.AddAsync(list);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<List<ListModel>> GetUserListsAsync(int userID)
        {
            var userLists = await _context.Lists
                                           .Where(l => l.UserID == userID)
                                           .Include(l => l.Posts)
                                           .ToListAsync();

            return userLists;
        }


        public async Task<bool> DeleteListAsync(int listID)
        {
            var listToDelete = await _context.Lists
                                             .FirstOrDefaultAsync(l => l.ListID == listID);

            if (listToDelete != null)
            {
                _context.Lists.Remove(listToDelete);

                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<bool> SaveRecipeAsync(int listID, int postID)
        {
            var list = await _context.Lists.FindAsync(listID);
            var post = await _context.Posts.FindAsync(postID);

            if (list == null || post == null) return false;

            list.Posts.Add(post);
            post.SavedCount += 1;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRecipeFromListAsync(int listID, int postID)
        {
            var list = await _context.Lists
                                      .Include(l => l.Posts) 
                                      .FirstOrDefaultAsync(l => l.ListID == listID);

            var post = await _context.Posts.FindAsync(postID);

            if (list == null || post == null || !list.Posts.Contains(post)) return false;

            list.Posts.Remove(post);

            await _context.SaveChangesAsync();

            return true;
        }


    }
}
