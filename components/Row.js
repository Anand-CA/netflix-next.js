import { motion } from "framer-motion";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";

function Row({ title, movies }) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <Modal show={show} setShow={setShow} id={id} />
      <h1 className="animation-fade-in-up font-bold text-xl sm:text-3xl p-3">
        {title}
      </h1>
      <div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hide">
        {movies?.map((a) => (
          <div
            key={a.id}
            className="group m-3 hover:scale-110 relative transition-all duration-500"
          >
            <Image
              onClick={() => {
                setId(a.id);
                setShow(true);
              }}
              layout="fixed"
              className="object-cover rounded-lg"
              width={300}
              height={200}
              src={`https://image.tmdb.org/t/p/original${
                a.backdrop_path || a.poster_path
              }`}
              alt={a.title}
            />

            {/* info */}
            <div className="group-hover:flex flex-col group-hover:animate-fade-in-up duration-1000  hidden absolute bottom-3  left-3">
              <div className="flex space-x-3 items-center">
                <div className="bg-white w-8 h-8 flex rounded-full items-center justify-center">
                  <BsFillPlayFill className="text-black text-3xl" />
                </div>
                <div>
                  <AiOutlinePlusCircle className="text-4xl" />
                </div>
              </div>

              <div>
                <p>{a.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Row;
