/* eslint-disable */

import React, { useEffect, useState, useCallback } from "react";
import styles from "./landingpage.module.css";
import Axios from "axios";

import { cookies, prices } from "./section/datas";

import Radiobox from "./section/radiobox";
import Checkboxs from "./section/checkbox";
import SearchFeature from "./section/search";
import { Box, Grid } from "@mui/material";
import Cards from "./section/cards";
import Mainimage from './section/mainimage/mainimage';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Landingpage = (props) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [postsize, setPostsize] = useState(0);
  const [filters, setFilters] = useState({
    cookies: [],
    price: []
  });
  const [searchValue, setSearchValue] = useState("");

  let limit = 12;

  const getProducts = useCallback(async (props) => {
    Axios.post("/api/product/products", props).then(res => {
      if (res.data.success) {
        console.log("[Landingpage]products result:", res.data);
        if (props.loadmore) {
          setProducts(() => [...products, ...res.data.products]);
        } else {
          setProducts(() => res.data.products);
        }
        setPostsize(() => res.data.postsize);
        console.log(postsize)
      } else {
        alert("상품 정보를 가져오는데 실패했습니다.");
      }
    });
  }, [])

  useEffect(
    () => {
      let body = {
        skip: skip,
        limit: limit
      };
      getProducts(body);
    },
    [limit, skip, getProducts]
  );

  const loadmoreHandler = () => {
    let Skip = skip + limit;

    let body = {
      skip: Skip,
      limit: limit,
      loadmore: true
    };
    console.log('loadmore:', body)

    getProducts(body);
    setSkip(Skip);
  };

  const showFilterResult = filters => {
    let body = {
      skip: 0,
      limit: limit,
      filters: filters
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePriceFilter = value => {
    const data = prices;

    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilter = (filter, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filter;

    if (category === "price") {
      let priceValues = handlePriceFilter(filter);
      newFilters[category] = priceValues;
    }
    setFilters(newFilters);
    showFilterResult(newFilters);
  };

  const searchFunction = value => {
    let body = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchValue: value
    };
    setSkip(0);
    setSearchValue(value);
    console.log(searchValue)
    getProducts(body);
  };

  return (<>
      <section className={styles.mainImages}>
        <Mainimage />
      </section>
    <section className={styles.landingpage}>
      <div className={styles.title}>
        <h2>Be Happy With Cafe July <FavoriteIcon color="error"/></h2>
      </div>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "row",
          minWidth: "100%",
          justifyContent: "space-between",
          marginTop: '10px'
        }}
      >
        <Checkboxs
          lists={cookies}
          handleFilter={filter => handleFilter(filter, "cookies")}
        />
        <Radiobox
          prices={prices}
          handleFilter={filter => handleFilter(filter, "price")}
        />
      </Box>
      <section className={styles.searchInput}>
        <SearchFeature searchFunction={searchFunction} />
      </section>

      <Box
        sx={{
          flexGrow: 1,
          pt: 2,
          pl: 1
        }}
      >
        <Grid
          sx={{ display: "flex", justifyContent: "center" }}
          container
          spacing={1}
        >
          <Cards userData={props.userData} products={products} />
        </Grid>
      </Box>
      <button className={styles.loadmore} onClick={loadmoreHandler}>more Cookies!</button>
    </section>
    </>
  );
};

export default Landingpage;
