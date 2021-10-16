<template>
  <div class="container">
    <vs-sidebar
      v-model="active"
      :default-index="getDefaultIndex()"
      color="primary"
      parent="body"
      class="sidebarx"
      :click-not-close="true"
      spacer
    >
      <div slot="header" class="header-sidebar">
        <div class="header-desc">
          <vs-button
            icon="close"
            color="primary"
            type="flat"
            @click="active = false"
          />
        </div>
        <template v-if="user.userprofile.picture !== '#'">
          <vs-avatar size="70px" :src="user.userprofile.picture" />
        </template>
        <vs-avatar
          v-else
          size="70px"
          :src="require('@/assets/images/user-avatar.png')"
        />

        <h4 class="small-font">
          <span class="long-text">
            {{ user.name }} {{ user.lastName }} {{ user.secondLastName }}</span
          >
        </h4>
        <h4>{{ user.userprofile.role | capitalize }}</h4>
        <span class="small-font long-text">{{ user.email }}</span>
        <h4 class="mt-1">
          <span class="long-text">{{ shop.name }}</span>
        </h4>
      </div>
      <!-- Mi Perfil -->
      <vs-sidebar-group title="Mi Perfil" :open="false">
        <div @click="selectOption('Ver mi perfil')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Ver mi perfil' }"
            :to="{
              name: 'MyProfile',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> account_box </span>
            Ver mi perfil
          </router-link>
        </div>
      </vs-sidebar-group>

      <vs-divider
        v-if="
          !(
            user.userprofile.role === roles.ADMIN ||
            user.userprofile.role === roles.MANAGER
          )
        "
        position="left"
      />

      <!-- Ventas -->
      <vs-sidebar-group
        v-if="
          user.userprofile.role === roles.ADMIN ||
          user.userprofile.role === roles.MANAGER ||
          user.userprofile.role === roles.SELLER
        "
        title="Ventas"
        :open="false"
      >
        <div @click="selectOption('nueva venta')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'nueva venta' }"
            :to="{
              name: 'newSale',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> point_of_sale </span>
            Generar venta
          </router-link>
        </div>
        <div @click="selectOption('ventas')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'ventas' }"
            :to="{
              name: 'sales',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> attach_money </span>
            Ventas
          </router-link>
        </div>
        <!-- Analytics Admin -->
        <div
          v-if="
            user.userprofile.role === roles.ADMIN ||
            user.userprofile.role === roles.MANAGER
          "
          @click="selectOption('salesAnalytics')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'salesAnalytics',
            }"
            :to="{
              name: 'salesAnalytics',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> analytics </span>
            Analytics
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Medios de pago -->
      <vs-sidebar-group
        v-if="
          shop.packages.hasSalesModule &&
          (user.userprofile.role === roles.ADMIN ||
            user.userprofile.role === roles.MANAGER)
        "
        title="Medios de Pago"
        :open="false"
      >
        <!-- Facturación -->
        <div
          v-if="
            shop.packages.hasSalesModule &&
            (user.userprofile.role === roles.ADMIN ||
              user.userprofile.role === roles.MANAGER)
          "
          @click="selectOption('Cobros')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Cobros' }"
            :to="{
              name: 'ShopCharges',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> payment </span>
            Configuración
          </router-link>
        </div>
      </vs-sidebar-group>
      <vs-sidebar-group
        v-if="
          user.userprofile.role === roles.ADMIN ||
          user.userprofile.role === roles.MANAGER ||
          user.userprofile.role === roles.SELLER
        "
        title="Servicios"
        :open="false"
      >
        <div @click="selectOption('Pago de Servicios y Recargas')">
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'Pago de Servicios y Recargas',
            }"
            :to="{
              name: 'servicePay',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> point_of_sale </span>
            Pago de Servicios y Recargas
          </router-link>
        </div>
        <div @click="selectOption('Historial de transacciones')">
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'Historial de transaccione',
            }"
            :to="{
              name: 'History',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> history </span>
            Historial de transacciones
          </router-link>
        </div>
        <div @click="selectOption('Notificar Pago')">
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'Notificar Pago',
            }"
            :to="{
              name: 'Notify',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> receipt </span>
            Agregar Saldo
          </router-link>
        </div>
        <div @click="selectOption('Historial de Notificaciones')">
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'Historial de Notificaciones',
            }"
            :to="{
              name: 'NotifyHistory',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> receipt_long </span>
            Historial de transacciones de saldo
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Productos -->
      <vs-sidebar-group
        v-if="
          user.userprofile.role === roles.ADMIN ||
          user.userprofile.role === roles.MANAGER ||
          user.userprofile.role === roles.SELLER
        "
        title="Productos"
        :open="false"
      >
        <div @click="selectOption('productos')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'productos' }"
            :to="{
              name: 'productList',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> list </span>
            Lista de productos / servicios
          </router-link>
        </div>
        <div @click="selectOption('producto nuevo')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'producto nuevo' }"
            :to="{
              name: 'newProduct',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> person_add </span>
            Agregar producto / servicio
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Envíos -->
      <vs-sidebar-group
        v-if="
          shop.packages.hasSalesModule &&
          (user.userprofile.role === roles.ADMIN ||
            user.userprofile.role === roles.MANAGER)
        "
        title="Envíos"
        :open="false"
      >
        <div @click="selectOption('catalogo envios')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'catalogo envios' }"
            :to="{
              name: 'shippingCatalog',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> library_books </span>
            Catálogo
          </router-link>
        </div>
        <div @click="selectOption('paquetes')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'paquetes' }"
            :to="{
              name: 'Packaging',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> takeout_dining </span>
            Paquetes
          </router-link>
        </div>
        <div @click="selectOption('envios')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'envios' }"
            :to="{
              name: 'shippingRules',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> local_shipping </span>
            Reglas de envíos
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Mi Tienda -->
      <vs-sidebar-group
        v-if="
          user.userprofile.role === roles.ADMIN ||
          user.userprofile.role === roles.MANAGER
        "
        title="Mi Tienda"
        :open="false"
      >
        <!-- Catálogos -->
        <div @click="selectOption('catalogo')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'catalogo' }"
            :to="{
              name: 'catalogs',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> library_books </span>
            Catálogos
          </router-link>
        </div>
        <!-- Categorias -->
        <div @click="selectOption('Categorias')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Categorias' }"
            :to="{
              name: 'listCategories',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> category </span>
            Categorías
          </router-link>
        </div>
        <!-- Facturación -->
        <div
          v-if="
            shop.packages.hasSalesModule &&
            (user.userprofile.role === roles.ADMIN ||
              user.userprofile.role === roles.MANAGER)
          "
          @click="selectOption('Facturacion')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Facturacion' }"
            :to="{
              name: 'ShopBillings',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> receipt_long </span>
            Facturación
          </router-link>
        </div>
        <!-- Imagenes -->
        <div @click="selectOption('Logos')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Logos' }"
            :to="{
              name: 'shopImages',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> collections </span>
            Logos / Banners
          </router-link>
        </div>
        <!-- Galería -->
        <div @click="selectOption('Galeria')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Galeria' }"
            :to="{
              name: 'shopGallery',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> amp_stories </span>
            Galería
          </router-link>
        </div>
        <!-- Promociones -->
        <div @click="selectOption('Promociones')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Promociones' }"
            :to="{
              name: 'ShopPromotions',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> announcement </span>
            Promociones
          </router-link>
        </div>
        <!-- Proveedores -->
        <div @click="selectOption('Proveedores')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Proveedores' }"
            :to="{
              name: 'SupplierList',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> groups </span>
            Proveedores / Clientes
          </router-link>
        </div>
        <!-- Redes Sociales -->
        <div @click="selectOption('Redes Sociales')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Redes Sociales' }"
            :to="{
              name: 'shopSocialNetworks',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> public </span>
            Redes Sociales
          </router-link>
        </div>
        <!-- Secciones -->
        <div @click="selectOption('Secciones')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Secciones' }"
            :to="{
              name: 'shopSections',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> article </span>
            Secciones
          </router-link>
        </div>
        <!-- Sucursales -->
        <div @click="selectOption('Sucursales')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Sucursales' }"
            :to="{
              name: 'shopBranch',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> store </span>
            Sucursales
          </router-link>
        </div>
        <!-- Usuarios -->
        <div
          v-if="
            user.userprofile.role === roles.ADMIN ||
            user.userprofile.role === roles.MANAGER
          "
          @click="selectOption('Usuarios')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Usuarios' }"
            :to="{
              name: 'shopStaff',
            }"
          >
            <span class="material-icons mr-1 font-s-1">
              supervised_user_circle
            </span>
            Usuarios
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Newsletter -->
      <vs-sidebar-group
        v-if="
          user.userprofile.role === roles.ADMIN ||
          user.userprofile.role === roles.MANAGER
        "
        title="Newsletter"
        :open="false"
      >
        <!-- Newsletter -->
        <div @click="selectOption('Newsletter')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Newsletter' }"
            :to="{
              name: 'NewsletterClient',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> email </span>
            Suscripciones
          </router-link>
        </div>
        <!-- Configuracion de Newsletter-->
        <div @click="selectOption('NewsletterConfig')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'NewsletterConfig' }"
            :to="{
              name: 'NewsletterConfiguration',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> settings </span>
            Configuración de Newsletter
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Grupo de opciones de configuración de la tienda -->
      <vs-sidebar-group
        v-if="
          user.userprofile.role === roles.ADMIN ||
          user.userprofile.role === roles.MANAGER
        "
        title="Configuración"
        :open="false"
      >
        <!-- Mi Tienda -->
        <div @click="selectOption('Configuracion')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Configuracion' }"
            :to="{
              name: 'shopGeneralSettings',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> settings </span>
            Configuración general
          </router-link>
        </div>

        <div @click="selectOption('Configuración de productos')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Configuración de productos' }"
            :to="{
              name: 'shopProductsSettings',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> category </span>
            Configuración de productos
          </router-link>
        </div>

        <!-- Configuración del dominio -->
        <div @click="selectOption('dominio')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'dominio' }"
            :to="{
              name: 'shopDomain',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> public </span>
            Configuración del dominio
          </router-link>
        </div>

        <!-- Configuración de emails -->
        <div @click="selectOption('emails')">
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'emails' }"
            :to="{
              name: 'shopEmails',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> email </span>
            Configuración de emails
          </router-link>
        </div>
      </vs-sidebar-group>

      <!-- Configuración Global de CohuaShop -->
      <vs-sidebar-group
        v-if="user.userprofile.role === roles.ADMIN"
        title="Sistema"
        :open="false"
      >
        <!-- Nueva Tienda -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Nueva Tienda')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Nueva Tienda' }"
            :to="{
              name: 'newShop',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> add_box </span>
            Nueva Tienda
          </router-link>
        </div>

        <!-- Administración de tiendas -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Administración de tiendas')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Administración de tiendas' }"
            :to="{
              name: 'shopList',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> view_list </span>
            Administración de tiendas
          </router-link>
        </div>

        <!-- Administración de comissiones globales -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Administración de comisiones globales')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route':
                select === 'Administración de comisiones globales',
            }"
            :to="{
              name: 'globalCommissions',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> attach_money </span>
            Comisiones Globales
          </router-link>
        </div>

        <!-- Aviso de Privacidad -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Aviso de Privacidad')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'Aviso de Privacidad',
            }"
            :to="{
              name: 'PrivacyNoticeView',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> article </span>
            Aviso de Privacidad
          </router-link>
        </div>

        <!-- Analytics Admin -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Analytics')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{
              'active-route': select === 'Analytics',
            }"
            :to="{
              name: 'Analytics',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> analytics </span>
            Analytics
          </router-link>
        </div>

        <!-- Catálogos admin -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Catalogo admin')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Catalogo admin' }"
            :to="{
              name: 'catalogsAdmin',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> library_books </span>
            Catálogo administradores
          </router-link>
        </div>
        <!-- Catálogos admin -->
        <div
          v-if="user.userprofile.role === roles.ADMIN"
          @click="selectOption('Catalogo admin')"
        >
          <router-link
            class="side-bar-router mb-1"
            :class="{ 'active-route': select === 'Notificaciones' }"
            :to="{
              name: 'Notifications',
            }"
          >
            <span class="material-icons mr-1 font-s-1"> notifications </span>
            Notificaciones
          </router-link>
        </div>
      </vs-sidebar-group>
      <!-- Footer -->
      <div slot="footer" class="footer-sidebar">
        <vs-button icon="reply" color="danger" type="flat" @click="_logout">
          Cerrar Sesión
        </vs-button>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import { eventBus } from '@/plugins/event-bus'
