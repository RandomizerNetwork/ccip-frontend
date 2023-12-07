import Link from "next/link";
import React from "react";
import {
  FaTelegramPlane,
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

export default function SocialMedia() {
  return (
    <div className="flex flex-col items-center mt-4 mx-2">
      <div className="mb-4">Social Media</div>

      <div className="flex mt-5 sm:mt-0 space-x-6 sm:justify-centerjustify-center m-auto md:m-0">
        <Link
          href="https://twitter.com/RandomizerNet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
            <FaTwitter />
            <span className="sr-only">Twitter page</span>
          </div>
        </Link>

        <div className="flex flex-col justify-center">
          <Link
            href="https://discord.com/invite/nq9SXYmYer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
              <FaDiscord />
              <span className="sr-only">Discord account</span>
            </div>
          </Link>
        </div>
        <Link
          href="https://github.com/RandomizerNetwork"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
            <FaGithub />
            <span className="sr-only">GitHub account</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
