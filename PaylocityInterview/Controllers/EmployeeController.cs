using Microsoft.AspNetCore.Mvc;
using PaylocityInterview.Services;
using PaylocityInterview.DBModels;
using System.Collections.Generic;
using System.Linq;

namespace PaylocityInterview.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeDBContext context)
        {
            _employeeService = new EmployeeService(context);
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _employeeService.GetEmployees().ToArray();
        }

        [HttpGet("{id}")]
        public Employee Get(int Id)
        {
            return _employeeService.GetEmployeeById(Id);
        }

        [HttpPost]
        public Employee Post(Employee employee)
        {
            return _employeeService.AddEmployee(employee);
        }

        [HttpPost]
        [Route("GetBenefitCost/")]
        public double GetBenefitCost([FromBody] Employee employee)
        {
            return _employeeService.GetBenefitCost(employee);
        }

        [HttpPut("{id}")]
        public Employee Put(int id, Employee employee)
        {
            return _employeeService.UpdateEmployee(id, employee);
        }

        [HttpDelete("{id}")]
        public Employee Delete(int id)
        {
            try
            {
                return _employeeService.DeleteEmployeeById(id);
            }
            catch (KeyNotFoundException)
            {
                return null;
            }
        }
    }
}
