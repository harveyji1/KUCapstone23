﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    public class PostResponseDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
        public Decimal Cost { get; set; }
        public string PrepTime { get; set; }
        public int NumOfLikes { get; set; }
        public string Image { get; set; }
    }
}