<template></template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      this.$store.commit("changeUser", null);
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    this.logout();
  }
};
</script>