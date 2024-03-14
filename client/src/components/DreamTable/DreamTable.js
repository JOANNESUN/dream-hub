import React, { useState, useMemo, useEffect } from "react";
import "./DreamTable.css";
import getDate from "../../helper/date";
import { useTable } from "react-table";
import { DreamTableLabel } from "./DreamTableLabel";

function DreamTable() {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/fetch-journal`;
    const token = localStorage.getItem("token");
    console.log("token", token);
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setResponseData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Dream",
        accessor: "dream",
      },
      {
        Header: "Dream Analysis",
        accessor: "analysis",
      },
    ],
    []
  );

  const data = useMemo(() => responseData, [responseData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="dream-table-container">
      <table {...getTableProps()} className="dream-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DreamTable;
