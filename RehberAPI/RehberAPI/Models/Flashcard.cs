using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RehberAPI.Models
{
    public class blogs
    {
        [Key]
        public int Id { get; set; }
        public int index { get; set; }
        public int CollectionId { get; set; }
        public string Front { get; set; }
        public string Back { get; set; }

    }

}