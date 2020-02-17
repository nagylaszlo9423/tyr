import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

library.add(fas);
library.add(fab);


Vue.component('font-awesome-icon', FontAwesomeIcon);
