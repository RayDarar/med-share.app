import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#004fa8",
        secondary: "#1a76dc",
      },
    },
  },
  lang: {
    current: "ru",
    locales: { ru },
  },
});
