using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Context
{
    public class SqlServerContext : DbContext
    {
        public SqlServerContext(DbContextOptions<SqlServerContext> options) : base(options)
        {
            
        }
        public DbSet<UserModel> Users{ get; set; }
        public DbSet<ProfileModel> Profiles{ get; set; }


    }
}
