import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author,
  publishedTime,
}) => {
  const siteName = "Ronpoin";
  const defaultTitle = "Ronpoin - The only roundabout leading to the right road";
  const defaultDescription = "Buy and sell cars, motorcycles, scooters, utility vehicles and spare parts easily, wherever you are.";
  const defaultImage = "/fav.png";

  const currentUrl = typeof window !== "undefined" ? window.location.href : (url || "");
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image 
    ? (image.startsWith("http") ? image : `${currentOrigin}${image}`)
    : `${currentOrigin}${defaultImage}`;
  
  // Clean up description (strip HTML tags if passed, truncate to 160 chars)
  const cleanDescription = seoDescription
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .trim()
    .slice(0, 160);

  // Format keywords
  const keywordsString = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || "cars, motorcycles, scooters, utility vehicles, spare parts, buy cars, sell cars, rondpoint, ronpoin";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={cleanDescription} />
      <meta name="keywords" content={keywordsString} />
      {author && <meta name="author" content={author} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;
