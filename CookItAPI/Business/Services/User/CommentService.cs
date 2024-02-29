using Business.Helpers;
using Persistence.Repositories;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    public interface ICommentService
    {
        Task CreateCommentAsync(CommentRequestDTO comment, int userID);
    }

    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _repo;

        public CommentService(ICommentRepository repo)
        {
            _repo = repo;
        }

        public async Task CreateCommentAsync(CommentRequestDTO comment, int userID)
        {
            await _repo.CreateCommentAsync(ModelConversionHelper.CommentRequestDTOToModel(comment, userID));
        }
    }
}
