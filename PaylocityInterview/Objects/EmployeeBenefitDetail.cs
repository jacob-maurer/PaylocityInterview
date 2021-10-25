using System.Collections.Generic;

namespace PaylocityInterview.Objects
{
    public class EmployeeBenefitDetail
    {
        public BenefitCostDetail EmployeeBenefitCostDetail { get; set; }
        public IList<BenefitCostDetail> DependentBenefitCostDetails { get; set; }
        public double TotalBenefitCost { get; set; }
        public double PayPeriodBenefitCost { get; set; }

    }
}
