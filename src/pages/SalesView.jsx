import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./SalesView.css";

export default function SalesView() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const key =
    `sales-${today}`;

  const [data, setData] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadSales();
  }, []);

  function loadSales() {
    const saved =
      JSON.parse(
        localStorage.getItem(
          key
        )
      ) || [];

    setData(saved);
  }

  const filteredData =
    data.filter(
      (item) => {
        if (!search)
          return true;

        return item.Token
          .toString()
          .includes(
            search
          );
      }
    );

  const total =
    filteredData.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.Total,
      0
    );

  function exportExcel() {
    if (
      filteredData.length ===
      0
    ) {
      alert(
        "No data to export"
      );
      return;
    }

    const worksheet =
      XLSX.utils.json_to_sheet(
        filteredData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sales"
    );

    XLSX.writeFile(
      workbook,
      `sales-${today}.xlsx`
    );
  }

  function clearItems() {
    const confirmClear =
      window.confirm(
        "Are you sure you want to clear today's sales?"
      );

    if (
      confirmClear
    ) {
      localStorage.removeItem(
        key
      );

      setData([]);
      setSearch("");
    }
  }

  return (
    <div className="sales-page">
    <div className="sales-card">
      <h2 className="sales-title">
        Sales View
      </h2>

      <input className="sales-input"
        type="number"
        placeholder="Search by Token No"
        value={
          search
        }
        onChange={(
          e
        ) =>
          setSearch(
            e.target
              .value
          )
        }
      />

      <button className="sales-btn export-btn"
        onClick={
          exportExcel
        }
      >
        Export Excel
      </button>

      <button className="sales-btn export-btn"
        onClick={
          clearItems
        }
      >
        Clear Sales
      </button>

      <table className="sales-table"
        border="1"
        width="100%"
      >
        <thead>
          <tr>
            <th>
              Token
            </th>
            <th>
              Name
            </th>
            <th>
              Items
            </th>
            <th>
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length ===
          0 ? (
            <tr>
              <td
                colSpan="4"
                className="no-record"
              >
                No Records
              </td>
            </tr>
          ) : (
            filteredData.map(
              (
                item,
                index
              ) => (
                <tr
                  key={
                    index
                  }
                >
                  <td>
                    {
                      item.Token
                    }
                  </td>

                  <td>
                    {
                      item.Name
                    }
                  </td>

                  <td>
                    {
                      item.Items
                    }
                  </td>

                  <td>
                    ₹
                    {
                      item.Total
                    }
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      <div className="total-box">
        Total Sales:
        ₹{total}
      </div>
      </div>
    </div>
  );
}