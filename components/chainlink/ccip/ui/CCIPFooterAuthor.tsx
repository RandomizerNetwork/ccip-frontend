import Link from "next/link";
import React from "react";

export default function CCIPFooterAuthor() {
  return (
    <>
      <div className="flex justify-center w-full text-chainlinkMirage">
        Built with 💜 for the{" "}
        <div className="ml-1">
          <Link
            target="_blank"
            href="https://chain.link/hackathon"
            className="flex justify-center text-chainlinkBlue"
          >
            {" "}
            Chainlink Constelation Hackathon
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full text-chainlinkMirage">
        <div className="flex justify-center"> by </div>
        <Link
          target="_blank"
          href="https://www.github.com/Liberalite"
          className="text-chainlinkBlue mx-1"
        >
          Liberalite
        </Link>
        <div className="flex justify-center mr-1"> from </div>
        <Link
          target="_blank"
          href="https://www.randomizer.network/"
          className="text-chainlinkBlue"
        >
          randomizer.network
        </Link>
      </div>
    </>
  );
}
