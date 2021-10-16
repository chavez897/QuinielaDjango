<template>
  <div>
    <vs-navbar id="main-navbar" class="app-nav" color="dark">
      <div slot="title" vs-w="12">
        <vs-navbar-title>
          <vs-row vs-justify="center">
            <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
              <vs-button
                color="dark"
                type="filled"
                icon="menu"
                @click="showSideBar"
              >
                <span class="page-title" v-text="pageTitle" />
              </vs-button>
            </vs-col>
          </vs-row>
        </vs-navbar-title>
      </div>
      <div>
        <!-- NOTIFICATIONS -->
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
            style="color: white"
            :badge="unreadNotifications.length"
          />

          <vs-dropdown-menu style="width: 500px">
            <div class="text-center p-1 bg-primary text-white">
              <h3 class="text-white">
                {{ unreadNotifications.length }} Mensajes Nuevos
              </h3>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              :key="$vs.rtl"
              class="p-0 mb-10"
              :settings="settings"
              style="max-height: 300px"
            >
              <ul>
                <li
                  v-for="ntf in unreadNotifications"
                  :key="ntf.index"
                  class="flex justify-between px-4 py-3 cursor-pointer"
                  @click.stop="readNotifiaction(ntf)"
                >
                  <div class="flex items-start">
                    <feather-icon
                      icon="MessageSquareIcon"
                      style="color: black"
                    ></feather-icon>
                    <div id="preview-message" class="mx-2">
                      <span class="font-medium block"
                        >{{ ntf.messageType }} -</span
                      >
                      <small>{{ ntf.message }}</small>
                    </div>
                    <small class="mt-1 whitespace-no-wrap">{{
                      elapsedTime(ntf.date)
                    }}</small>
                  </div>
                </li>
              </ul>
            </VuePerfectScrollbar>

            <div id="view-all" class="text-center cursor-pointer pt-2">
              <router-link
                :to="{
                  name: 'NotificationsUser',
                }"
              >
                <vs-button class="px-5" style="width: 100%">
                  <span>Ver Todas las Notificaciones</span>
                </vs-button>
              </router-link>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>
        <!-- NOTIFICATIONS -->
      </div>
      <div>
        <vs-navbar-item index="1">
          <a class="link" target="_blank" :href="shopUrl"
            ><vs-icon icon="store" size="small" color="white"></vs-icon
          ></a>
        </vs-navbar-item>
      </div>
      <div>
        <vs-navbar-item index="0">
          <router-link
            :to="{
              name: 'shopGeneralSettings',
            }"
          >
            <vs-icon icon="settings" size="small" color="white"></vs-icon>
          </router-link>
        </vs-navbar-item>
      </div>
    </vs-navbar>
    <vs-popup
      :active.sync="notifiactionModal"
      :title="showNotification.messageType"
    >
      <div>
        {{ showNotification.message }}
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { eventBus } from '@/plugins/event-bus'
import { mapState, mapActions } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'NavBar',
  components: {
    VuePerfectScrollbar,
  },
  data: function () {
    return {
      unreadNotifications: [],
      notifiactionModal: false,
      showNotification: {},
      settings: {
        maxScrollbarLength: 5,
        wheelSpeed: 0.6,
      },
      activeItem: 0,
    }
  },
  computed: {
    ...mapState('auth', { token: 'tokenAccess', user: 'user' }),
    ...mapState('shop', { shop: 'shop', site: 'site' }),
    pageTitle: function () {
      return this.$route.meta.title
    },
    shopUrl: function () {
      if (this.shop.domain) {
        if (process.env.NODE_ENV === 'development') {
          return `http://${this.shop.domain}:4000/`
        } else {
          return `https://${this.shop.domain}/`
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          return `http://${this.shop.slug}.${this.site}:4000/`
        } else {
          return `https://${this.shop.slug}.${this.site}/`
        }
      }
    },
  },
  mounted() {
    this.loadNotifiactions()
    this.interval = setInterval(() => this.loadNotifiactions(), 1000 * 60 * 10)
  },
  beforeDestroy() {
    eventBus.$off('showSideBar', this.listener)
  },
  methods: {
    ...mapActions('system', {
      getSystemNotifiactions: 'getSystemNotifiactions',
      readSystemNotifiaction: 'readSystemNotifiaction',
    }),
    showSideBar: () => {
      eventBus.$emit('showSideBar')
    },
    readNotifiaction(notification) {
      this.readSystemNotifiaction(notification.id)
      var index = this.unreadNotifications.indexOf(notification)
      if (index > -1) {
        this.unreadNotifications.splice(index, 1)
      }
      if (notification.overflowApplied) {
        this.notifiactionModal = true
        this.showNotification = notification
      }
    },
    loadNotifiactions() {
      this.getSystemNotifiactions(`user=${this.user.user_id}&read=false`).then(
        (res) => {
          this.unreadNotifications = res.results
          this.unreadNotifications.forEach((notification) => {
            if (notification.messageType === 'SER') {
              notification.messageType = 'Emida Servicios '
            } else if (notification.messageType === 'REC') {
              notification.messageType = 'Emida Recargas'
            }
            notification.overflowApplied =
              notification.messageType.length + notification.message.length >
              100
          })
        }
      )
    },
    elapsedTime(startTime) {
      let x = new Date(startTime)
      let now = new Date()
      var timeDiff = now - x
      timeDiff /= 1000
      var seconds = Math.round(timeDiff)
      timeDiff = Math.floor(timeDiff / 60)
      var minutes = Math.round(timeDiff % 60)
      timeDiff = Math.floor(timeDiff / 60)
      var hours = Math.round(timeDiff % 24)
      timeDiff = Math.floor(timeDiff / 24)
      var days = Math.round(timeDiff % 365)
      timeDiff = Math.floor(timeDiff / 365)
      var years = timeDiff
      if (years > 0) {
        return 'hace ' + years + (years > 1 ? ' Año ' : ' Años ')
      } else if (days > 0) {
        return 'hace ' + days + (days > 1 ? ' Días ' : ' Día ')
      } else if (hours > 0) {
        return 'hace ' + hours + (hours > 1 ? ' Hrs ' : ' Hour ')
      } else if (minutes > 0) {
        return 'hace ' + minutes + (minutes > 1 ? ' Mins ' : ' Min ')
      } else if (seconds > 0) {
        return 'hace ' + seconds + (seconds > 1 ? ' Seg' : 'Ahora')
      }
      return 'Ahora'
    },
  },
}
</script>

<style lang="scss">
@import '~@/scss/_variables.scss';
#main-navbar {
  color: rgb(255, 255, 255);
  height: $navbar-height;
  position: fixed;
  top: 0;
  left: 0;
  .page-title {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
  .vs-navbar--btn-responsive {
    display: none;
  }
  a.link {
    color: #fefefe;
    font-weight: 300;
    transition: all 0.3s ease;
    &:hover {
      color: #cdcdcd;
    }
  }
}
#view-all {
  border-style: solid;
  border-top-width: 1px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  font-weight: 600;
}
#preview-message {
  text-align: justify;
  text-justify: inter-word;
  width: 350px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
