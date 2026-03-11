using Microsoft.AspNetCore.Mvc;
using PacifickodeCRMBackend.Interfaces;
using PacifickodeCRMBackend.Models;

namespace PacifickodeCRMBackend.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = _employeeService.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var employee = _employeeService.GetEmployeeById(id);
            if (employee == null)
                return NotFound($"Employee with Id = {id} not found.");

            return Ok(employee);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _employeeService.AddEmployee(employee);

            return Ok("Employee added successfully.");
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingEmployee = _employeeService.GetEmployeeById(id);
            if (existingEmployee == null)
                return NotFound($"Employee with Id = {id} not found.");

            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.Email = employee.Email;
            existingEmployee.DateOfBirth = employee.DateOfBirth;
            existingEmployee.Salary = employee.Salary;
            existingEmployee.DepartmentId = employee.DepartmentId;

            _employeeService.UpdateEmployee(existingEmployee);

            return Ok("Employee updated successfully.");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingEmployee = _employeeService.GetEmployeeById(id);
            if (existingEmployee == null)
                return NotFound($"Employee with Id = {id} not found.");

            _employeeService.DeleteEmployee(id);

            return Ok("Employee deleted successfully.");
        }
    }
}