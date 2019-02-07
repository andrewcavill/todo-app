<template>
  <div id="app" class="container pt-3">
    <TodoHeader/>
    <div id="view" class="pt-3">
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

#app {
  max-width: 900px;
}

</style>
