﻿using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Context
{
    //entity framework config. Mapping our modeles to our DB tables
    public class SqlServerContext : DbContext
    {
        public SqlServerContext(DbContextOptions<SqlServerContext> options) : base(options)
        {
            
        }
        public DbSet<UserModel> Users{ get; set; }
        public DbSet<ProfileModel> Profiles{ get; set; }
        public DbSet<PostModel> Posts { get; set; }
        public DbSet<FollowerModel> Follower { get; set; }
        public DbSet<LikeModel> Likes { get; set; }
        public DbSet<DislikeModel> Dislikes { get; set; }
        public DbSet<CommentModel> Comments { get; set; }

    }
}
