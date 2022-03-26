import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";

export default function mylist() {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-14 px-5"
      >
        <h1 className="text-xl opacity-90">My list</h1>
      </motion.div>
    </>
  );
}
