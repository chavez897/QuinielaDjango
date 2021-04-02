import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faYoutube,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faFacebook,
  faGlobe,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faYoutube,
  faPinterest,
  faUserCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
