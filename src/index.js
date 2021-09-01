import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class MyGrid extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
    this.state = {
      columnDefs: [
        {
          headerName: "Refunded",
          field: "refunded",
          editable: false,
          cellRenderer: function(params) {
            var input = document.createElement("input");
            input.type = "checkbox";
            input.checked = params.value;
            input.addEventListener("click", function(event) {
              params.value = !params.value;
              params.node.data.selected = params.value;
              console.log(
                that.state.rowData.reduce(
                  (acc, obj) => (acc.selected || acc) + ", " + obj.selected
                )
              );
            });
            return input;
          }
        },
        {
          headerName: "Make",
          field: "make"
        },
        {
          headerName: "Model",
          field: "model"
        },
        {
          headerName: "Price",
          field: "price"
        }
      ],
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000
        },
        {
          make: "Ford",
          model: "Mondeo",
          price: 32000
        },
        {
          make: "Porsche",
          model: "Boxter",
          price: 72000
        }
      ]
    };
  }
  componentDidUpdate() {
    this.state.columnDefs.forEach(e => console.log(e));
  }
  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "500px",
          width: "600px"
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MyGrid />, rootElement);
