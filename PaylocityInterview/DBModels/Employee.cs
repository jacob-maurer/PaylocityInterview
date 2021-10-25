using Microsoft.EntityFrameworkCore;
using PaylocityInterview.DBModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PaylocityInterview.DBModels
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }

        [NotMapped]
        public double BenefitCost { get; set; }

        public ICollection<Dependent> Dependents { get; set; }
    }
}
