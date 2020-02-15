<template>
    <div class="options">
        <div class="selection" v-for="(node, index) in nodes" :key="index" @click="addNodes(index, node.level)" :class="{'selectedNode': node.isActivePath}">
            <span  :class="{'selected': node.isActivePath}">{{node.label}}</span>
            <i class="fa fa-angle-right" aria-hidden="true" v-if="node.children"></i>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

interface objArr {
    [index: number]: selectionObj;
    length: number;
}
interface selectionObj {
    value: String;
    label: String;
    isActivePath: boolean;
    level?: number;
    children?: objArr;
    selected?: boolean;
}

@Component
export default class Options extends Vue {
    @Prop({default: []})
    nodes!: objArr;
    addNodes (index: number, level:number) {
        this.$emit('addNodes', JSON.parse(JSON.stringify(this.nodes)), index, level)
    }
}
</script>

<style lang="stylus" scoped>
.selected
    color blue
    background-color #eee
.options
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
        &.selectedNode
            background-color #eee

</style>