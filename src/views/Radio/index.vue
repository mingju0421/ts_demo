
<template>
    <div class="Radio">
        <span class="radio_input">
            <span class="radio_inner"></span>
            <input type="radio" class="radio" @click="a">
        </span>
        
        <span class="label">{{$slots.default[0].text}}</span>
    </div>
</template>

<script  lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class Option extends Vue{
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
    a () {
        if (this.$slots.default) {
            console.log(this.$slots.default[0])
        }
        
    }

}
</script>

<style scoped lang="stylus">
.Radio
    position relative
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


</style>
