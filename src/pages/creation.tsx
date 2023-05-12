import React from "react";
import type { NextPage, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
  res.writeHead(301, { location: "/scanning" });
  res.end();
  return {
    props: {},
  };
};

const Home: NextPage = () => <p />;

export default Home;
