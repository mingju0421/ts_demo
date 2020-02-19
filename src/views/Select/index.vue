<template>
 <div class="select">
     <div class="inputWrap">
         <input type="text" class="input_inner" @click="isDropdown = !isDropdown" readonly="readonly">
        <div class="icon">
            <i class="fa fa-caret-down" aria-hidden="true" :class="{'iconRotate': isDropdown}"></i>
        </div>
     </div>
     <!-- 可输入文本的查询框 -->
     <div class="inputWrap" v-if="false">
         <input type="text" class="input_inner" @click="isDropdown = !isDropdown">
        <div class="icon">
            <i class="fa fa-caret-down" aria-hidden="true" :class="{'iconRotate': isDropdown}"></i>
        </div>
     </div>
     
     <transition>
         <SelectMenu v-show="isDropdown"></SelectMenu>
     </transition>
 </div>
</template>

<script lang="ts">
// https://segmentfault.com/a/1190000014098739 select 源码学习
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
const SelectMenu = () => import('./SelectMenu.vue')
@Component({
    components: {
        SelectMenu
    }
})
export default class Select extends Vue {
    isDropdown: boolean = false;
}
</script>
 
<style scoped lang="stylus">
.select
    position relative
    .inputWrap
        display flex
    
    .input_inner 
        flex-grow 1
        padding 0 30px 0 15px
        background-color #fff
        border-radius 4px
        height 40px
        outline none
        outline none 
        border 1px solid #ccc
        width 100%
    .icon
        width 30px
        margin-left -30px
        display flex
        align-items center
        justify-content center
    .fa-caret-down
        transition .2s
    .iconRotate
        transform rotate(180deg)
        
</style>