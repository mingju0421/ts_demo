
<template>
    <div class="Radio" :class="{'disabled': isDisabled}">
        <span class="radio_input">
            <span class="radio_inner" :class="{'isChecked': label === model, 'disabled': isDisabled}"></span>
            <input type="radio" class="radio" :value="label" v-model="model" :id='id'>
        </span>
        <label :for="id" class="label" :class="{'isChecked': label === model, 'disabled': isDisabled}">{{$slots.default[0].text}}</label>
    </div>
</template>

<script  lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
@Component
export default class Radio extends Vue{
    isChecked: boolean = false;
    @Prop({default: ''})
    value!: string;
    @Prop({default: ''})
    label!: string|number;
    @Prop({default: true})
    disabled!: boolean|string;
    @Prop({default: false})
    border!: boolean;
    @Prop({default: ''})
    name!: string;

    id: string = this.generateId()
    grup?: any

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
    get model  (): string|number {
        if (this.isGrup) {
            return this.grup.value
        }
        return this.value
    }
    set model (val) {
        if (this.isGrup) {
            this.grup.$emit('input', val)
        }else {
            this.$emit('input', val);
        }
    }
    get isDisabled () {
        if (this.disabled === '') {
            return true
        }
        return this.disabled
    }
    get isGrup () {
        let parent = this.$parent
        while (parent) {
            if (parent.$options.name !== 'RadioGrup') {
                parent = parent.$parent
            }else {
                this.grup = parent
                return true
            }
        }
        return false
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
