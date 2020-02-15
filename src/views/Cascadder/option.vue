<template>
    <div class="cascadderWrap" ref="cascadderWrap" @click="clickStop">
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
                <div class="selection" v-for="(selection, index) in options" :key="index" @click="selectChildrenSelection(selection)">
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