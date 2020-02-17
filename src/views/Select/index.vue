<template>
    <div class="Select">
        <div class="select_tage"></div>
        <input type="text">
        <transition>
            <SelectMenu >
                <!-- scrollbar 滚动条组件 -->
                <Scrollbar>
                    <Option></Option>
                    <slot></slot>
                </Scrollbar>
                <p></p>
            </SelectMenu>
        </transition>

    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

const SelectMenu = () => import('./SelectMenu.vue');

@Component({
    components: {
        SelectMenu,
    }
})
export default class Select extends Vue{
    /** 标识是否禁用,禁用状态下不触发事件 */
    selectDisabled: Boolean = false;
    /** 多选状态下多个 tag 并排 */
    menuVisibleOnFocus: Boolean = false;
    /** 标识下拉框是否展开 */
    visible: Boolean = false;

    /** 触发显示下拉框 */
    togglleMenu () {
        if (!this.selectDisabled) {
            if (this.menuVisibleOnFocus) {
                this.menuVisibleOnFocus = false;
            }else {
                this.visible = !this.visible;
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.Select
    position relative
</style>