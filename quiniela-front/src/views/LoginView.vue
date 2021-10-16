<template>
  <div class="my-auto">
    <vs-row
      class="h-full"
      vs-align="center"
      vs-type="flex"
      vs-justify="center"
      vs-w="12"
    >
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="3"
        vs-sm="4"
        vs-xs="0"
      >
        <div class="logo-container">
          <figure>
            <img
              src="https://1000marcas.net/wp-content/uploads/2020/03/NFL-Logo-1962.png"
              class="img-logo"
              alt="LOGO"
            />
          </figure>
        </div>
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="4"
        vs-sm="8"
        vs-xs="12"
      >
        <vs-card class="px-2 py-3">
          <div slot="header" class="mb-2">
            <h2 class="mb-1">Log In</h2>
            <p class="small-font">Welcome, please login into your account.</p>
          </div>
          <div class="pb-3">
            <vs-row vs-w="12">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12"
              >
                <vs-input
                  v-model="user.email"
                  size="large"
                  type="email"
                  label-placeholder="Email"
                  autocomplete="username"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12"
              >
                <vs-input
                  v-model="user.password"
                  class="mt-4"
                  size="large"
                  label-placeholder="Contraseña"
                  type="password"
                  autocomplete="current-password"
                  @keyup.enter="_login"
                />
              </vs-col>
              <vs-col vs-type="flex" class="text-right" vs-w="12">
                Olvidé mi Contraseña
              </vs-col>
              <vs-col vs-type="flex" vs-align="center" vs-w="12">
                <vs-button
                  class="btn btn-block mt-3"
                  color="primary"
                  size="large"
                  type="filled"
                  @click="login()"
                >
                  Iniciar Sesión
                </vs-button>
              </vs-col>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data: function () {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  created() {
    //this.login()
  },
  methods: {
    login() {
      this.$store.dispatch('auth/loginAction', this.user).then(() => {
        this.$router.push({
          name: 'MyLeagues',
        })
      })
    },
  },
}
</script>
