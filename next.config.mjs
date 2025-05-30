import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // domains: ["utfs.io", "a6p8xlv5sp.ufs.sh"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a6p8xlv5sp.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};
export default withFlowbiteReact(nextConfig);