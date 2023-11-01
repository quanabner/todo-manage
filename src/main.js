import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import {
  Button,
  message,
  Layout,
  ConfigProvider,
  Menu,
  Row,
  Col,
  Card,
  Dropdown,
  Space,
  Divider,
} from "ant-design-vue";
import "@/assets/base.css";

const app = createApp(App);
app.use(router);
app
  .use(Button)
  .use(Layout)
  .use(ConfigProvider)
  .use(Menu)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Dropdown)
  .use(Space)
  .use(Divider)
  .mount("#app");
app.config.globalProperties.$message = message;
