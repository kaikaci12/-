import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", // Cloudinary CDN
      "www.google.com", // Google (though this appears to be an invalid image URL)
      "bernard.ge", // Bernard.ge website
      "sushi24.ge", // Sushi24.ge website
      "dempsters.ca", // Dempsters website
      "d31qjkbvvkyanm.cloudfront.net", // AWS CloudFront
      "www.thedinnerbite.com", // The Dinner Bite website
      "assets.bonappetit.com", // Bon Appetit
      "www.stefanidis.com.gr", // Stefanidis
      "fiber.ge", // Fiber.ge
      "tbiliselebi.ge", // Tbiliselebi.ge
      "server4.intermedia.ge", // Intermedia.ge
      "gemrielia.ge", // Gemrielia.ge
      "dyj6gt4964deb.cloudfront.net", // Another CloudFront
      "marao.ge", // Marao.ge
      "www.etaloni.ge", // Etaloni.ge
      "hotsale.ge", // Hotsale.ge
      "www.pizza24.ge",
    ],
  },
};

export default nextConfig;
