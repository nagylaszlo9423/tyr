<template>
  <div id="navigation-drawer" class="d-flex" :class="{'navigation-drawer-open': isOpen}">
    <v-touch class="swipe-zone" @swiperight="isOpen = true" @swipeleft="isOpen = false"
             :class="{'navigation-drawer-open': isOpen}">
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item t-fade" :class="{'t-fade-away': !isOpen && item.hidden}">
            <router-link :to="item.to" v-on:click.native="setActive(item.name)"
                         :class="{active: isActive(item.name)}"
                         class="d-flex flex-row align-items-center nav-link">
              <font-awesome-icon class="fa-1x" fixed-width :icon="item.icon"/>
              <div class="nav-link-text ml-2" :class="{'nav-link-text-open': isOpen}">
                <span>{{$t(item.title)}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item t-fade" :class="{'t-fade-away': !isOpen}">
            <router-link :to="{name: 'settings'}" v-on:click.native="setActive('settings')"
                         :class="{active: isActive('settings')}"
                         class="d-flex flex-row align-items-center nav-link">
              <div class="fa-icon">
                <font-awesome-icon class="fa-1x" fixed-width icon="cog"></font-awesome-icon>
              </div>
              <div class="nav-link-text ml-2" :class="{'nav-link-text-open': isOpen}">
                <span>{{ $t('SETTINGS') }}</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item t-fade" :class="{'t-fade-away': !isOpen}">
            <a @click="logout" class="d-flex flex-row align-items-center nav-link">
              <div class="fa-icon">
                <font-awesome-icon class="fa-1x" fixed-width icon="sign-out-alt"></font-awesome-icon>
              </div>
              <div class="nav-link-text ml-2" :class="{'nav-link-text-open': isOpen}">
                <span>{{ $t('LOGOUT') }}</span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </v-touch>
    <v-touch :class="{'swipe-zone-open': !isOpen}" @swiperight="isOpen = true">
    </v-touch>
    <div id="navigation-drawer-underlay" :class="{'navigation-drawer-underlay-visible': isOpen}"
         @click="isOpen = !isOpen">
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import {eventBus} from '../../services/EventBus';
  import TitleBar from './TitleBar.vue';
  import {authService} from '../../services/AuthService';
  import {BaseComponent} from './BaseComponent';
  import {ComponentOptions} from 'vue';

  interface NavBarItem {
    name: string;
    title: string;
    icon: string;
    to: string;
    hidden: boolean;
  }

  @Component
  export default class NavigationDrawer extends BaseComponent implements ComponentOptions<NavigationDrawer> {
    isOpen = false;
    items: NavBarItem[] = [
      {
        name: 'search',
        title: 'ADVANCED_SEARCH',
        icon: 'search',
        to: '/pages/search',
        hidden: false
      },
      {
        name: 'map',
        title: 'MAP',
        icon: 'map-marked',
        to: '/pages/map',
        hidden: false
      },
      {
        name: 'routes',
        title: 'ROUTES',
        icon: 'route',
        to: '/pages/routes',
        hidden: true
      },
      {
        name: 'groups',
        title: 'GROUPS',
        icon: 'users',
        to: '/pages/groups',
        hidden: true
      },
      {
        name: 'profile',
        title: 'PROFILE',
        icon: 'user-alt',
        to: '/pages/profile',
        hidden: true
      }
    ];
    activeItem = 'map';

    created() {
      eventBus.$off(TitleBar.events.toggle);
      eventBus.$on(TitleBar.events.toggle, this.toggleHandler);
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

    logout() {
      authService.logout();
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../style/media";

  $transition-time: .5s;

  #navigation-drawer {
    height: 100%;
    width: 3rem;
    position: relative;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: width $transition-time ease-in-out;

    .navbar.navbar-brand {
      margin: .6rem;
      padding: 0;
      text-align: center;
      overflow-x: hidden;

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
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #navigation-drawer-underlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      z-index: -1000;
      background-color: #00000022;
      visibility: hidden;
    }

    &.navigation-drawer-open, .swipe-zone.navigation-drawer-open {
      width: 11em;
    }
  }

  @include media-md {
    #navigation-drawer {
      position: absolute;
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
      visibility: visible !important;
    }
  }
</style>
