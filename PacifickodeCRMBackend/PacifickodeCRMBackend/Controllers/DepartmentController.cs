using Microsoft.AspNetCore.Mvc;
using PacifickodeCRMBackend.Interfaces;
using PacifickodeCRMBackend.Models;

namespace PacifickodeCRMBackend.Controllers
{
    [ApiController]
    [Route("api/department")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _service;

        public DepartmentController(IDepartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var departments = _service.GetAllDepartments();
            return Ok(departments);
        }

        [HttpPost]
        public IActionResult Add(Department department)
        {
            _service.AddDepartment(department);
            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody] Department department)
        {
            if (id != department.DepartmentId)
                return BadRequest("ID mismatch");

            _service.UpdateDepartment(department);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.DeleteDepartment(id);
            return Ok();
        }
    }
}