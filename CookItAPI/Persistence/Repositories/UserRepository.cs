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
    //user repo interface
    public interface IUserRepository
    {
        Task<UserModel> GetUserByUsernameAsync(string username);
        Task AddUserAsync(UserModel user);
    }
    
    //userrepo class for user crud func
    public class UserRepository : IUserRepository
    {
        private readonly SqlServerContext _context;

        public UserRepository(SqlServerContext context)
        {
            _context = context;
        }

        /// <summary>
        /// fetches user by username
        /// </summary>
        /// <param name="username"></param>
        /// <returns>user</returns>
        public async Task<UserModel> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.Username == username);
        }
        /// <summary>
        /// adds user to db
        /// </summary>
        /// <param name="user"></param>
        /// <returns>nothing</returns>
        public async Task AddUserAsync(UserModel user)
        {
            user.Profile.Handle = user.Username;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
