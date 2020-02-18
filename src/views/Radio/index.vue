
<template>
<!-- <div class="radioGrup"> -->
    <div class="Radio" @click="select" :class="{'disabled': disabled}">
        <span class="radio_input">
            <span class="radio_inner" :class="{'isChecked': label === model, 'disabled': disabled}"></span>
            <input type="radio" class="radio">
        </span>
        <span class="label" :class="{'isChecked': label === model, 'disabled': disabled}">{{$slots.default[0].text}}</span>
    </div>
<!-- </div> -->
</template>

<script  lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class Radio extends Vue{
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

    @Emit('change')
    changed () {
        this.$emit('change', this.value)
    }
    /**
     * 选择单选框, 修改
     */
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
