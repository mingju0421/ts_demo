<template>
    <li class="select_item"
        @mouseenter="hoverItem">
        <slot>
            <span>{{currentLabe}}</span>
        </slot>
    </li>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';


interface selectObj {
    hoverIndex: Number,
    options: any
}

@Component
export default class Option extends Vue{
    /** 当前项是否被禁用 */
    disabled: Boolean = false;
    /** 当前组是否被禁用 */
    groupDisabled: Boolean = false;
    /**
     * 保存选中项的下标和组件的依赖
     * @namespace
     * @property {number} hoverIndex - 当前项下标
     * @property {array} options - 组件依赖
     */
    select: selectObj = {
        hoverIndex: 1, 
        options: []
    }

    /** 当鼠标移入时触发,鼠标悬停的时候,更新选中项 */
    hoverItem () {
        if (!this.disabled && !this.groupDisabled) {
            this.select.hoverIndex = this.select.options.indexOf(this);
        }
    }
}
</script>

<style lang="stylus" scoped>
.Select
    position relative
</style>