import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import AppWrapper from "./Components/AppWrapper";
import { Button, Paper } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard";
import TableBuilderPage from "./Pages/TableBuilder";

function App() {
  useEffect(() => {
    axios.get("http://localhost:8888/api/get-table-list").then(console.log);
    axios
      .get("http://localhost:8888/api/table-info/users/columns")
      .then(console.log);
  }, []);

  const createTable = useCallback(() => {
    axios.post("http://localhost:8888/api/create-collection", {
      tableName: "users",
      columnList: [
        {
          name: "ad",
          type: "string",
        },
        {
          name: "soyad",
          type: "string",
        },
      ],
    });
  }, []);
  const addUser = useCallback(() => {
    axios.post("http://localhost:8888/api/create-row", {
      collectionName: "users",
      data: {
        ad: "Muhammed Burak",
        soyad: "Şentürk",
      },
    });
  }, []);
  const getRow = useCallback(() => {
    let params = new URLSearchParams();
    params.set("collectionName", "users");
    params.set("where", JSON.stringify({ id: 1 }));
    axios
      .get("http://localhost:8888/api/find?" + params.toString())
      .then(console.log);
  }, []);
  const deleteRow = useCallback(() => {
    let params = new URLSearchParams();
    params.set("collectionName", "users");
    params.set("id", "1");
    axios
      .delete("http://localhost:8888/api/delete?" + params.toString())
      .then(console.log);
  }, []);
  const putRow = useCallback(() => {
    axios
      .put("http://localhost:8888/api/update?", {
        collectionName: "users",
        data: {
          ad: "Uğur",
        },
        where: { id: 2 },
      })
      .then(console.log);
  }, []);
  const dropTable = useCallback(() => {
    axios.put("http://localhost:8888/api/drop-table/users").then(console.log);
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWrapper>
          <Routes>
            <Route path="/">
              <Paper sx={{ p: "2%" }}>
                <Button onClick={createTable}>Create User Table</Button>
                <Button onClick={dropTable}>Drop Table</Button>
                <Button onClick={addUser}>Add Row</Button>
                <Button onClick={getRow}>Get Row</Button>
                <Button onClick={deleteRow}>Delete Row</Button>
                <Button onClick={putRow}>Update Row</Button>
              </Paper>
            </Route>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/table-builder" element={<TableBuilderPage />} />
          </Routes>
        </AppWrapper>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
