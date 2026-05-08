import HomePageClient from "@/components/home-page-client";
import { getHomePageCms, getGlobalOptions } from "@/lib/cms";

export default async function HomePage() {
  const [cms, options] = await Promise.all([
    getHomePageCms(),
    getGlobalOptions(),
  ]);

  return <HomePageClient cms={cms} options={options} />;
}
