import React, { useState, useMemo } from "react";
import "./DreamTable.css";
import getDate from "../../helper/date";
import { useTable } from "react-table";

function DreamTable({ dataFromDreamInput, dataFromDreamResponse }) {
  const [responseData, setResponseData] = useState(dataFromDreamResponse);
  const [inputData, setInputData] = useState(dataFromDreamInput);
  const [currentDate, setCurrentDate] = useState(getDate());

  const columns = useMemo(
    () => [
          {
            Header: "Date",
            accessor: "date", // Correct accessor for Date
          },
          {
            Header: "Dream",
            accessor: "dream", // Correct accessor for Dream
          },
          {
            Header: "Dream Analysis",
            accessor: "analysis", // Correct accessor for Dream Analysis
          },
        ],
    []
  );

  const data = useMemo(() => {
    // Format your data as an array of objects with properties: date, dream, analysis
    return [
      {
        date: currentDate, // Assuming currentDate is the current date
        dream: inputData,
        analysis: responseData,
      },
    ];
  }, [currentDate, inputData, responseData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

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
