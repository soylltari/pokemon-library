import React from "react";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("auth.login");
  return (
    <div>
      <h1>{t("title")}</h1>
      <input type="email" placeholder={t("email")} />
      <input type="password" placeholder={t("password")} />
      <button>{t("login")}</button>
    </div>
  );
}
