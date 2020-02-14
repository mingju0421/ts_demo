<template>
    <div class="cascadderWrap" ref="cascadderWrap" @click.stop="() => {}">
        <div class="cascadder"  @click="onCascadderClick" >
            <div slot="header" v-if="false"></div>
            <div class="cascadderLabel" v-if="cascadderLabel">{{cascadderLabel}}</div>
            <div class="placeholder" v-else>{{placeholder}}</div>
            <div class="icon" ref="icon" :class="{'iconRotate': isDropdown}"> 
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </div>
        <div class="dropdown" v-if="isDropdown">
            <div class="selectionList">
                <div class="selection" v-for="(selection, index) in rootSelectionList" :key="index" @click="selectChildrenSelection(selection)">
                    <span>{{selection.label}}</span>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </div>
            </div>
            <div class="selectionList dropdownBorder" v-if="childrenSelectList.length">
                <div class="selection" v-for="(selection, index) in childrenSelectList" :key="index" @click="selectLastSelection(selection)">
                    <span>{{selection.label}}</span>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </div>
            </div>
            <div class="selectionList dropdownBorder" v-if="lastSelection.length">
                <div class="selection" v-for="(selection, index) in lastSelection" :key="index" @click="selectOption(selection)">
                    <span :class="{'selected': selection.selected}">{{selection.label}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

interface objArr {
    [index: number]: selectionObj;
    length: number;
}
interface selectionObj {
    label: String;
    children?: objArr;
    selected?: boolean;
    
}



@Component
export default class cascadder extends Vue {
    placeholder: String = '请选择';
    isDropdown: boolean = false;
    cascadderLabel: String = '';
    temporaryCascadderLabel: String = '';
    
    /** 根选择列表 */
    rootSelectionList: objArr = [{label: '指南', children: [{label: '设计原则'}, {label: '导航', children: [{label: '侧向导航'}, {label: '顶部导航'}]}]}, {label: '组件'}, {label: '资源'}];
    /** 次级选择列表 */
    childrenSelectList: objArr = [];
    /** 最后一级选择器 */
    lastSelection: objArr = [];

    onCascadderClick () {
        this.isDropdown = !this.isDropdown
    }

    selectChildrenSelection (obj: selectionObj) {
        for (let i = 0; i < this.rootSelectionList.length; i++) {
            delete this.rootSelectionList[i].selected
        }
        obj.selected = true
        if (obj.children) {
            this.childrenSelectList = obj.children
        }
        this.temporaryCascadderLabel = obj.label
        
    }
    selectLastSelection (obj: selectionObj) {
        for (let i = 0; i < this.childrenSelectList.length; i++) {
            delete this.childrenSelectList[i].selected
        }
        obj.selected = true
        if (obj.children) {
            this.lastSelection = obj.children
        }
        this.temporaryCascadderLabel += '/' + obj.label
        
    }
    heandleClose () {}
    selectOption (obj: selectionObj) {
        for (let i = 0; i < this.lastSelection.length; i++) {
            delete this.lastSelection[i].selected
        }
        obj.selected = true
        this.isDropdown = !this.isDropdown
        this.temporaryCascadderLabel += '/' + obj.label
        this.cascadderLabel = this.temporaryCascadderLabel
    }
    
    clickOut () {
        this.isDropdown = !this.isDropdown
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('click', this.clickOut)
        })
    }
    mounted () {
        document.addEventListener('click', this.clickOut)
    }
}
</script>

<style lang="stylus">
.cascadderWrap
    position relative
    .cascadder
        display flex
        justify-content space-between
        border 1px solid #999
        padding 5px 8px
        border-radius 4px
        .placeholder
            user-select none
            color #bbb
            flex-grow 1
        .icon  
            transition .3s
            padding 0 5px
        .iconRotate
            transform rotate(180deg)
    .dropdown
        position absolute
        top  100%
        border 1px solid #999
        display flex
        margin 10px 0
    .dropdown
        border-radius 4px
        .selected
            color blue
        .dropdownBorder
            border-left 1px solid #999
        .selectionList
            max-height 150px
            padding 5px 0
            overflow auto
        .selection
            padding 5px 15px
            width 200px
            display flex
            justify-content space-between
            &:hover
                background-color #eee


</style>