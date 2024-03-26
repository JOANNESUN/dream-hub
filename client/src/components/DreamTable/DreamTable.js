import React, { useState, useMemo, useEffect } from "react";
import "./DreamTable.css";
import { useTable } from "react-table";
import "../Logo/Logo.css";
import { useDispatch } from 'react-redux';
import { dreamKeyWords } from '../../store/UserDreamKeyWordSlice';

function DreamTable() {
  const [responseData, setResponseData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/fetch-journal`;
    const token = localStorage.getItem("token");
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const dreams = responseData.map(item => item.dream); // Extracting all the 'dream' values
    const combinedDreams = dreams.join(" "); // Combining all the 'dream' values into a single string separated by spaces
    dispatch(dreamKeyWords(combinedDreams));
  }, [responseData, dispatch]);

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
    <div
      className="dream-table-container"
    >
      {rows.length > 0 ? (
        <table {...getTableProps()} className="dream-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
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
      ) : (
        <div style={{color: "black" }}>
          <h1>No Journal Yet</h1>
        </div>
      )}
    </div>
  );
}

export default DreamTable;
