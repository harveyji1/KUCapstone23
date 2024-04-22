using Persistence.Context;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Repo layer for our comments. 
//Create new comment and attach it to post. 

namespace Persistence.Repositories
{
    public interface ICommentRepository
    {
        Task CreateCommentAsync(CommentModel comment);
    }

    public class CommentRepository : ICommentRepository
    {
        private readonly SqlServerContext _context;

        public CommentRepository(SqlServerContext context)
        {
            _context = context;
        }

        public async Task CreateCommentAsync(CommentModel comment)
        {
            await _context.Comments.AddAsync(comment);

            var post = await _context.Posts.FindAsync(comment.PostID);
            if (post != null)
            {
                post.NumOfComments += 1;
            }
            
            await _context.SaveChangesAsync();
        }
    }
}
