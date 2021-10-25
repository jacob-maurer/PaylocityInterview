using PaylocityInterview.DBModels;
using PaylocityInterview.Objects;
using System.Collections.Generic;
using System.Linq;

namespace PaylocityInterview.Services
{
    public class EmployeeBenefitService
    {
        private const int BENEFIT_COST_EMPLOYEE = 1000;
        private const int BENEFIT_COST_DEPENDENT = 500;
        private const double BENEFIT_DISCOUNT = 0.9;
        private const int NUMBER_OF_PAY_PERIODS = 26;


        public static double DiscountReceived(string name)
        {
            if (IsDiscountReceived(name))
            {
                return BENEFIT_DISCOUNT;
            }

            return 1;
        }

        public static bool IsDiscountReceived(string name)
        {
            return name.ToUpper().StartsWith("A");
        }

        public EmployeeBenefitDetail CalculateEmployeeBenefitDetail(Employee employee)
        {
            var employeeBenefitDetail = new EmployeeBenefitDetail
            {
                EmployeeBenefitCostDetail = new BenefitCostDetail
                {
                    BenefitCost = BENEFIT_COST_EMPLOYEE * DiscountReceived(employee.FullName),
                    IsDiscountReceived = IsDiscountReceived(employee.FullName)
                },
                DependentBenefitCostDetails = new List<BenefitCostDetail>()
            };

            if (employee.Dependents != null)
            {
                foreach (Dependent dependent in employee.Dependents)
                {
                    var dependentBenefitCostDetail = new BenefitCostDetail
                    {
                        BenefitCost = BENEFIT_COST_DEPENDENT * DiscountReceived(dependent.FullName),
                        IsDiscountReceived = IsDiscountReceived(dependent.FullName)
                    };

                    employeeBenefitDetail.DependentBenefitCostDetails.Add(dependentBenefitCostDetail);
                }
            }

            employeeBenefitDetail.TotalBenefitCost = employeeBenefitDetail.EmployeeBenefitCostDetail.BenefitCost + 
                employeeBenefitDetail.DependentBenefitCostDetails.Sum(x => x.BenefitCost);

            employeeBenefitDetail.PayPeriodBenefitCost = employeeBenefitDetail.TotalBenefitCost / NUMBER_OF_PAY_PERIODS;

            return employeeBenefitDetail;
        }
    }
}
