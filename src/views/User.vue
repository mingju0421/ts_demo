<template>
    <div>
        name: <input title="name" v-model="name" /><br/>
        age: <input title="age" type="number" v-model="age" /><br/>
        <Hello v-if="showHello" :name='name' :age='age'/>
        <button type="button" @click="onShowHelloClick">Show Hello</button>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
const Hello = () => import('./Home.vue')

@Component({
    components: {
        Hello
    }
})
export default class User extends Vue {
    showHello = false;
    name: string = '';
    age: number = 0;

    onShowHelloClick () {
        this.showHello = !this.showHello
    }
}
</script>
