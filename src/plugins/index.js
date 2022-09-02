import { createApp } from 'vue'
import App from '../App.vue'
import { Button, Swipe, SwipeItem, Popup, Form, Field, CellGroup } from 'vant';

const app = createApp(App)
app.use(Button);
app.use(Swipe);
app.use(SwipeItem);
app.use(Popup);
app.use(Form);
app.use(Field);
app.use(CellGroup);