"use client";
import Script from "next/script";

declare let VConsole: any;

export default function Vconsole() {
  return (
    <Script
      src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
      onLoad={() => {
        (() => new VConsole())();
      }}
    ></Script>
  );
}
