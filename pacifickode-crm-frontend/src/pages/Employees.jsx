import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { DataTable } from "../components/ui/DataTable";
import { differenceInYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import { User, Plus } from "lucide-react";
import { employeeService, departmentService } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    salary: "",
    departmentId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const pageSize = 5;
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + pageSize,
  );

  const loadEmployees = () => {
    employeeService
      .getAll()
      .then((data) => {
        const sortedData = [...data].sort((a, b) => b.employeeId - a.employeeId);
        setEmployees(sortedData);
      })
      .catch(console.error);
  };

  const loadDepartments = () => {
    departmentService.getAll().then(setDepartments).catch(console.error);
  };

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getDepartmentName = (employeeDepartmentId) => {
    if (!employeeDepartmentId) return "-";
    const dept = departments.find(
      (d) => d.departmentId === employeeDepartmentId,
    );
    return dept ? dept.departmentName : "-";
  };
  const calculateAge = (dateOfBirthString) => {
    if (!dateOfBirthString) return "";
    const age = differenceInYears(new Date(), new Date(dateOfBirthString));
    return isNaN(age) ? "" : age;
  };

  const handleOpenModal = (emp = null) => {
    if (emp) {
      setEditingEmp(emp);
      setFormData({
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        dateOfBirth: emp.dateOfBirth ? emp.dateOfBirth.split("T")[0] : "",
        salary: emp.salary,
        departmentId: emp.departmentId,
      });
    } else {
      setEditingEmp(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        salary: "",
        departmentId: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicateEmail = employees.some((emp) => {
      const isSameEmail =
        emp.email.toLowerCase() === formData.email.toLowerCase();
      if (editingEmp) {
        return isSameEmail && emp.employeeId !== editingEmp.employeeId;
      }
      return isSameEmail;
    });

    if (isDuplicateEmail) {
      toast.warning("An employee with this email address already exists.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (editingEmp) {
      employeeService
        .update(editingEmp.employeeId, formData)
        .then(() => {
          loadEmployees();
          setIsModalOpen(false);
          toast.success("Employee updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update employee", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      employeeService
        .create(formData)
        .then(() => {
          loadEmployees();
          setCurrentPage(1);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            salary: "",
            departmentId: "",
          });
          setIsModalOpen(false);
          toast.success("Employee added successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to add employee", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const handleDelete = (id, name) => {
    setItemToDelete({ id, name });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    employeeService
      .delete(itemToDelete.id)
      .then(() => {
        loadEmployees();
        toast.success("Employee deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowDeleteConfirm(false);
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete employee", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowDeleteConfirm(false);
        setItemToDelete(null);
      });
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container"
        style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "0.75rem" }}
      >
        <div className="action-bar">
          <div className="search-container">
            <Input
              placeholder="Search by employee name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="btn-black" onClick={() => handleOpenModal()}>
            <Plus size={16} /> Add Employee
          </button>
        </div>

        <DataTable
          data={paginatedEmployees}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (emp) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#0f172a",
                    fontWeight: 500,
                  }}
                >
                  <User size={16} style={{ color: "#22c55e" }} />
                  {emp.firstName} {emp.lastName}
                </div>
              ),
            },
            {
              key: "email",
              label: "Email",
              render: (emp) => emp.email,
            },
            {
              key: "age",
              label: "Age",
              render: (emp) => emp.age,
            },
            {
              key: "salary",
              label: "Salary(LKR)",
              render: (emp) => parseFloat(emp.salary || 0).toLocaleString(),
            },
            {
              key: "department",
              label: "Department",
              render: (emp) => getDepartmentName(emp.departmentId),
            },
          ]}
          onEdit={handleOpenModal}
          onDelete={(emp) =>
            handleDelete(emp.employeeId, `${emp.firstName} ${emp.lastName}`)
          }
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          emptyMessage="No employees found"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingEmp ? "Edit Employee" : "Add New Employee"}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "var(--space-md)" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-md)",
              }}
            >
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                style={{ marginBottom: 0 }}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                style={{ marginBottom: 0 }}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-md)",
              }}
            >
              <Input
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                required
                style={{ marginBottom: 0 }}
              />
              <Input
                label="Age (Auto-calculated)"
                value={calculateAge(formData.dateOfBirth)}
                disabled
                readOnly
                style={{
                  marginBottom: 0,
                  backgroundColor: "var(--color-background)",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-md)",
              }}
            >
              <Input
                label="Salary"
                type="number"
                min="0"
                step="0.01"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
                required
                style={{ marginBottom: 0 }}
              />
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">
                  Department{" "}
                  <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.departmentId}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentId: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>
                      {d.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                marginTop: "var(--space-lg)",
              }}
            >
              <button type="submit" className="btn-black" style={{ flex: 1 }}>
                {editingEmp ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Are you sure?"
        >
          <div>
            <p
              style={{
                color: "#64748b",
                marginBottom: "2.5rem",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              This will permanently delete the employee{" "}
              <strong style={{ color: "#0f172a" }}>{itemToDelete?.name}</strong>
              . This action cannot be undone.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                style={{
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#dc2626")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#ef4444")
                }
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
