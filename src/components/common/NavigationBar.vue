<template>
  <div id="navigation-bar">
    <div id="navigation-bar-title">
      <h1>Tyr</h1>
    </div>
    <div id="navigation-bar-list">
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item">
            <router-link v-on:click.native="setActive(item.name)" :to="item.to" :class="{'nav-link': true, active: isActive(item.name)}">
              <font-awesome-icon class="fa-1x" :icon="item.icon"/>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="navbar-fill" :class="{'navbar-open': !isActive('map')}">
    </div>
    <div id="navigation-bar-tail">
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";
  import * as $ from "jquery";

  interface NavBarItem {
    name: string;
    icon: string;
    to: string;
  }

  @Component
  export default class NavigationBar extends Vue {

    items: NavBarItem[] = [
      {
        name: 'search',
        icon: 'search-location',
        to: 'search'
      },
      {
        name: 'map',
        icon: 'map-marked',
        to: 'map'
      }
    ];
    activeItem = 'map';

    isActive(item: string): boolean {
      return item === this.activeItem;
    }

    setActive(item: string) {
      this.activeItem = item;
    }
  }

</script>

<style lang="scss" scoped>
  #navigation-bar {
    height: 100vh;
    position: relative;
    z-index: 100000;
    width: 3rem;

    #navigation-bar-title {
      background: #FFFFFFCC;

      > h1 {
        color: transparent;
      }
    }

    #navigation-bar-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background: #FFFFFFCC;

      .navbar {
        margin: 0;
        padding: 0;
        text-align: center;
      }
    }

    #navigation-bar-tail {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 2rem 3rem 0 0;
      border-color: #FFFFFFCC transparent transparent transparent;
      background: transparent;
    }
  }

  .navbar-fill {
    max-height: 0;
  }

  .navbar-open {
    max-height: 4000px;
    transition: max-height 3s ease-in;
    background: #FFFFFFCC;
  }

  @keyframes stretchNavBar {
    0% {
      height: 0;
    }
    100%  {
      height: 100%;
    }
  }
</style>
