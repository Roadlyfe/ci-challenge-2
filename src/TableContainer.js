import { React } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./Filter";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const topHeaders = {
    related_product: "Product/Tool",
    asset_type: "Category",
    release_version: "Release Version",
    version_type: "Release Type"
  }

  return (
    <div>
      <table>
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              topHeaders[column.id] ?
              <th {...column.getHeaderProps()}>
                {topHeaders[column.id]}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th> : null
            ))}
          </tr>
        ))}
        </thead>
      </table>
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "center",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                column.id !== 'version_type' ?
                <th className="th" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th> : null
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return cell.column.Header !== 'VersionType' ? <td {...cell.getCellProps()}>{cell.render("Cell")}</td> :  null
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
