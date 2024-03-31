using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using JsonIgnoreAttribute = Newtonsoft.Json.JsonIgnoreAttribute;

namespace Persistence.Models
{
    //Post object. Mimics our sql table
    public class PostModel
    {
        public int ID { get; set; }
        [ForeignKey("User")]
        public int ProfileID { get; set; }
        public virtual ProfileModel Profile { get; set; }
        public virtual List<CommentModel> Comments { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; } = string.Empty;
        public string? Ingredients { get; set; }
        public string? Instructions { get; set; }
        public decimal Cost { get; set; }
        public string? PrepTime { get; set; }
        public string? CookTime { get; set; } 
        public int NumOfLikes { get; set; }
        public int NumOfDislikes { get; set; }
        public int NumOfComments { get; set; }
        public string? PostImage { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [JsonIgnore]
        public ICollection<ListModel> Lists { get; set; } = new List<ListModel>();
        public int SavedCount { get; set; }
        [NotMapped]
        public bool IsLikedByUser { get; set; }
        [NotMapped]
        public bool IsDislikedByUser { get; set; }
        


        
    }

  
}

