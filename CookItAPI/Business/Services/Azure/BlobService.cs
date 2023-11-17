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
        Task<string> UploadBlob(string containerName, int userID, IFormFile image);
    }

    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;


        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }


        public async Task<string> UploadBlob(string containerName, int userID, IFormFile image)
        {
            string timestamp = DateTime.Now.ToString();
            string fileName = $"{userID}_{timestamp}.jpg";
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            var blobClient = container.GetBlobClient(fileName);

            
            await blobClient.UploadAsync(image.OpenReadStream());
            return blobClient.Uri.ToString();
        }
    }
}
