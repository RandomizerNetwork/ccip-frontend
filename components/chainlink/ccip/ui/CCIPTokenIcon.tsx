import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CCIPTokenIcon() {
  return (
    <Link
      className="flex w-[27px] h-[27px] rounded-lg bg-chainlinkLavender py-0.5"
      target="_blank"
      href="https://docs.chain.link/ccip/test-tokens#mint-tokens-in-the-documentation"
    >
      <Image
        src="/images/tokens/CCIPIcon.svg"
        loading="lazy"
        alt="Chainlink CCIP logo"
        width={23}
        height={23}
        className="mx-auto items-center justify-center px-0.5"
      />
    </Link>
  );
}
