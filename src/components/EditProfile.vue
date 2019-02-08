<template>
  <div>
    <b-form @submit.prevent="updateUser" v-if="user">
      <b-form-group horizontal label="Name" :label-cols="2">
        <b-form-input v-model="user.name"></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Email" :label-cols="2">
        <b-form-input v-model="user.email"></b-form-input>
      </b-form-group>
      <b-btn type="submit" variant="primary">Update Profile</b-btn>
    </b-form>
    <b-alert class="mt-3" variant="success" :show="updateSuccessful">Your profile was updated successfully</b-alert>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";

export default {
  name: "EditProfile",
  data() {
    return {
      userId: this.$route.params.userId,
      user: null,
      updateSuccessful: false
    };
  },
  methods: {
    getUser() {
      UserApi.getUser(this.userId).then(user => (this.user = user));
    },
    updateUser(evt) {
      UserApi.updateUser(this.user).then(x => this.updateSuccessful = true);
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

