import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { MdCheckCircleOutline, MdDelete } from "react-icons/md";

function DynamicTable({ columns, data, handleChangeStatus, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCompleted, setShowCompleted] = useState(false);

  const reversedData = [...data].reverse();

  const completedData = reversedData.filter((row) => row.status === true);
  const notCompletedData = reversedData.filter((row) => row.status !== true);

  const filteredData = showCompleted ? completedData : notCompletedData;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          className="m-2"
          variant="outlined"
          color="error"
          onClick={handleToggleCompleted}
        >
          {showCompleted ? "Mostrar Todos" : "Mostrar Completados"}
        </Button>
      </div>
      <TableContainer sx={{ maxHeight: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: column.fontSize,
                    fontWeight: column.fontWeight,
                    backgroundColor: "#007",
                    color: column.color,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      if (column.id === "curriculum") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="contained"
                              color="primary"
                              href={row.curriculum}
                              target="_blank"
                              style={{ fontSize: 10 }}
                              endIcon={<IoMdEye />}
                            >
                              Visualizar
                            </Button>
                          </TableCell>
                        );
                      }
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {showCompleted ? (
                              <Button
                                variant="contained"
                                color="error"
                                style={{ fontSize: 10 }}
                                endIcon={<MdDelete />}
                                onClick={() => handleDelete(row._id)}
                              >
                                Eliminar
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="success"
                                style={{ fontSize: 10 }}
                                endIcon={<MdCheckCircleOutline />}
                                onClick={() => handleChangeStatus(row._id)}
                              >
                                Marcar como completada
                              </Button>
                            )}
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DynamicTable;
