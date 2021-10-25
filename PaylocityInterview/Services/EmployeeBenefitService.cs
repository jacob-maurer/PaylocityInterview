using PaylocityInterview.DBModels;
using System.Linq;

namespace PaylocityInterview.Services
{
    public class EmployeeBenefitService
    {
        private const int BENEFIT_COST_EMPLOYEE = 1000;
        private const int BENEFIT_COST_DEPENDENT = 500;
        private const double BENEFIT_DISCOUNT = 0.9;

        public double CalculateBenefitCost(Employee employee)
        {
            double benefitCost = 0;
            benefitCost = BENEFIT_COST_EMPLOYEE * DiscountReceived(employee.FullName);
            if (employee.Dependents != null)
            {
                benefitCost +=
                    employee.Dependents.Sum(x => BENEFIT_COST_DEPENDENT * DiscountReceived(x.FullName));
            }

            return benefitCost;
        }

        public static double DiscountReceived(string name)
        {
            if (name.ToUpper().StartsWith("A"))
            {
                return BENEFIT_DISCOUNT;
            }

            return 1;
        }
    }
}