import utils from '@/utils/utils'

export default {
  name: 'MainSideBar',
  data: function () {
    return {
      active: false,
      select: '',
      roles: utils.roles,
    }
  },
  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
    ...mapState('shop', {
      shop: 'shop',
    }),
    ...mapGetters('auth', {
      isManagerOrAdmin: 'isManagerOrAdmin',
    }),
  },
  created() {
    eventBus.$on('showSideBar', this.showSideBar)
  },
  methods: {
    ...mapActions('auth', { logout: 'logout' }),
    showSideBar() {
      this.active = true
    },
    selectOption(txt) {
      this.active = false
      this.select = txt
    },
    getDefaultIndex() {
      if (this.isManagerOrAdmin) {
        return '3.1'
      }
      return '1.3'
    },
    _logout() {
      let self = this
      this.hideSideBar()
      setTimeout(function () {
        self.logout()
        self.$router.push({ name: 'authLogin' })
      }, 300)
    },
    hideSideBar() {
      this.active = false
    },
  },
}
</script>

<style scoped lang="scss">
.side-bar-router {
  padding: 10px;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  display: block;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: inherit;
  opacity: 0.8;
  font-size: 0.85rem;
  text-decoration: none;
  &:hover {
    color: rgba(var(--vs-primary), 1) !important;
    opacity: 1 !important;
  }
}

.active-route {
  color: rgba(var(--vs-primary), 1) !important;
  opacity: 1 !important;
  font-weight: bold;
}

.long-text {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .header-desc {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > button {
      margin-left: 10px;
    }
  }
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}
.font-s-1 {
  font-size: 1rem;
}
</style>
