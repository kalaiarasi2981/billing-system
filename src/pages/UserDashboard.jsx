import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function StaffDashboard() {
  const navigate =
    useNavigate();

  const defaultProducts = [
    {
      id: 1,
      name: "Chicken Live",
      pricePerKg: 240,
    },
    {
      id: 2,
      name: "Chicken Normal",
      pricePerKg: 260,
    },
    {
      id: 3,
      name: "Chicken Boneless",
      pricePerKg: 320,
    },
    {
      id: 4,
      name: "Chicken Skinless",
      pricePerKg: 300,
    },
    {
      id: 5,
      name: "Liver",
      pricePerKg: 180,
    },
    {
      id: 6,
      name: "Head",
      pricePerKg: 90,
    },

    {
      id: 7,
      name: "Egg",
      pricePerKg: 8,
      type: "piece",
    },
    {
      id: 8,
      name: "Quail Egg",
      pricePerKg: 12,
      type: "piece",
    },
    {
      id: 9,
      name: "Country Egg",
      pricePerKg: 15,
      type: "piece",
    },

    {
      id: 10,
      name: "Quail",
      pricePerKg: 450,
    },
    {
      id: 11,
      name: "Country Chicken",
      pricePerKg: 420,
    },
    {
      id: 12,
      name: "Country Live Chicken",
      pricePerKg: 380,
    },
  ];

  const [products] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "products"
          )
        ) ||
        defaultProducts
      );
    });

  function getTodayDate() {
    return new Date()
      .toISOString()
      .split("T")[0];
  }

  const [customerName,
    setCustomerName] =
    useState("");

  const [tokenNo,
    setTokenNo] =
    useState(() => {
      const today =
        getTodayDate();

      const savedDate =
        localStorage.getItem(
          "tokenDate"
        );

      if (
        savedDate !== today
      ) {
        localStorage.setItem(
          "tokenDate",
          today
        );

        localStorage.setItem(
          "currentToken",
          "101"
        );

        return 101;
      }

      return (
        Number(
          localStorage.getItem(
            "currentToken"
          )
        ) || 101
      );
    });

  const [selectedProduct,
    setSelectedProduct] =
    useState("");

  const [qty, setQty] =
    useState("");

  const [amountInput,
    setAmountInput] =
    useState("");

  const [billItems,
    setBillItems] =
    useState([]);

  function roundUp5(amount) {
    return Math.ceil(
      amount / 5
    ) * 5;
  }

  function roundWeight(weight) {
    return (
      Math.round(
        weight / 0.05
      ) * 0.05
    ).toFixed(3);
  }

  const selectedItem =
    products.find(
      (p) =>
        p.name ===
        selectedProduct
    );

  const previewAmount =
    selectedItem && qty
      ? selectedItem.type ===
        "piece"
        ? Number(qty) *
          selectedItem.pricePerKg
        : roundUp5(
            selectedItem.pricePerKg *
              Number(qty)
          )
      : 0;

  const previewWeight =
    selectedItem &&
    amountInput &&
    selectedItem.type !==
      "piece"
      ? roundWeight(
          Number(amountInput) /
            selectedItem.pricePerKg
        )
      : "";

  function addItem() {
    let qtyValue = qty;

    if (
      !qtyValue &&
      previewWeight
    ) {
      qtyValue =
        previewWeight;
    }

    if (
      !selectedItem ||
      !qtyValue
    ) {
      alert(
        "Select product and enter quantity"
      );
      return;
    }

    let total = 0;

    if (
      selectedItem.type ===
      "piece"
    ) {
      total =
        Number(qtyValue) *
        selectedItem.pricePerKg;
    } else {
      total =
        roundUp5(
          selectedItem.pricePerKg *
            Number(qtyValue)
        );
    }

    const item = {
      product:
        selectedItem.name,

      qty:
        selectedItem.type ===
        "piece"
          ? Number(
              qtyValue
            )
          : Number(
              qtyValue
            ).toFixed(3),

      type:
        selectedItem.type ||
        "weight",

      pricePerKg:
        selectedItem.pricePerKg,

      total,
    };

    setBillItems([
      ...billItems,
      item,
    ]);

    setQty("");
    setAmountInput("");
    setSelectedProduct("");
  }

  function clearItems() {
    setBillItems([]);
    setQty("");
    setAmountInput("");
    setSelectedProduct("");
  }

  const grandTotal =
    billItems.reduce(
      (
        sum,
        item
      ) =>
        sum + item.total,
      0
    );

  function saveTodaySale() {
    const today =
      getTodayDate();

    const key =
      `sales-${today}`;

    const oldSales =
      JSON.parse(
        localStorage.getItem(
          key
        )
      ) || [];

    const purchasedItems =
      billItems
        .map(
          (item) =>
            `${item.product} ${item.qty}${
              item.type ===
              "piece"
                ? " pcs"
                : "kg"
            } ₹${item.total}`
        )
        .join(", ");

    const sale = {
      Date: today,
      Token: tokenNo,
      Name:
        customerName || "",
      Items:
        purchasedItems,
      Total:
        grandTotal,
    };

    localStorage.setItem(
      key,
      JSON.stringify([
        ...oldSales,
        sale,
      ])
    );
  }

  function printBill() {
    if (
      billItems.length ===
      0
    ) {
      alert(
        "Add items first"
      );
      return;
    }

    saveTodaySale();

    const nextToken =
      tokenNo + 1;

    localStorage.setItem(
      "currentToken",
      nextToken
    );

    setTokenNo(
      nextToken
    );

    window.print();

    clearItems();
    setCustomerName("");
  }

  return (
    <div className="dashboard">
      <div className="card">
        <h2 className="title">
          Billing
        </h2>

        <div className="button-row">
          <button
            className="btn btn-logout"
            onClick={() => {
              localStorage.removeItem(
                "staffLoggedIn"
              );

              navigate(
                "/user-login"
              );
            }}
          >
            Logout
          </button>

          <button
            className="btn btn-sales"
            onClick={() =>
              navigate(
                "/settings"
              )
            }
          >
            Settings
          </button>

          <button
            className="btn btn-sales"
            onClick={() =>
              navigate(
                "/sales-view"
              )
            }
          >
            Sales View
          </button>
        </div>

        <div className="token">
          Token No:
          {" "}
          {tokenNo}
        </div>

        <input
          className="input"
          placeholder="Customer Name"
          value={
            customerName
          }
          onChange={(e) =>
            setCustomerName(
              e.target.value
            )
          }
        />

        <select
          className="select"
          value={
            selectedProduct
          }
          onChange={(e) =>
            setSelectedProduct(
              e.target.value
            )
          }
        >
          <option value="">
            Select Product
          </option>

          {products.map(
            (
              product
            ) => (
              <option
                key={
                  product.id
                }
                value={
                  product.name
                }
              >
                {product.name}
                {" - ₹"}
                {
                  product.pricePerKg
                }
                {product.type ===
                "piece"
                  ? "/piece"
                  : "/kg"}
              </option>
            )
          )}
        </select>

        <input
          className="input"
          type="number"
          step={
            selectedItem?.type ===
            "piece"
              ? "1"
              : "0.001"
          }
          placeholder={
            selectedItem?.type ===
            "piece"
              ? "Pieces (5)"
              : "Weight (0.400)"
          }
          value={qty}
          onChange={(e) =>
            setQty(
              e.target.value
            )
          }
        />

        {selectedItem?.type !==
          "piece" && (
          <input
            className="input"
            type="number"
            placeholder="Amount ₹"
            value={
              amountInput
            }
            onChange={(e) =>
              setAmountInput(
                e.target.value
              )
            }
          />
        )}

        {previewAmount >
          0 && (
          <div className="preview-box">
            Amount ₹
            {
              previewAmount
            }
          </div>
        )}

        {previewWeight && (
          <div className="preview-box">
            Weight:
            {" "}
            {
              previewWeight
            }
            kg
          </div>
        )}

        <div className="button-row">
          <button
            className="btn btn-add"
            onClick={
              addItem
            }
          >
            Add Item
          </button>

          <button
            className="btn btn-print"
            onClick={
              printBill
            }
          >
            Print
          </button>

          <button
            className="btn btn-clear"
            onClick={
              clearItems
            }
          >
            Clear Items
          </button>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>
                Item
              </th>
              <th>
                Qty
              </th>
              <th>
                Rate
              </th>
              <th>
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {billItems.map(
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
                      item.product
                    }
                  </td>

                  <td>
                    {item.qty}
                    {item.type ===
                    "piece"
                      ? " pcs"
                      : " kg"}
                  </td>

                  <td>
                    ₹
                    {
                      item.pricePerKg
                    }
                  </td>

                  <td>
                    ₹
                    {
                      item.total
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="total-box">
          Total ₹
          {
            grandTotal
          }
        </div>
      </div>
    </div>
  );
}