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
    public interface IUserRepository
    {
        Task<UserModel> GetUserByUsernameAsync(string username);
        Task AddUserAsync(UserModel user);
    }
    
    public class UserRepository : IUserRepository
    {
        private readonly SqlServerContext _context;

        public UserRepository(SqlServerContext context)
        {
            _context = context;
        }

        public async Task<UserModel> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.Username == username);
        }

        public async Task AddUserAsync(UserModel user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
