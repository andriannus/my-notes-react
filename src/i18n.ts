import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { Language } from "@/enums";
import { en, id } from "@/lang";

i18n.use(initReactI18next).init({
  resources: { id, en },
  lng: Language.Indonesia,
});

export default i18n;
