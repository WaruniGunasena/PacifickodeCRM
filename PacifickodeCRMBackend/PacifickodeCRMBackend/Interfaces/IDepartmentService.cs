using PacifickodeCRMBackend.Models;

namespace PacifickodeCRMBackend.Interfaces
{
    public interface IDepartmentService
    {
        List<Department> GetAllDepartments();
        void AddDepartment(Department department);
        void UpdateDepartment(Department department);
        void DeleteDepartment(int id);
    }
}
