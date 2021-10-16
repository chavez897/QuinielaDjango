<template>
  <div id="app" class="flex">
    <transition name="slide-fade">
      <navbar v-if="isLogged && showNavbar" />
    </transition>
    <transition name="slide-fade">
      <main-sidebar v-if="isLogged" />
    </transition>
    <main>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </main>
    <transition name="slide-fade">
      <app-footer />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    ...mapGetters('auth', { isLogged: 'isLogged' }),
  },
}
</script>
