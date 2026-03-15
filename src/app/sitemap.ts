import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/portfolio";
import { getAllStudios } from "@/lib/studio";
import { getAllWritingMeta } from "@/lib/writings";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beanlog.site";

  const staticRoutes = [
    "",
    "/about",
    "/writings",
    "/writings/novels",
    "/writings/essays",
    "/writings/synopses",
    "/writings/scripts",
    "/portfolio",
    "/studio",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${base}/portfolio/${project.slug}`,
    lastModified: project.date ? new Date(project.date) : new Date(),
  }));

  const studioRoutes = getAllStudios().map((item) => ({
    url: `${base}/studio/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  const writingRoutes = getAllWritingMeta().map((post) => ({
    url: `${base}/writings/${post.category}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...studioRoutes, ...writingRoutes];
}