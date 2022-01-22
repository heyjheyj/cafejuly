import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";

const Cards = ({ userData, products }) => {
  return (
    products &&
    products.map((product, index) =>
      <Card sx={{ minWidth: "320px", m: 1, background: "#f8ecf8" }} key={index}>
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            alt={`${product.productname}`}
            height="140"
            image={`${product.images[0]}`}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <FavoriteIcon sx={{ color: "#dfcdeb" }} />
              <Typography sx={{ ml: 1 }} variant="body" component="span">
                {product.productname}
              </Typography>
            </Box>
          </CardContent>
        </Link>
      </Card>
    )
  );
};

export default Cards;
