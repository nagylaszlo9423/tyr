<template>
  <div id="navigation-drawer" class="d-flex flex-column" :class="{'navigation-drawer-open': isOpen}">
    <nav class="navbar navbar-brand">
      <ul class="navbar-nav mr-auto">
        <li v-for="item in items" class="nav-item">
          <router-link v-on:click.native="setActive(item.name)" :to="{name: item.to}"
                       :class="{'nav-link': true, active: isActive(item.name)}" class="d-flex flex-row align-items-center">
            <font-awesome-icon class="fa-1x" :icon="item.icon"/>
            <div class="nav-link-text ml-2" :class="{'nav-link-text-open': isOpen}">
              <span>{{$t(item.title)}}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";
  import {EventBus} from '../../services/EventBus';

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
        name: 'map',
        title: 'MAP',
        icon: 'map-marked',
        to: 'map'
      },
      {
        name: 'profile',
        title: 'PROFILE',
        icon: 'user-alt',
        to: 'profile'
      }
    ];
    activeItem = 'map';

    created() {
      EventBus.$on('navigation-drawer:toggle', () => {
        console.log('toggle');
        this.isOpen = !this.isOpen;
      });
    }

    beforeDestroy() {
      EventBus.$off('navigation-drawer:toggle');
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
    position: relative;
    z-index: 100000;
    width: 3rem;
    background: #FFFFFFCC;
    overflow-x: hidden;
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

        &.nav-link-text-open {
          width: 8rem;
        }
      }
    }

     &.navigation-drawer-open {
      width: 10rem;
    }
  }

  @media only screen and (max-width: 600px) {
    #navigation-drawer {
      width: 0;
    }
  }
</style>
