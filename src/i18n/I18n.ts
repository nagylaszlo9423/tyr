import VueI18n, {LocaleMessages} from 'vue-i18n';
import Vue from "vue";

const translations: LocaleMessages = {};
const languages: string[] = ['en', 'hu'];
for(let idx in languages) {
    translations[languages[idx]] = require(`./languages/${languages[idx]}.json`);
}

Vue.use(VueI18n);

export default new VueI18n({
    locale: 'en',
    messages: translations
});
