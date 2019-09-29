<template>
  <div id="navigation-drawer" class="d-flex" :class="{'navigation-drawer-open': isOpen}">
    <v-touch class="swipe-zone-close" @swipeleft="isOpen = false" :class="{'navigation-drawer-open': isOpen}">
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item">
            <router-link v-on:click.native="setActive(item.name)" :to="item.to"
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
    <v-touch class="swipe-zone-open" @swiperight="isOpen = true">
    </v-touch>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";
  import {EventBus, EventVue} from '../../services/EventBus';
  import TitleBar from './TitleBar.vue';
  import {Subscription} from 'rxjs';

  interface NavBarItem {
    name: string;
    title: string;
    icon: string;
    to: string;
  }

  @Component
  export default class NavigationDrawer extends EventVue {
    isOpen = false;
    items: NavBarItem[] = [
      {
        name: 'search',
        title: 'ADVANCED_SEARCH',
        icon: 'search',
        to: '/search'
      },
      {
        name: 'map',
        title: 'MAP',
        icon: 'map-marked',
        to: '/map'
      },
      {
        name: 'profile',
        title: 'PROFILE',
        icon: 'user-alt',
        to: '/profile'
      }
    ];
    activeItem = 'map';

    created() {
      EventBus.$off(TitleBar.events.toggle);
      EventBus.$on(TitleBar.events.toggle, this.toggleHandler);
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
  #navigation-drawer {
    height: 100%;
    width: 3rem;
    position: relative;
    z-index: 100000;
    transition: width 1s ease-in-out;

    .navbar.navbar-brand {
      margin: .8rem;
      padding: 0;
      text-align: center;

      .nav-link-text {
        overflow-x: hidden;
        text-align: left;
        width: 0;
        transition: width 1s ease-in-out;

        span {
          font-size: .8rem;
        }

        &.nav-link-text-open {
          width: 8rem;
        }
      }
    }

    .swipe-zone-close {
      width: 3rem;
      overflow-x: hidden;
      background: #FFFFFFCC;
      transition: width 1s ease-in-out;
    }

    &.navigation-drawer-open, .swipe-zone-close.navigation-drawer-open {
      width: 13em;
    }

    .swipe-zone-open {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10000;
      height: 100%;
      width: 3rem;
    }
  }

  @media only screen and (max-width: 600px) {
    #navigation-drawer, .swipe-zone-close {
      width: 0;

      nav {
        overflow-x: hidden;
      }
    }
  }
</style>
