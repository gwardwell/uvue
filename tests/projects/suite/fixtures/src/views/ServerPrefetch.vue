<template>
  <div class="page">
    <h1><span class="code">serverPrefetch()</span></h1>

    <test-case
      expected="native"
      :result="foo"
    />

    <router-view/>
  </div>
</template>

<script>
import { promiseData } from '@/shared/utils';
import PrefetchComponent from '../components/PrefetchComponent.vue';

export default {
  components: {
    PrefetchComponent,
  },

  head() {
    return {
      title: `serverPrefetch()`,
    };
  },

  data: () => ({
    foo: '',
  }),

  async serverPrefetch() {
    this.foo = await promiseData('native');
  },

  async mounted() {
    if (!this.foo) {
      this.foo = await promiseData('native');
    }
  },
};
</script>

<style scoped>
h1 {
  position: relative;
}
</style>

