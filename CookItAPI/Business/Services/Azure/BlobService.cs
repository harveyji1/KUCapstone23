using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Azure
{   
    //blob interface. following dependency inversion
    public interface IBlobService
    {
        Task<string> UploadBlob(string containerName, int userID, IFormFile image);
    }

    //blob class that handles uploading / deleting images/videos
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;


        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }



        /// <summary>
        /// Method for uploading images/videos to our blobstore
        /// </summary>
        /// <param name="containerName">name of container to upload to</param>
        /// <param name="userID">id for naming of image</param>
        /// <param name="image">Image to upload</param>
        /// <returns>Http status code</returns>
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
