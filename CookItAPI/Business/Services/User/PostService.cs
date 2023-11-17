using Business.Services.Azure;
using Persistence.Repositories;
using Shared.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    public interface IPostService
    {
        Task<bool> CreatePostAsync(PostRequest newPost);
    }

    public class PostService : IPostService
    {
        private readonly IPostRepository _repository;
        private readonly IBlobService _blob;

        public PostService(IPostRepository repository, IBlobService blob)
        {
            _repository = repository;
            _blob = blob;
        }


        public async Task<bool> CreatePostAsync(PostRequest newPost)
        {
            string imageURL = await _blob.UploadBlob("userposts", newPost.UserID, newPost.PostImage);
            return await _repository.CreatePostAsync(newPost, imageURL);
        }
    }
}
