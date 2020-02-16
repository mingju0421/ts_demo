<template>
    <div class="cascadderWrap" ref="cascadderWrap" @click="clickStop" @keydown="keySelect">
        <div class="cascadder" @click="onCascadderClick">
            <input type="text" class="inputInner" :placeholder="placeholder" :value="cascadderLabel">
            <div class="icon" ref="icon" :class="{'iconRotate': isDropdown}"> 
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </div>
        <div class="dropdown" v-show="isDropdown" >
            <Options v-for="(nodes, index) in menus" :key="index" :nodes='nodes' @addNodes='addNodes'  :class="{border: index > 0}" @keydown="keySelect"/>
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
    menus: objArr[] = []
    isDropdown: boolean = false;
    cascadderLabel: String = '';
    placeholder: String = '请选择';
    selected: string[] = [];
    isOutSide: boolean = true;
    keySelectedArr: objArr = []

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
        if (!this.isDropdown) {
            Vue.set(this.keySelectedArr, 'length', 0)
        }
    }
    /**
     * 确定渲染数组 menus 的结构
     * @param {objArr} nodes 选中的一级选项数组
     * @param {number} index 选中的选项在数组中的下标
     * @param {number} level 当前数组的层级
     * @param {booleam} flag 当点击触发时，默认为 true，键盘触发的时候传 false，阻止触发 change 事件
     */
    addNodes (nodes: objArr, index: number, level: number, flag: boolean = true, isKeyLeft: boolean = false) {
        if (nodes[index].children) {
            if (isKeyLeft) {
                console.log(level - 1)
                Vue.set(this.menus, 'length', level)
                console.log(this.menus)
                Vue.set(this.menus, level , nodes)
                for (let i:number = 0; i < this.menus[level - 1].length; i++) {
                    Vue.set(this.menus[level - 1][i], 'level', level)
                    Vue.set(this.menus[level - 1][i], 'isActivePath', false)
                }
                
            }else {
                Vue.set(this.menus, 'length', level)
                Vue.set(this.menus, level || 1, nodes[index].children)
                for (let i:number = 0; i < this.menus[level].length; i++) {
                    Vue.set(this.menus[level][i], 'level', level + 1 || 1)
                    Vue.set(this.menus[level][i], 'isActivePath', false)
                }
            }
            
            
            Vue.set(this.selected, 'length', level)
            Vue.set(this.selected, level-1, nodes[index].label)
        }else {
            Vue.set(this.selected, 'length', level)
            Vue.set(this.selected, level-1, nodes[index].label)
            if (flag) {
                // 当点击的选项没有子元素的时候，给 cascadderLabel 赋值，隐藏下拉框， 触发传入的 change 事件
                Vue.set(this, 'cascadderLabel', this.selected.join('/'))
                this.isDropdown = false
                this.$emit('change', this.selected)
            }
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
            Vue.set(this.keySelectedArr, 'length', 0)
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('click', this.clickOut)
            })
        }
        
    }
    keyDownSelect () {
        if (!this.isDropdown) {
            this.isDropdown = true
            Vue.set(this.keySelectedArr, 'length', 0)
        }
        if (this.keySelectedArr.length) {
            let index: number = 0;
            let arr: objArr = this.keySelectedArr
            for (let i: number = 0; i < arr.length - 1; i++) {
                if (arr[i].isActivePath) {
                    Vue.set(arr[i], 'isActivePath', false)
                    Vue.set(arr[i + 1], 'isActivePath', true)
                    index = i + 1
                    Vue.set(this, 'keySelectedArr', JSON.parse(JSON.stringify(arr)))
                    this.addNodes(JSON.parse(JSON.stringify(this.menus[this.keySelectedArr[0].level ? this.keySelectedArr[0].level - 1 :  0])), index, this.keySelectedArr[0].level || 1, false)
                    break
                } 
            }
        }else {
            for (let i: number = 0; i < this.menus[0].length; i++) {
                Vue.set(this.menus[0][i], 'isActivePath', false)
            }
            Vue.set(this.menus[0][0], 'isActivePath', true)
            Vue.set(this, 'keySelectedArr', this.menus[0])
            this.addNodes(JSON.parse(JSON.stringify(this.menus[0])), 0, 1)
        }
    }
    keyUpSelect () {
        if (this.keySelectedArr.length) {
            let index: number = 0;
            let arr: objArr = this.keySelectedArr
            for (let i: number = 0; i < arr.length; i++) {
                if (arr[i].isActivePath && i > 0) {
                    Vue.set(arr[i], 'isActivePath', false)
                    Vue.set(arr[i - 1], 'isActivePath', true)
                    index = i - 1
                    Vue.set(this, 'keySelectedArr', JSON.parse(JSON.stringify(arr)))
                    this.addNodes(JSON.parse(JSON.stringify(this.menus[this.keySelectedArr[0].level ? this.keySelectedArr[0].level - 1 :  0])), index, this.keySelectedArr[0].level || 1, false)
                    break
                } 
            }
        }
    }
    keyRightSelect () {
        if (this.keySelectedArr.length && this.keySelectedArr[0].children) {
            for (let i: number = 0; i < this.menus[this.menus.length - 1].length; i++) {
                Vue.set(this.menus[this.menus.length - 1][i], 'isActivePath', false)
            }
            Vue.set(this.menus[this.menus.length - 1][0], 'isActivePath', true)
            Vue.set(this, 'keySelectedArr', JSON.parse(JSON.stringify(this.menus[this.menus.length - 1])))
            this.addNodes(JSON.parse(JSON.stringify(this.menus[this.menus.length - 1])), 0, this.keySelectedArr[0].level || 1, false)
        }
    }
    keyLeftSelect () {
        if (this.keySelectedArr[0].level && this.keySelectedArr[0].level >= 2) {
            let index: number = 0
            for (let i: number = 0; i < this.menus[this.keySelectedArr[0].level - 1].length; i++) {
                Vue.set(this.menus[this.keySelectedArr[0].level - 1][i], 'isActivePath', false)
            }
            for (let i: number = 0; i < this.menus[this.keySelectedArr[0].level - 2].length; i++) {
                if (this.menus[this.keySelectedArr[0].level - 2][i].isActivePath) {
                    index = i
                    break
                }
            }
            Vue.set(this.menus[this.keySelectedArr[0].level - 2][index], 'isActivePath', true)
            Vue.set(this, 'keySelectedArr', JSON.parse(JSON.stringify(this.menus[this.keySelectedArr[0].level - 2])))
            console.log(this.menus[this.keySelectedArr[0].level])
            this.addNodes(JSON.parse(JSON.stringify(this.menus[this.keySelectedArr[0].level])), index, this.keySelectedArr[0].level || 1, false, true)
        }
    }
    keyEnter () {
        let index: number = 0
        for (let i: number = 0; i < this.keySelectedArr.length; i++) {
            if (this.keySelectedArr[i].isActivePath) {
                index = i
                break
            }
        }
        if (!this.keySelectedArr[index].children) {
            this.addNodes(JSON.parse(JSON.stringify(this.keySelectedArr)), index, this.keySelectedArr[index].level || 1)
        }
    }
    keySelect (e:KeyboardEvent) {
        switch (e.keyCode) {
            case 37:
                this.keyLeftSelect()
                break
            case 38:
                this.keyUpSelect()
                break
            case 39:
                this.keyRightSelect()
                break
            case 40: 
                this.keyDownSelect()
                break
            case 13:
                this.keyEnter()
        }
    }
}

</script>

<style lang="stylus">
.cascadderWrap
    position relative
    .border
        border-left 1px solid #999
    .cascadder
        border 1px solid #999
        padding 0 8px
        border-radius 4px
        display flex
        justify-content space-between
    .inputInner
        padding 5px 0
        outline-style none
        border none
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
        


</style>