import {DirectiveOptions} from 'vue';
import {DirectiveBinding} from 'vue/types/options';

const aa = () => {}

export const clickOut: DirectiveOptions = {
    bind (el, binding) {
        // aa(el, binding)
    },
    update (el, binding) {},
    unbind(el, binding) {},
}