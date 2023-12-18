import React, { useEffect, useState } from 'react';
import CCIPBridge from '@/components/chainlink/ccip/CCIPBridge';

export default function ChainlinkCCIPBridge() {
  return (
    <>
      <main
        id="dynamicGame"
        className={`subpixel-antialiased font-kanit overflow-x-hidden h-screen w-full`}
      >
        <div className="flex flex-col justify-start mt-40 items-center text-white h-full">
          <CCIPBridge />
        </div>
      </main>
    </>
  );
}
