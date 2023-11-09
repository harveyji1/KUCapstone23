using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Request
{
    public class PostRequest
    {
        public int UserID { get; set; }
        public string Title { get; set; }
        public string? Ingredients { get; set; }
        public string? Instructions { get; set; }
        public decimal Cost { get; set; }
        public string? PrepTime { get; set; }
        public IFormFile PostImage { get; set; }
    }
}
