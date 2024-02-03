using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    //Profile object. Mimics our sql table
    public class ProfileModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual UserModel User { get; set; }
        public string? FullName { get; set; }
        public string? Bio { get; set; }
        public int FollowerCount { get; set; }
        public int FollowingCount { get; set; }
        public int PostCount { get; set; }
        public bool PrivateAccount { get; set; }
        public bool VerifiedAccount { get; set; }
        public string? ProfilePicture { get; set; }
        public virtual List<PostModel>? Posts { get; set; }

    }
}
