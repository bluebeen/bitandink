import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beanlog.site";

  return [
    {
      url: base,
      lastModified: new Date(),
    },

    {
      url: `${base}/about`,
      lastModified: new Date(),
    },

    {
      url: `${base}/writings`,
      lastModified: new Date(),
    },

    {
      url: `${base}/writings/novels`,
      lastModified: new Date(),
    },

    {
      url: `${base}/writings/essays`,
      lastModified: new Date(),
    },

    {
      url: `${base}/writings/synopses`,
      lastModified: new Date(),
    },

    {
      url: `${base}/writings/scripts`,
      lastModified: new Date(),
    },

    {
      url: `${base}/portfolio`,
      lastModified: new Date(),
    },

    {
      url: `${base}/studio`,
      lastModified: new Date(),
    },

    {
      url: `${base}/studio/process`,
      lastModified: new Date(),
    },

    {
      url: `${base}/studio/contact`,
      lastModified: new Date(),
    },
  ];
}