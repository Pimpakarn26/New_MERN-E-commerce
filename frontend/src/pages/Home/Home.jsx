import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import Product from "./Product";
import Service from "./Service";
import Testimonials from "./testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Product />
      <Testimonials />
      <Service />
    </div>
  );
};

export default Home;
