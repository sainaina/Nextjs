import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | This is About page",
    default: "About Page",
  },
  openGraph: {
    title: "About page",
    description: "About page",
    images: [
      {
        url: "https://i.pinimg.com/736x/da/02/58/da0258f4c1fb543aa5d76336e3255242.jpg",
        width: 800,
        height: 650,
        alt: "Car",
        type: "image/png",
      },
    ],
  },
};
const ProductPage = async () => {
  return (
    <div>
      <h1>This is about Page</h1>
    </div>
  );
};

export default ProductPage;
