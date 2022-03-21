import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const data = [
  {
    quantity: 1
  },
  {
    quantity: 2
  },
  {
    quantity: 3
  },
  {
    quantity: 4
  },
  {
    quantity: 5
  },
  {
    quantity: 10
  },
  {
    quantity: "직접입력"
  }
];

const ProductDescription = ({ product, addItemToCart }) => {
  const [quantities, setQuantities] = useState();
  const [showInput, setShowInput] = useState(false);

  const onAddToCart = () => {
    addItemToCart(product._id, quantities);
  };

  const onselectQuantities = input => {
    setQuantities(input);
  };

  const selectQuantities = input => {
    if (input === "직접입력") {
      setShowInput(true);
    } else {
      setShowInput(false);
      setQuantities(input);
    }
  };

  const select = e => {};

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "100%" }}>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Product
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Infomation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                Product Name
              </TableCell>
              <TableCell align="center">
                {product.productname}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                Sold
              </TableCell>
              <TableCell align="center">
                {product.sold}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                Price
              </TableCell>
              <TableCell align="center">
                {product.price}원
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                Description
              </TableCell>
              <TableCell align="center">
                {product.description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: 2,
          width: "100%",
          justifyContent: "space-evenly"
        }}
      >
        {!showInput
          ? <div>
              <span>수량</span>
              <select
                style={{ height: "28px", width: "100px", marginLeft: "10px" }}
                onChange={e => selectQuantities(e.target.value)}
                value={quantities}
              >
                {data.map((quan, index) =>
                  <option key={index} value={quan.quantity}>
                    {quan.quantity}
                  </option>
                )}
              </select>
              <input
                style={{
                  height: "25px",
                  width: "70px",
                  marginLeft: "10px",
                  marginRight: "10px"
                }}
                disabled
                type="text"
              />
              <span>개</span>
            </div>
          : <div>
              <span>수량</span>
              <select
                style={{ height: "28px", width: "100px", marginLeft: "10px" }}
                onChange={e => select(e.target.value)}
                value={quantities}
              >
                {data.map((quan, index) =>
                  <option key={index} value={quan.quantity}>
                    {quan.quantity}
                  </option>
                )}
              </select>
              <input
                style={{
                  height: "25px",
                  width: "70px",
                  marginLeft: "10px",
                  marginRight: "10px"
                }}
                onChange={e => onselectQuantities(e.target.value)}
                type="text"
              />
              <span>개</span>
            </div>}
        <Button
          sx={{ background: "#B178DE50", color: "#3B2E45" }}
          onClick={onAddToCart}
        >
          장바구니 담기
        </Button>
      </Box>
    </section>
  );
};

export default ProductDescription;
