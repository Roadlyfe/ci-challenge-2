import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("decoupler/translate-path?path=/resource-library")
      .then((res) => {
        setData(res.data.components[0].content.ref);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Version",
      accessor: "release_version",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Release Date",
      accessor: "release_date",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Product",
      accessor: "related_product",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Category",
      accessor: "asset_type",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "File",
      accessor: "filename",
      Cell: (rowObject) =>
      <a className="link" href={rowObject.row.original.uri}>{rowObject.row.original.filename}</a>,
    },
    {
      Header: "VersionType",
      accessor: "version_type",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Size",
      accessor: "filesize",
    },
  ];

  return (
    <div className="App">
      <h1>
        <center className="center">Resource Library</center>
      </h1>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;


