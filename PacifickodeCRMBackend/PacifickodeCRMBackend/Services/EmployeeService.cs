using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using PacifickodeCRMBackend.Data;
using PacifickodeCRMBackend.Interfaces;
using PacifickodeCRMBackend.Models;

namespace PacifickodeCRMBackend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DbConnectionFactory _connectionFactory;

        public EmployeeService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public List<Employee> GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();

            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
                "SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Age, e.Salary, e.DepartmentId, d.DepartmentName " +
                "FROM Employees e " +
                "LEFT JOIN Departments d ON e.DepartmentId = d.DepartmentId " +
                "WHERE e.IsDeleted = 0", conn);

            var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                employees.Add(new Employee
                {
                    EmployeeId = (int)reader["EmployeeId"],
                    FirstName = reader["FirstName"]?.ToString() ?? string.Empty,
                    LastName = reader["LastName"]?.ToString() ?? string.Empty,
                    Email = reader["Email"]?.ToString() ?? string.Empty,
                    DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]),
                    Age = Convert.ToInt32(reader["Age"]),
                    Salary = Convert.ToDecimal(reader["Salary"]),
                    DepartmentId = Convert.ToInt32(reader["DepartmentId"])
                }); 
            }

            return employees;
        }

        public Employee? GetEmployeeById(int id)
        {
            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
                "SELECT EmployeeId, FirstName, LastName, Email, DateOfBirth, Age, Salary, DepartmentId " +
                "FROM Employees WHERE EmployeeId = @id", conn);

            cmd.Parameters.AddWithValue("@id", id);

            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Employee
                {
                    EmployeeId = (int)reader["EmployeeId"],
                    FirstName = reader["FirstName"]?.ToString() ?? string.Empty,
                    LastName = reader["LastName"]?.ToString() ?? string.Empty,
                    Email = reader["Email"]?.ToString() ?? string.Empty,
                    DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]),
                    Age = Convert.ToInt32(reader["Age"]),
                    Salary = Convert.ToDecimal(reader["Salary"]),
                    DepartmentId = Convert.ToInt32(reader["DepartmentId"])
                };
            }

            return null;
        }

        public void AddEmployee(Employee employee)
        {
           
            employee.Age = CalculateAge(employee.DateOfBirth);

            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
                "INSERT INTO Employees (FirstName, LastName, Email, DateOfBirth, Age, Salary, DepartmentId) " +
                "VALUES (@first, @last, @email, @dob, @age, @salary, @deptId)", conn);

            cmd.Parameters.AddWithValue("@first", employee.FirstName);
            cmd.Parameters.AddWithValue("@last", employee.LastName);
            cmd.Parameters.AddWithValue("@email", employee.Email);
            cmd.Parameters.AddWithValue("@dob", employee.DateOfBirth);
            cmd.Parameters.AddWithValue("@age", employee.Age);
            cmd.Parameters.AddWithValue("@salary", employee.Salary);
            cmd.Parameters.AddWithValue("@deptId", employee.DepartmentId);

            cmd.ExecuteNonQuery();
        }

        public void UpdateEmployee(Employee employee)
        {
         
            employee.Age = CalculateAge(employee.DateOfBirth);

            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
                "UPDATE Employees SET FirstName=@first, LastName=@last, Email=@email, DateOfBirth=@dob, Age=@age, Salary=@salary, DepartmentId=@deptId " +
                "WHERE EmployeeId=@id", conn);

            cmd.Parameters.AddWithValue("@first", employee.FirstName);
            cmd.Parameters.AddWithValue("@last", employee.LastName);
            cmd.Parameters.AddWithValue("@email", employee.Email);
            cmd.Parameters.AddWithValue("@dob", employee.DateOfBirth);
            cmd.Parameters.AddWithValue("@age", employee.Age);
            cmd.Parameters.AddWithValue("@salary", employee.Salary);
            cmd.Parameters.AddWithValue("@deptId", employee.DepartmentId);
            cmd.Parameters.AddWithValue("@id", employee.EmployeeId);

            cmd.ExecuteNonQuery();
        }

        public void DeleteEmployee(int id)
        {
            using var conn = _connectionFactory.CreateConnection();
            conn.Open();

            var cmd = new SqlCommand(
                "UPDATE Employees SET IsDeleted = 1 WHERE EmployeeId=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();
        }

        private int CalculateAge(DateTime dob)
        {
            var today = DateTime.Today;
            int age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
