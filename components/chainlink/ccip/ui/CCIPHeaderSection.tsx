import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CCIPHeaderSection() {
  return (
    <>
      <div className="product-header_tag-wrapper">
        <Link
          target="_blank"
          href={`https://chain.link/cross-chain`}
          rel="noopener noreferrer"
          className="flex flex-row justify-center items-center gap-2 bg-zir rounded-lg my-2 py-1 w-28 mx-auto bg-chainlinkLavender"
        >
          <div className="flex">
            <Image
              src="/images/tokens/CCIPIcon.svg"
              loading="lazy"
              alt="Chainlink CCIP logo"
              width={23}
              height={23}
              className="mx-auto"
            />
          </div>
          <h1 className="text-chainlinkMirage flex justify-center text-xl">
            CCIP
          </h1>
        </Link>
      </div>
      <h2 className="flex w-full items-center justify-center text-center z-80 text-4xl my-2 text-chainlinkBlue">
        Cross-chain by Chainlink
      </h2>
      <h3 className="flex w-full items-center justify-center text-center z-80 text-2xl my-2 text-chainlinkBiscay">
        The era of secure blockchain interoperability has arrived.
      </h3>
    </>
  );
}
