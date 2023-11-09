using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class UserModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string HashedPassword { get; set; }
        public string Email { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime Creationdate { get; set; }

        public virtual ProfileModel Profile { get; set; }
        public virtual List<PostModel>? Posts { get; set; }
    }
}
