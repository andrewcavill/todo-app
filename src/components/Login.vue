<template>
  <div>
    <b-form @submit.prevent="login">
      <b-form-group horizontal label="Email" :label-cols="2">
        <b-form-input v-model="email"></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Password" :label-cols="2">
        <b-form-input v-model="password"></b-form-input>
      </b-form-group>
      <b-btn type="submit" variant="primary">Login</b-btn>
    </b-form>
    <b-alert class="mt-3" variant="danger" :show="loginFailed">Your email or password are incorrect</b-alert>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      loginFailed: false
    };
  },
  methods: {
    login(evt) {
      UserApi.getUserByEmail(this.email).then(
        user => {
          if (user)
            this.$router.push({ path: '/users/'+user.id+'/todolists' })
          else
            this.loginFailed = true;
        }
      );
    }
  }
};
</script>

