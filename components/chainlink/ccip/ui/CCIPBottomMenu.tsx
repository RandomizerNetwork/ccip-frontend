import useGlobalState from "@/store/globalState";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function CCIPBottomMenu() {
  const [ccipCategories] = useGlobalState("ccipCategories");
  return (
    <>
      <div className="text-chainlinkZircon p-1 bg-chainlinkBlue flex flex-col items-center justify-center w-80 mt-44 mx-auto">
        <div className="flex justify-center text-center">
          More CCIP use cases comming soon <br /> for the Swiss Army Knive
          Roadmap
        </div>
      </div>

      <section
        id="ccipCategories"
        className="grid grid-cols-3 sm:grid-cols-4 gap-1 justify-items-center md:flex md:flex-row md:justify-items-start items-center justify-center w-full mt-5"
      >
        {ccipCategories.categories.map((category, index) => (
          <div
            key={uuidv4()}
            className="w-28 sm:w-36 rounded-lg px-1 sm:px-4 py-2 mx-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:border-chainlinkBlue focus:ring-opacity-50 transition duration-300 ease-in-out text-center"
          >
            <div className="text-md bg-chainlinkBlue p-1 rounded-tl rounded-tr h-14 flex items-center justify-center">
              {category}
            </div>
            <div className="text-sm bg-chainlinkMirage rounded-bl rounded-br">
              {ccipCategories.addons[index]}
            </div>
            <div className="text-xs text-chainlinkBlue mt-1">
              {ccipCategories.extra[index]}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
