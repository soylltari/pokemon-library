import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  return redirect(`/${routing.defaultLocale}/${token ? "items" : "login"}`);
}
