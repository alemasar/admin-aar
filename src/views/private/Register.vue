<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Register form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="10">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    show: false,
    passwordRules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    },
    token: ""
  }),
  mounted() {
    this.token = this.getCookie("token");
    console.log("EIII FORM VALID", this.token);
    if (this.token === "") {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const token = this.getCookie("token");
        console.log("EIII FORM VALID", token);
        const options = { headers: { Authorization: `Bearer ${token}` } };
        this.axios
          .post(
            "http://backend.aar/users",
            {
              name: this.name,
              email: this.email,
              password: this.password
            },
            options
          )
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e.response.data.error);
          });
      }
    },
    getCookie(cname) {
      const name = cname + "=";
      const ca = document.cookie.split(";");
      console.log(ca);
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
};
</script>
