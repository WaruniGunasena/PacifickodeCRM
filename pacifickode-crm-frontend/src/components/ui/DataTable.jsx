import React from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export function DataTable({
  data = [],
  columns,
  onEdit,
  onDelete,
  emptyMessage = "No data found",
  onPageChange = null,
  currentPage = 1,
  totalPages = 1,
}) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={col.headerStyle}>
                  {col.label}
                </th>
              ))}
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr key="empty">
                <td
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center" }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.employeeId || item.departmentId || `row-${index}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={col.cellStyle}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Pencil
                        size={18}
                        className="action-icon"
                        onClick={() => onEdit(item)}
                      />
                      <Trash2
                        size={18}
                        className="action-icon delete"
                        onClick={() => onDelete(item)}
                        style={{ color: "#ef4444" }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.875rem",
            color: "#64748b",
          }}
        >
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                backgroundColor: currentPage === 1 ? "#f1f5f9" : "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                backgroundColor:
                  currentPage === totalPages ? "#f1f5f9" : "#fff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
