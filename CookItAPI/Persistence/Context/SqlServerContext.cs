using Microsoft.EntityFrameworkCore;
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
        public DbSet<ListModel> Lists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ListModel>()
            .HasMany(l => l.Posts)
            .WithMany(p => p.Lists)
            .UsingEntity<Dictionary<string, object>>(
                "ListPost", 
                j => j.HasOne<PostModel>().WithMany().HasForeignKey("PostID"), 
                j => j.HasOne<ListModel>().WithMany().HasForeignKey("ListID"), 
                j =>
                {
                    j.ToTable("ListPosts"); 
                
                });
        }

    }
}
