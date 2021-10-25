using PaylocityInterview.DBModels;
using System.Collections.Generic;
using System.Linq;
using PaylocityInterview.DataAccess;

namespace PaylocityInterview.Services
{
    public class EmployeeService
    {
        private const int PAYCHECK_AMOUNT_EMPLOYEE = 2000;

        private readonly EmployeeDataAccess _employeeDataAccess;
        private readonly EmployeeBenefitService _employeeBenefitService;

        public EmployeeService(EmployeeDBContext context)
        {
            _employeeDataAccess = new EmployeeDataAccess(context);
            _employeeBenefitService = new EmployeeBenefitService();
        }

        // Retrieves list of employees
        public IEnumerable<Employee> GetEmployees()
        {
            var employees = _employeeDataAccess.GetEmployeesWithDependents().ToList();

            employees.ForEach(emp =>
            {
                emp.BenefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(emp);
                emp.PayCheckAmount = PAYCHECK_AMOUNT_EMPLOYEE;
            });

            return employees;
        }

        public Employee AddEmployee(Employee employee)
        {
            _employeeDataAccess.AddEmployee(employee);

            employee.BenefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);
            employee.PayCheckAmount = PAYCHECK_AMOUNT_EMPLOYEE;

            return employee;
        }

        public Employee UpdateEmployee(int id, Employee employee)
        {
            // currently setting to hidden id value to prevent from overwriting wrong record attack
            employee.Id = id;

            _employeeDataAccess.UpdateEmployee(employee);

            employee.BenefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);
            employee.PayCheckAmount = PAYCHECK_AMOUNT_EMPLOYEE;

            return employee;
        }

        public Employee GetEmployeeById(int employeeId)
        {
            var employee = _employeeDataAccess.GetEmployeeWithDependentsById(employeeId);

            employee.BenefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);
            employee.PayCheckAmount = PAYCHECK_AMOUNT_EMPLOYEE;

            return employee;
        }

        public Employee DeleteEmployeeById(int employeeId)
        {
            var employeeToDelete = _employeeDataAccess.DeleteEmployee(employeeId);

            return employeeToDelete;
        }
    }
}
