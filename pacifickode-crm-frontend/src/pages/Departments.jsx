import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { DataTable } from "../components/ui/DataTable";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { departmentService } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    departmentCode: "",
    departmentName: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = departments.filter((dept) =>
    dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pageSize = 5;
  const totalPages = Math.ceil(filteredDepartments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDepartments = filteredDepartments.slice(
    startIndex,
    startIndex + pageSize,
  );

  const loadDepartments = () => {
    departmentService
      .getAll()
      .then((data) => {
        const sortedData = [...data].sort(
          (a, b) => b.departmentId - a.departmentId,
        );
        setDepartments(sortedData);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (dept = null) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({
        departmentCode: dept.departmentCode,
        departmentName: dept.departmentName,
        description: dept.description || "",
      });
    } else {
      setEditingDept(null);
      setFormData({ departmentCode: "", departmentName: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicateCode = departments.some((dept) => {
      const isSameCode =
        dept.departmentCode.trim().toLowerCase() ===
        formData.departmentCode.trim().toLowerCase();
      if (editingDept) {
        return isSameCode && dept.departmentId !== editingDept.departmentId;
      }
      return isSameCode;
    });

    if (isDuplicateCode) {
      toast.warning("A department with this code already exists.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (editingDept) {
      const updateData = {
        ...formData,
        departmentId: editingDept.departmentId,
      };
      departmentService
        .update(editingDept.departmentId, updateData)
        .then(() => {
          loadDepartments();
          setIsModalOpen(false);
          toast.success("Department updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update department", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      departmentService
        .create(formData)
        .then(() => {
          loadDepartments();
          setCurrentPage(1);
          setFormData({
            departmentCode: "",
            departmentName: "",
            description: "",
          });
          setIsModalOpen(false);
          toast.success("Department added successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to add department", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const handleDelete = (departmentId, departmentName) => {
    setItemToDelete({ id: departmentId, name: departmentName });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    departmentService
      .delete(itemToDelete.id)
      .then(() => {
        loadDepartments();
        toast.success("Department deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowDeleteConfirm(false);
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete department", {
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
              placeholder="Search by department name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="btn-black" onClick={() => handleOpenModal()}>
            <Plus size={16} /> Add Department
          </button>
        </div>

        <DataTable
          data={paginatedDepartments}
          columns={[
            {
              key: "departmentCode",
              label: "Department Code",
              cellStyle: { fontWeight: 500, color: "#0f172a" },
              render: (dept) => (
                <span style={{ fontWeight: 500, color: "#0f172a" }}>
                  {dept.departmentCode}
                </span>
              ),
            },
            {
              key: "departmentName",
              label: "Department Name",
              render: (dept) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#0f172a",
                  }}
                >
                  {dept.departmentName}
                </div>
              ),
            },
            {
              key: "description",
              label: "Description",
              render: (dept) => dept.description || "-",
            },
          ]}
          onEdit={handleOpenModal}
          onDelete={(dept) =>
            handleDelete(dept.departmentId, dept.departmentName)
          }
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          emptyMessage="No departments found"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingDept ? "Edit Department" : "Add New Department"}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Department Code"
              value={formData.departmentCode}
              onChange={(e) =>
                setFormData({ ...formData, departmentCode: e.target.value })
              }
              required
              placeholder="e.g., IT001"
            />
            <Input
              label="Department Name"
              value={formData.departmentName}
              onChange={(e) =>
                setFormData({ ...formData, departmentName: e.target.value })
              }
              required
              placeholder="e.g., Information Technology"
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Optional department description"
            />
            <div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                marginTop: "var(--space-lg)",
              }}
            >
              <button type="submit" className="btn-black" style={{ flex: 1 }}>
                {editingDept ? "Update" : "Add"}
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
              This will permanently delete the department{" "}
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
