import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import AppWrapper from "./Components/AppWrapper";
import logo from "./logo.svg";
import { Button } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./Store";

/* 
type builderTypeList = {
  name: string;
  type: sqlColumnType;
  comment?: string;
  default?: string | number | boolean;
  relation?: { name: string; table: string; relatedCol?: string };
};
type builderRequest = {
  tableName: string;
  tableComment?: string;
  columnList: builderTypeList[];
  uniqueColumns?: string[];
};
*/

function App() {
  const createTable = useCallback(() => {
    // axios.post("http://localhost:8888/api/create-collection", {
    //   tableName: "users",
    //   columnList: [
    //     {
    //       name: "ad",
    //       type: "string",
    //     },
    //     {
    //       name: "soyad",
    //       type: "string",
    //     },
    //   ],
    // });
    axios.post("http://localhost:8888/api/create-row", {
      tableName: "users",
      data: {
        ad: "Muhammed Burak",
        soyad: "Şentürk",
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <AppWrapper>
        <div className="App">
          <Button onClick={createTable}>Create Table</Button>
        </div>
      </AppWrapper>
    </Provider>
  );
}

export default App;
