import LocationPageClient from "@/components/location-page-client";
import { getLocationCms } from "@/lib/cms";

export default async function LocationPage() {
  const cms = await getLocationCms();
  return <LocationPageClient cms={cms} />;
}
