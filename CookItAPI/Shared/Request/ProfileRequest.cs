using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Shared.Request
{
    public class ProfileRequest
    {
        public int UserId { get; set; }
        public string? FullName { get; set; }
        public string? Bio { get; set; }
        public IFormFile? ProfilePicture { get; set; }
    }
}
