using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    /// <summary>
    /// post request object available to all layers
    /// </summary>
    public class PostRequestDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Instructions { get; set; }
        public decimal Cost { get; set; }
        public string? PrepTime { get; set; }
        public string? CookTime { get; set; } = "0";
        public IFormFile PostImage { get; set; }
    }
}
