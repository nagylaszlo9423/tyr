<template>
  <div id="navigation-drawer" class="d-flex" :class="{'navigation-drawer-open': isOpen}">
    <v-touch class="swipe-zone" @swiperight="isOpen = true" @swipeleft="isOpen = false" :class="{'navigation-drawer-open': isOpen}">
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item">
            <router-link :to="item.to" v-on:click.native="setActive(item.name)"
                         :class="{'nav-link': true, active: isActive(item.name)}"
                         class="d-flex flex-row align-items-center">
              <font-awesome-icon class="fa-1x" :icon="item.icon"/>
              <div class="nav-link-text ml-2" :class="{'nav-link-text-open': isOpen}">
                <span>{{$t(item.title)}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
    </v-touch>
    <v-touch :class="{'swipe-zone-open': !isOpen}" @swiperight="isOpen = true">
    </v-touch>
    <div id="navigation-drawer-underlay" :class="{'navigation-drawer-underlay-visible': isOpen}" @click="isOpen = !isOpen">
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";
  import {EventBus} from '../../services/EventBus';
  import TitleBar from './TitleBar.vue';

  interface NavBarItem {
    name: string;
    title: string;
    icon: string;
    to: string;
  }

  @Component
  export default class NavigationDrawer extends Vue {
    isOpen = false;
    items: NavBarItem[] = [
      {
        name: 'search',
        title: 'ADVANCED_SEARCH',
        icon: 'search',
        to: '/pages/search'
      },
      {
        name: 'map',
        title: 'MAP',
        icon: 'map-marked',
        to: '/pages/map'
      },
      {
        name: 'profile',
        title: 'PROFILE',
        icon: 'user-alt',
        to: '/pages/profile'
      }
    ];
    activeItem = 'map';

    created() {
      EventBus.$off(TitleBar.events.toggle);
      EventBus.$on(TitleBar.events.toggle, this.toggleHandler);
      for (let item of this.items) {
        if (this.$route.path.indexOf(item.to) > -1) {
          this.activeItem = item.name;
        }
      }
    }

    toggleHandler() {
      this.isOpen = !this.isOpen;
    }

    isActive(item: string): boolean {
      return item === this.activeItem;
    }

    setActive(item: string) {
      this.activeItem = item;
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../style/media";

  $transition-time: .5s;

  #navigation-drawer {
    height: 100%;
    width: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100000;
    transition: width $transition-time ease-in-out;

    .navbar.navbar-brand {
      margin: .8rem;
      padding: 0;
      text-align: center;

      .nav-link-text {
        overflow-x: hidden;
        text-align: left;
        width: 0;
        transition: width $transition-time ease-in-out;

        span {
          font-size: .8rem;
        }

        &.nav-link-text-open {
          width: 8rem;
        }
      }
    }

    .swipe-zone {
      width: 3rem;
      overflow-x: hidden;
      background: #FFFFFFCC;
      transition: width .5s ease-in-out;
    }

    #navigation-drawer-underlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1000;
      background-color: #00000022;
      visibility: hidden;
    }

    &.navigation-drawer-open, .swipe-zone.navigation-drawer-open {
      width: 11em;
    }
  }

  @include media-sm {
    #navigation-drawer, .swipe-zone {
      width: 0;
    }

    .swipe-zone {
      nav {
        overflow-x: hidden;
      }
    }

    .swipe-zone-open {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10000;
      height: 100%;
      width: 1rem;
    }

    .navigation-drawer-underlay-visible {
      visibility: visible!important;
    }
  }
</style>
