<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">SignUp</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="login">ログイン画面はこちら</v-btn>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation>

          <v-text-field
              v-model="name"
              :rules="nameRules"
              label="UserName"
              required>
          </v-text-field>

          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required>
          </v-text-field>

          <v-text-field
              v-model="password"
              label="Password"
              type="password">

          </v-text-field>

          <v-btn color="success" class="login-btn" :disabled="isValid" @click="submit">SIGN UP</v-btn>
          <v-btn>CLEAR</v-btn>

          <v-alert
              v-if="errorMessage"
              class="error-message"
              dense
              outlined
              type="error">
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '名前を入力してください',
      v => (v && v.length <= 10) || '名前は10文字以内で入力してください',
    ],
    email: '',
    emailRules: [
      v => !!v || 'メールアドレスを入力してください',
      v => /.+@.+\..+/.test(v) || 'メールアドレスが不正です',
    ],
    password: '',
    select: null,
    errorMessage: ""
  }),
  computed: {
    isValid() {
      return !this.valid;
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    submit() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(async (result) => {
        console.log("success", result)
        await result.user.updateProfile(
            {displayName: this.name}
        );

        localStorage.message = "新規作成に成功しました"

        this.$router.push('/login')

      })
      .catch((error) => {
        console.log("fail", error)
        this.errorMessage = "ユーザーの新規作成に失敗しました。"
      })
    }
  },
}
</script>

<style scoped>
.login-form {
  margin: 150px;
  padding: 30px;
}

.login-box {
  width: 50%;
  margin: 0 auto;
  padding: 30px;
}

.login-title {
  display: inline-block;
}

.login-btn {
  margin-right: 20px;
}

.error-message {
  margin-top: 20px;
}
</style>