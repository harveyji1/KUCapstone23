using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    public class CommentRequestDTO
    {
        public int PostID { get; set; }
        public string Comment { get; set; }
    }
}
