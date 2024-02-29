using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class CommentModel
    {
        public int ID { get; set; }
        [ForeignKey("Post")]
        public int PostID { get; set; }
        public virtual PostModel Post { get; set; } 

        [ForeignKey("User")]
        public int UserID { get; set; }
        public virtual UserModel User { get; set; } 

        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
