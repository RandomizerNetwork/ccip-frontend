import React from 'react'
import Lottie from 'lottie-react'
import CCIPAnimation from "@/public/lottie/ccip.json";

export default function CCIPLottie() {
  return (
    <Lottie
        animationData={CCIPAnimation}
        loop={true}
        style={{
        position: "absolute",
        height: "1456px",
        width: "100%",
        margin: "0 auto",
        }}
    />
  )
}
