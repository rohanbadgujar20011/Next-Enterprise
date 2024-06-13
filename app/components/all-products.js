// app/components/all-products.js
"use client";
import React, { useEffect } from "react";
import DataTable from "@/app/components/dataTable";
import useProductStore from "@/app/store/productStore";

const cols = ["ID", "TITLE", "DESCRIPTION", "PRICE"];

const AllProducts = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return <DataTable cols={cols} rows={products} />;
};

export default AllProducts;
