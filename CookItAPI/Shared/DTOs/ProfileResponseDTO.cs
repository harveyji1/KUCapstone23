using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    public class ProfileResponseDTO
    {
        public int ProfileID { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public int FollowerCount { get; set; }
        public int FollowingCount { get; set; }
        public int PostCount { get; set; }
        public bool PrivateAccount { get; set; }
        public bool VerifiedAccount { get; set; }
        public string ProfilePicture { get; set; }
        public List<PostResponseDTO>? Posts { get; set; }

        public string Handle { get; set; }
        public bool IsFollowedByUser { get; set; }
    }
}
