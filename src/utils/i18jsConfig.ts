import {I18n} from 'i18n-js';
import en from '../utils/languages/json/en.json';
// import hi from '../utils/languages/json/hi.json';
const i18n = new I18n();
i18n.locale = 'en';
i18n.enableFallback = false;
i18n.translations = {en};
i18n.missingTranslation.get = text => `${text}`;

export const translate = (text: string) => i18n.t(text);

export default i18n;
