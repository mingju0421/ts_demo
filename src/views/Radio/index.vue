
<template>
<div class="radioGrup"> 
    <slot></slot>
</div>
</template>

<script  lang="ts">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator';
const Radio = () => import('./Radio.vue');
@Component({
    components: {
        Radio,
    }
})
export default class RadioGrup extends Vue{
    isChecked: boolean = false;
    @Prop({default: ''})
    value!: string;
    @Prop({default: ''})
    label!: string;
    @Prop({default: false})
    disabled!: boolean;
    @Prop({default: false})
    border!: boolean;
    @Prop({default: ''})
    name!: string;

    id: string = this.generateId()

    @Emit('change')
    changed () {
        this.$emit('change', this.value)
    }
    generateId () {
        const s = []
        const hexDigits = '0123456789abcdef';
        for (let i: number = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
        }
        return s.join('')
    }
    select ():void {
        if (this.$slots.default) {
            this.model = this.label
        }
    }
    get model  ():string {
        return this.value
    }
    set model (val) {
        this.$emit('input', val);        
    }
    @Watch('value')
    chenge (val: any) {
        console.log(val)
    }
}
</script>

<style scoped lang="stylus">
.Radio
    cursor: pointer;
    position relative
    margin 0 30px 10px 0
    .isChecked
        color #409eff
    .label
        padding-left 10px
    .radio_input
        position relative
        .radio_inner
            width 14px
            height 14px
            border-radius 50%
            background-color #fff
            border 1px solid #ccc
            position relative
            display inline-block
            &:after
                content ''
                width 4px
                height 4px
                background-color #fff
                position absolute
                top 0
                bottom 0
                left 0
                right 0
                margin auto
                border-radius 50%
                    
            &.isChecked
                background-color #409eff
                border-color #409eff
                color #409eff
                &.disabled
                    background-color #f5f7fa
                    border-color #e4e7ed
                    &:after
                        background-color #c0c4cc


</style>
