<template>
  <div id="app">
    <TodoHeader/>
    <router-view/>
  </div>
</template>

<script>
import TodoHeader from './components/Header.vue'

export default {
  name: 'app',
  components: {
    TodoHeader
  }
}
</script>
