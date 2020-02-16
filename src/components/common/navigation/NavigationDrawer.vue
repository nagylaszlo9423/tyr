<template>
  <div id="navigation-drawer" class="d-flex" :class="{'navigation-drawer-open': isOpen}">
    <v-touch class="swipe-zone" @swiperight="isOpen = true" @swipeleft="isOpen = false"
             :class="{'navigation-drawer-open': isOpen}">
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item t-fade" :class="{'t-fade-away': !isOpen && item.hidden}">
            <router-link :to="item.to" v-on:click.native="setActive(item.name)"
                         :class="{active: isActive(item.name)}"
                         class="d-flex nav-link">
              <font-awesome-icon class="fa-1x" fixed-width :icon="item.icon"/>
              <div class="nav-link-text pl-1" :class="{'nav-link-text-open': isOpen}">
                <span>{{$t(item.title)}}</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item t-fade">
            <a @click="logout"
               class="d-flex nav-link"
               :class="{active: isActive('logout')}">
              <font-awesome-icon class="fa-1x" fixed-width icon="sign-out-alt"></font-awesome-icon>
              <div class="nav-link-text pl-1" :class="{'nav-link-text-open': isOpen}">
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
  import {Component} from 'vue-property-decorator';
  import {eventBus} from '@/services/EventBus';
  import {authService} from '@/services/AuthService';
  import {BaseComponent} from '../BaseComponent';
  import {ComponentOptions} from 'vue';
  import {Events} from '@/components/Events';
  import {NavBarItems} from '@/components/common/navigation/NavBarItems';
  import {NavBarItem} from '@/components/common/navigation/NavBarItem';

  @Component
  export default class NavigationDrawer extends BaseComponent implements ComponentOptions<NavigationDrawer> {
    isOpen = false;
    items: NavBarItem[] = NavBarItems;
    activeItem = 'map';

    created() {
      eventBus.$off(Events.common.titleBar.toggle);
      eventBus.$on(Events.common.titleBar.toggle, this.toggleHandler);
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
  @import "../../../style/media";
  @import "../../../style/variables";

  $transition-time: .5s;

  #navigation-drawer {
    transition: width $transition-time ease-in-out;
    width: $navigationDrawerWidth;
    float: left;
    position: relative;
    z-index: 1000;
    top: 0;
    left: 0;

    .navbar.navbar-brand {
      margin: .6rem;
      padding: 0;
      text-align: right;

      .nav-item {
        overflow: hidden;
      }

      svg {
        display: block;
        margin: auto;
      }

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

    .t-fade {
      transition: max-height .3s ease-in-out;
      max-height: 3rem;

      &.t-fade-away {
        max-height: 0;
      }
    }

    .swipe-zone {
      width: 3rem;
      overflow-x: hidden;
      background: #FFFFFFCC;
      transition: width $transition-time ease-in-out;
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

  .chevron {
    transition: .3s;

    &.chevron-open {
      transform: rotateZ(180deg);
    }
  }

  @include media-md {
    #navigation-drawer {
      position: absolute;
      top: $titleBarHeight;

      .navigation-drawer-underlay-visible {
        visibility: visible !important;
      }
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
  }
</style>
