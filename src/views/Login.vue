<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="10">
                <v-form ref="form" v-model="valid" lazy-validation>
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
                  <div class="row">
                    <div class="col">
                      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>
                    </div>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    valid: true,
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
    }
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log("EIII FORM VALID");

        const options = {};

        this.axios
          .post(
            "http://backend.aar/api/tokens",
            {
              email: this.email,
              password: this.password
            },
            options
          )
          .then(response => {
            console.log(response.data);
            // The JWT from the response object
            const token = response.data.access_token;

            // Max age in seconds
            const maxAge = response.data.expires_in;

            // Set samesite cookie
            document.cookie =
              "token=" + token + "; path=/; SameSite=Lax; max-age=" + maxAge;
            //console.log(document.cookie);
            this.$router.push({ name: "register" });
          })
          .catch(e => {
            console.log(e.response.data.error);
          });
      }
    }
  }
};
</script>
