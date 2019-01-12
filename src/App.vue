<template>
  <div id="app">
    <TodoHeader/>
    <div id="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/Header.vue";

export default {
  name: "app",
  components: {
    TodoHeader
  }
};
</script>

<style>
  #view {
    padding: 20px;
  }
</style>
