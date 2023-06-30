import React from "react";
import { Table } from "react-bootstrap";
import { MdDensityMedium } from "react-icons/md";
import CustomButton from "./CustomButton";
import NotFound from "../../components/shared/NotFound";

function CustomTable({ data }) {
  const headers = Object.keys(data[0] ? data[0] : {});
  const excludedFields = ["_id", "__v"];

  const filteredHeaders = headers.filter(
    (header) => !excludedFields.includes(header)
  );

  console.log("filteredHeaders", filteredHeaders);

  if (data.length === 0) {
    return (
      <NotFound text="No se encontraron datos" textSize={20} iconSize={100} />
    );
  }

  const reversedData = [...data].reverse();

  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            {filteredHeaders.map((header, index) => (
              <th className="text-center" key={index}>
                {header.toUpperCase()}
              </th>
            ))}
            <th className="text-center">
              <MdDensityMedium size={20} color="" />
            </th>
          </tr>
        </thead>
        <tbody>
          {reversedData.map((row, index) => (
            <tr key={index}>
              {filteredHeaders.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
              <td className="text-center">
                <CustomButton
                  text="Visto"
                  color="success"
                  size="small"
                  onClick={() => {}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomTable;
