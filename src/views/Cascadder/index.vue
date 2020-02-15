<template>
    <div class="cascadderWrap" ref="cascadderWrap" @click="clickStop">
    <!-- <div class="cascadderWrap" ref="cascadderWrap" > -->
        <div class="cascadder"  @click="onCascadderClick" >
            <div slot="header" v-if="false"></div>
            <div class="cascadderLabel" v-if="cascadderLabel">{{cascadderLabel}}</div>
            <div class="placeholder" v-else>{{placeholder}}</div>
            <div class="icon" ref="icon" :class="{'iconRotate': isDropdown}"> 
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </div>
        <div class="dropdown" v-show="isDropdown">
            <Options v-for="(nodes, index) in menus" :key="index" :nodes='nodes' @addNodes='addNodes'  :class="{border: index > 0}"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
const Options = ()=> import('./options.vue')

interface objArr {
    [index: number]: selectionObj;
    length: number;
}
interface selectionObj {
    value: String;
    label: String;
    isActivePath?: boolean;
    level?:number;
    children?: objArr;
    selected?: boolean;
}

@Component({
    components: {
        Options,
    }
})
export default class Cascadder extends Vue {
    menus: any[] = []
    isDropdown: boolean = false;
    cascadderLabel: String = '';
    placeholder: String = '请选择';
    selected: string[] = [];
    isOutSide: boolean = true;

    @Prop()
    options!: objArr;

    mounted () {
        Vue.set(this.menus, '0', JSON.parse(JSON.stringify(this.options)))
        for (let i: number = 0; i < this.menus[0].length; i++) {
            Vue.set(this.menus[0][i], 'isActivePath', false);
            Vue.set(this.menus[0][i], 'level', 1);
        }
        document.addEventListener('click', this.clickOut)
    }
    onCascadderClick () {
        this.isDropdown = !this.isDropdown
    }
    addNodes (nodes: objArr, index: number, level: number) {
        if (nodes[index].children) {
            Vue.set(this.menus, 'length', level)
            Vue.set(this.menus, level || 1, nodes[index].children)
            for (let i:number = 0; i < this.menus[level].length; i++) {
                Vue.set(this.menus[level][i], 'level', level + 1 || 1)
                Vue.set(this.menus[level][i], 'isActivePath', false)
            }
            Vue.set(this.selected, 'length', level)
            Vue.set(this.selected, level-1, nodes[index].label)
        }else {
            Vue.set(this.selected, 'length', level)
            Vue.set(this.selected, level-1, nodes[index].label)
            Vue.set(this, 'cascadderLabel', this.selected.join('/'))
            this.isDropdown = false
            this.$emit('change', this.selected)
        }
        
        for (let i: number = 0; i < this.menus[level-1].length; i++) {
            if (this.menus[level-1][i].isActivePath) {
                Vue.set(this.menus[level-1][i], 'isActivePath', false);
            }
        }
        Vue.set(this.menus[level-1][index], 'isActivePath', true)
    }
    clickStop () {
        this.isOutSide = false
        setTimeout(() => {
            this.isOutSide = true
        }, 16)
    }
    clickOut () {
        if (this.isOutSide) {
            this.isDropdown = false
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('click', this.clickOut)
            })
        }
        
    }
}

</script>

<style lang="stylus">
.cascadderWrap
    .border
        border-left 1px solid #999
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