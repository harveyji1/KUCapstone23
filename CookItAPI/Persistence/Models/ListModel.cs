using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class ListModel
    {
        [Key]
        public int ListID { get; set; }
        public int UserID { get; set; }
        public string ListName { get; set; }
        public string? Description { get; set; }
        public ICollection<PostModel> Posts { get; set; } = new List<PostModel>();
    }
}
