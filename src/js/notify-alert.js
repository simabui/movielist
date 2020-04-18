import PNotify from "pnotify/dist/es/PNotify.js";
import PNotifyStyleMaterial from "pnotify/dist/es/PNotifyStyleMaterial.js";
import "pnotify/dist/PNotifyBrightTheme.css";
import "material-design-icons/iconfont/material-icons.css";

PNotify.defaults.styling = "material";
PNotify.defaults.icons = "material";
PNotify.defaults.height = "68px";
PNotify.defaults.delay = 1000;

const SUCCESS = "Successful response";
const ALERT = "Not Found";
// success
export const success = () => {
  PNotify.success({
    text: SUCCESS
  });
};

export const alert = () => {
  PNotify.error({
    text: ALERT
  });
};
