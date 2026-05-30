import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
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

  const [products,
    setProducts] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "products"
        )
      ) ||
        defaultProducts
    );

  function updatePrice(
    index,
    value
  ) {
    const updated =
      [...products];

    updated[
      index
    ].pricePerKg =
      Number(value);

    setProducts(
      updated
    );
  }

  function saveProducts() {
    localStorage.setItem(
      "products",
      JSON.stringify(
        products
      )
    );

    alert(
      "Prices updated successfully"
    );

    navigate(
      "/user-dashboard"
    );
  }

  function resetPrices() {
    const ok =
      window.confirm(
        "Reset all prices?"
      );

    if (!ok) return;

    localStorage.setItem(
      "products",
      JSON.stringify(
        defaultProducts
      )
    );

    setProducts(
      defaultProducts
    );
  }

  return (
    <div
      className="dashboard"
    >
      <div className="card">
        <h2>
          Product Settings
        </h2>

        {products.map(
          (
            product,
            index
          ) => (
            <div
              key={
                product.id
              }
              style={{
                marginBottom:
                  "15px",
              }}
            >
              <label
                style={{
                  display:
                    "block",
                  marginBottom:
                    "6px",
                  fontWeight:
                    "bold",
                }}
              >
                {product.name}
                {" - ₹"}
                {product.type ===
                "piece"
                  ? " /piece"
                  : " /kg"}
              </label>

              <input
                className="input"
                type="number"
                value={
                  product.pricePerKg
                }
                onChange={(
                  e
                ) =>
                  updatePrice(
                    index,
                    e.target
                      .value
                  )
                }
              />
            </div>
          )
        )}

        <div
          style={{
            marginTop:
              "20px",
          }}
        >
          <button
            className="btn btn-add"
            onClick={
              saveProducts
            }
          >
            Save
          </button>

          <button
            className="btn btn-clear"
            onClick={
              resetPrices
            }
            style={{
              marginLeft:
                "10px",
            }}
          >
            Reset
          </button>

          <button
            className="btn btn-sales"
            onClick={() =>
              navigate(
                "/user-dashboard"
              )
            }
            style={{
              marginLeft:
                "10px",
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}