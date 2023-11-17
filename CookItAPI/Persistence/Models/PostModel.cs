using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class PostModel
    {
        public int ID { get; set; }
        [ForeignKey("User")]
        public int UserID { get; set; }
        public virtual UserModel User { get; set; }
        public string? Title { get; set; }
        public string? Ingredients { get; set; }
        public string? Instructions { get; set; }
        public decimal Cost { get; set; }
        public string? PrepTime { get; set; }
        public int NumOfLikes { get; set; }
        public string? PostImage { get; set; }   
    }
}
