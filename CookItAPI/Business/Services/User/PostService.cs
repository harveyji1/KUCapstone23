using Business.Helpers;
using Business.Services.Azure;
using Persistence.Repositories;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.User
{
    //post interface
    public interface IPostService
    {
        Task<bool> CreatePostAsync(PostRequest newPost, int userID);
    }

    //post class. will handle uploading of post images and pass to repo layer
    public class PostService : IPostService
    {
        private readonly IPostRepository _repository;
        private readonly IBlobService _blob;

        public PostService(IPostRepository repository, IBlobService blob)
        {
            _repository = repository;
            _blob = blob;
        }

        //calls our blob service. Uploads image and takes the string url which will be passed to repo layer
        public async Task<bool> CreatePostAsync(PostRequest newPost, int userID)
        {
            
            string imageURL = await _blob.UploadBlob("userposts", userID, newPost.PostImage);
            return await _repository.CreatePostAsync(ModelConversionHelper.PostModelToDTO(newPost), imageURL, userID);
        }
    }
}
