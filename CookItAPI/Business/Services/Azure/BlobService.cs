using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Azure
{
    public interface IBlobService
    {
        Task<string> UploadBlob(IFormFile image, string fileName);
    }

    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }


        public async Task<string> UploadBlob(IFormFile image, string fileName)
        {
            var container = _blobServiceClient.GetBlobContainerClient("profileimagescontainer");
            var blobClient = container.GetBlobClient(fileName);

            await blobClient.UploadAsync(image.OpenReadStream());

            return blobClient.Uri.ToString();
        }
    }
}
