using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    public class PostResponseDTO
    {

        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Instructions { get; set; }
        public Decimal Cost { get; set; }
        public string? PrepTime { get; set; }
        public int NumOfLikes { get; set; }
        public int NumOfDislikes { get; set; }
        public int NumOfComments { get; set; }
        public string? Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsLikedByUser { get; set; }
        public bool IsDislikedByUser { get; set; }
        public string? Handle { get; set; }
        public string? ProfileImage { get; set; }
        public List<CommentResponseDTO>? Comments { get; set; }

        
    }
}
