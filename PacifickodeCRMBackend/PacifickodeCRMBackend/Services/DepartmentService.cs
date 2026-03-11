using Microsoft.Data.SqlClient;
using PacifickodeCRMBackend.Data;
using PacifickodeCRMBackend.Interfaces;
using PacifickodeCRMBackend.Models;

namespace PacifickodeCRMBackend.Services  
{
    public class DepartmentService(DbConnectionFactory connectionFactory) : IDepartmentService
    {
        private readonly DbConnectionFactory _connectionFactory = connectionFactory;

        public List<Department> GetAllDepartments()
        {
            var list = new List<Department>();

            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand("SELECT * FROM Departments WHERE IsDeleted = 0", conn);
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Department
                {
                    DepartmentId = (int)reader["DepartmentId"],
                    DepartmentCode = reader["DepartmentCode"]?.ToString() ?? string.Empty,
                    DepartmentName = reader["DepartmentName"]?.ToString() ?? string.Empty,
                    Description = reader["Description"]?.ToString() ?? string.Empty
                });
            }

            return list;
        }

        public void AddDepartment(Department department)
        {
            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
            "INSERT INTO Departments (DepartmentCode, DepartmentName, Description) VALUES (@code,@name, @description)", conn);

            cmd.Parameters.AddWithValue("@code", department.DepartmentCode);
            cmd.Parameters.AddWithValue("@name", department.DepartmentName);
            cmd.Parameters.AddWithValue("@description", department.Description);

            cmd.ExecuteNonQuery();
        }

        public void UpdateDepartment(Department department)
        {
            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
            "UPDATE Departments SET DepartmentCode=@code, DepartmentName=@name, Description=@description WHERE DepartmentId=@id", conn);

            cmd.Parameters.AddWithValue("@code", department.DepartmentCode);
            cmd.Parameters.AddWithValue("@name", department.DepartmentName);
            cmd.Parameters.AddWithValue("@description", department.Description);
            cmd.Parameters.AddWithValue("@id", department.DepartmentId);

            cmd.ExecuteNonQuery();
        }

        public void DeleteDepartment(int id)
        {
            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
                "UPDATE Departments SET IsDeleted = 1 WHERE DepartmentId = @id",
                conn);

            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();
        }

    }
}
