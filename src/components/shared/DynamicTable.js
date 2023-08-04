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
  ButtonGroup,
} from "@mui/material";
import { IoMdEye } from "react-icons/io";
import {
  MdCheckCircleOutline,
  MdHighlightOff,
  MdDelete,
  MdMode,
  MdLink,
  MdLinkOff,
} from "react-icons/md";
import { Tour, Image } from "antd";
import Colors from "../../utils/Colors";

function DynamicTable({
  titleTable,
  columns,
  data,
  handleChangeStatus,
  handleDelete,
  showFilter,
  navigate,
  showPages,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(showPages ? showPages : 5);
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
          justifyContent: "space-between",
        }}
      >
        <h2
          className="text-center m-2"
          style={{
            fontWeight: "bold",
          }}
        >
          {titleTable}
        </h2>
        {showFilter ? (
          <Button
            className="m-2"
            variant="outlined"
            color="secondary"
            onClick={handleToggleCompleted}
            endIcon={
              showCompleted ? <MdCheckCircleOutline /> : <MdHighlightOff />
            }
          >
            {showCompleted ? "Mostrar Activados" : "Mostrar No Activados"}
          </Button>
        ) : (
          <Button
            className="m-2"
            variant="outlined"
            color="secondary"
            onClick={handleToggleCompleted}
            endIcon={
              showCompleted ? <MdHighlightOff /> : <MdCheckCircleOutline />
            }
          >
            {showCompleted ? "Mostrar No Completados" : "Mostrar Completados"}
          </Button>
        )}
      </div>
      <TableContainer sx={{ maxHeight: "85vh" }}>
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
                    backgroundColor: Colors.PalletePrimary,
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      if (column.id === "image") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Image
                              src={row.image}
                              alt={row.title}
                              style={{
                                width: 200,
                                height: 80,
                                borderRadius: 5,
                                border: "1px solid #afafaf",
                              }}
                            />
                          </TableCell>
                        );
                      }
                      if (column.id === "curriculum" || column.id === "link") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              title={
                                column.id === "curriculum"
                                  ? row.curriculum
                                  : row.link
                              }
                              variant="contained"
                              href={
                                column.id === "curriculum"
                                  ? row.curriculum
                                  : row.link
                              }
                              target="_blank"
                              style={
                                column.id === "curriculum"
                                  ? {
                                      fontSize: 10,
                                      backgroundColor: Colors.PalletePrimary,
                                    }
                                  : row.link
                                  ? {
                                      fontSize: 10,
                                      backgroundColor: Colors.PalletePrimary,
                                    }
                                  : {
                                      fontSize: 10,
                                      backgroundColor:
                                        Colors.PalletePrimaryLight,
                                    }
                              }
                              disabled={
                                column.id === "link" && !row.link ? true : false
                              }
                              endIcon={
                                column.id === "curriculum" ? (
                                  <IoMdEye />
                                ) : row.link ? (
                                  <MdLink />
                                ) : (
                                  <MdLinkOff />
                                )
                              }
                            >
                              {column.id === "curriculum"
                                ? "Visualizar"
                                : row.link
                                ? "Ir al link"
                                : "No hay link"}
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
                                style={{
                                  fontSize: 10,
                                  backgroundColor: Colors.PalleteDanger,
                                }}
                                endIcon={<MdDelete />}
                                onClick={() => handleDelete(row._id)}
                              >
                                Eliminar
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                style={{
                                  fontSize: 10,
                                  backgroundColor: Colors.PalleteSuccess,
                                }}
                                endIcon={<MdCheckCircleOutline />}
                                onClick={() => handleChangeStatus(row._id)}
                              >
                                Marcar como completada
                              </Button>
                            )}
                          </TableCell>
                        );
                      }
                      if (
                        column.id === "actions banner" ||
                        column.id === "actions certification"
                      ) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <ButtonGroup variant="contained">
                              <Button
                                style={{
                                  fontSize: 10,
                                  backgroundColor: Colors.PalletePrimary,
                                }}
                                endIcon={<MdMode />}
                                onClick={() => {
                                  column.id === "actions banner"
                                    ? navigate(
                                        `/banners/edit-banner/${row._id}`
                                      )
                                    : navigate(
                                        `/certifications/edit-certification/${row._id}`
                                      );
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                style={{
                                  fontSize: 10,
                                  backgroundColor: Colors.PalleteDanger,
                                }}
                                endIcon={<MdDelete />}
                                onClick={() => handleDelete(row._id)}
                              >
                                Eliminar
                              </Button>
                              {row.status ? (
                                <Button
                                  style={{
                                    fontSize: 10,
                                    backgroundColor: Colors.PalleteSuccess,
                                  }}
                                  endIcon={<MdCheckCircleOutline />}
                                  onClick={() => handleChangeStatus(row._id)}
                                >
                                  Activar
                                </Button>
                              ) : (
                                <Button
                                  style={{
                                    fontSize: 10,
                                    backgroundColor: Colors.PalleteGrey,
                                  }}
                                  endIcon={<MdHighlightOff />}
                                  onClick={() => handleChangeStatus(row._id)}
                                >
                                  Desactivar
                                </Button>
                              )}
                            </ButtonGroup>
                          </TableCell>
                        );
                      }
                      if (
                        column.id === "actions user" ||
                        column.id === "actions positions"
                      ) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <ButtonGroup variant="contained">
                              <Button
                                style={{
                                  fontSize: 10,
                                  backgroundColor: Colors.PalleteDanger,
                                }}
                                endIcon={<MdDelete />}
                                onClick={() => handleDelete(row._id)}
                              >
                                Eliminar
                              </Button>
                              {row.status ? (
                                <Button
                                  style={{
                                    fontSize: 10,
                                    backgroundColor: Colors.PalleteSuccess,
                                  }}
                                  endIcon={<MdCheckCircleOutline />}
                                  onClick={() => handleChangeStatus(row._id)}
                                >
                                  Activar
                                </Button>
                              ) : (
                                <Button
                                  style={{
                                    fontSize: 10,
                                    backgroundColor: Colors.PalleteGrey,
                                  }}
                                  endIcon={<MdHighlightOff />}
                                  onClick={() => handleChangeStatus(row._id)}
                                >
                                  Desactivar
                                </Button>
                              )}
                            </ButtonGroup>
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
        rowsPerPageOptions={[3, 5, 10, 20, 30]}
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
