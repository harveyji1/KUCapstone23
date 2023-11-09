using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Shared.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Azure
{
    public interface IBlobService
    {
        Task<string> UploadBlob(PostRequest post);
    }

    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }


        public async Task<string> UploadBlob(PostRequest post)
        {
            string timestamp = DateTime.Now.ToString();
            string fileName = $"{post.UserID}_{timestamp}.jpg";
            var container = _blobServiceClient.GetBlobContainerClient("userposts");
            var blobClient = container.GetBlobClient(fileName);

            
            await blobClient.UploadAsync(post.PostImage.OpenReadStream());
            return blobClient.Uri.ToString();
        }
    }
}
