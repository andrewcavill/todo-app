<template>
  <b-form @submit.prevent="changePassword">
    <b-form-group horizontal label="Existing Password" :label-cols="4">
      <b-form-input v-model="existingPassword" placeholder="Existing password"></b-form-input>
    </b-form-group>
    <b-form-group horizontal label="New Password" :label-cols="4">
      <b-form-input v-model="newPassword" placeholder="New password"></b-form-input>
    </b-form-group>
    <b-form-group horizontal label="Confirm New Password" :label-cols="4">
      <b-form-input v-model="confirmNewPassword" placeholder="Confirm new password"></b-form-input>
    </b-form-group>
    <b-btn type="submit" variant="primary">Change Password</b-btn>
  </b-form>
</template>

<script>
import UserApi from "@/services/UserApi";

export default {
  name: "ChangePassword",
  data() {
    return {
      userId: this.$route.params.userId,
      existingPassword: null,
      newPassword: null,
      confirmNewPassword: null
    };
  },
  methods: {
    changePassword(evt) {}
  }
};
</script>

