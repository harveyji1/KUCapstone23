using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class FollowerModel
    {
        public int ID { get; set; }
        public int FollowerID { get; set; } 
        public int ProfileID { get; set; }
    }
}
