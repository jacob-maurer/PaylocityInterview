using Microsoft.EntityFrameworkCore;
using PaylocityInterview.DBModels;
using System.Collections.Generic;
using System.Linq;

namespace PaylocityInterview.DataAccess
{
    public class EmployeeDataAccess
    {
        private readonly EmployeeDBContext _employeeDBContext;
        public EmployeeDataAccess(EmployeeDBContext context)
        {
            _employeeDBContext = context;
        }

        public IEnumerable<Employee> GetEmployeesWithDependents()
        {
            return _employeeDBContext.Employees
                .Include(e => e.Dependents);
        }

        public Employee GetEmployeeWithDependentsById(int employeeId)
        {
            return _employeeDBContext.Employees
                .Where(e => e.Id == employeeId)
                .Include(e => e.Dependents)
                .FirstOrDefault();
        }

        public void AddEmployee(Employee employee)
        {
            _employeeDBContext.Add(employee);
            _employeeDBContext.SaveChanges();
        }

        public void UpdateEmployee(Employee employee)
        {
            // Use update statement so it updates the dependents in the database too
            _employeeDBContext.Update(employee);
            _employeeDBContext.SaveChanges();
        }

        public Employee DeleteEmployee(int employeeId)
        {
            var employeeToDelete =_employeeDBContext.Employees
                .Where(e => e.Id == employeeId)
                .FirstOrDefault();

            if (employeeToDelete == null)
            {
                throw new KeyNotFoundException();
            }

            _employeeDBContext.Employees.Remove(employeeToDelete);
            _employeeDBContext.SaveChanges();

            return employeeToDelete;
        }
    }
}
