import {
    Button,
    Input,
    Row,
    Col,
    List,
    Avatar
} from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';

const ant = {
    install(Vue) {
        Vue.component(Button.name, Button);
        Vue.component(Input.name, Input);
        Vue.component(Input.Search.name, Input.Search);
        Vue.component(Row.name, Row);
        Vue.component(Col.name, Col);
        Vue.component(List.name, List);
        Vue.component(List.Item.name, List.Item);
        Vue.component(List.Item.Meta.name, List.Item.Meta);
        Vue.component(Avatar.name, Avatar);
    },
}

export default ant;