<template>
  <div id="navigation-bar">
    <div id="navigation-bar-title">
      <h3>Tyr</h3>
    </div>
    <div id="navigation-bar-list">
      <div class="search-field"
           :class="{'search-field-open': searchFieldToggleState === ToggleState.OPEN, 'search-field-close': searchFieldToggleState === ToggleState.CLOSE}">
        <div class="search-field-content">
          <div class="input-group">
            <input id="search-field" name="search-field" placeholder="Search for locations" class="form-control" type="text"/>
          </div>
          <font-awesome-icon class="fa-1x" icon="play"></font-awesome-icon>
        </div>
      </div>
      <div class="search-field-underlay" v-if="searchFieldToggleState === ToggleState.OPEN"
           @click="toggleSearchField">
      </div>
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a @click="toggleSearchField" class="nav-link">
              <font-awesome-icon class="fa-1x" icon="search-location"/>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item">
            <router-link v-on:click.native="setActive(item.name)" :to="item.to"
                         :class="{'nav-link': true, active: isActive(item.name)}">
              <font-awesome-icon class="fa-1x" :icon="item.icon"/>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="navbar-fill" :class="{'navbar-open': isActive('profile'), 'navbar-close': !isActive('profile')}">
    </div>
    <div id="navigation-bar-tail">
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";

  interface NavBarItem {
    name: string;
    icon: string;
    to: string;
  }

  enum ToggleState {
    INIT, OPEN, CLOSE
  }

  @Component
  export default class NavigationBar extends Vue {
    ToggleState = ToggleState;
    searchFieldToggleState: ToggleState = ToggleState.INIT;

    items: NavBarItem[] = [
      {
        name: 'map',
        icon: 'map-marked',
        to: 'map'
      },
      {
        name: 'profile',
        icon: 'user-alt',
        to: 'search'
      }
    ];
    activeItem = 'map';

    isActive(item: string): boolean {
      return item === this.activeItem;
    }

    setActive(item: string) {
      this.activeItem = item;
    }

    toggleSearchField() {
      switch (this.searchFieldToggleState) {
        case ToggleState.INIT:
        case ToggleState.CLOSE:
          this.searchFieldToggleState = ToggleState.OPEN;
          break;
        case ToggleState.OPEN:
          this.searchFieldToggleState = ToggleState.CLOSE;
      }
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
      text-align: center;
    }

    #navigation-bar-list {
      position: relative;
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

  .search-field {
    background: #FFFFFFCC;
    position: absolute;
    z-index: 1000000;
    overflow-x: hidden;
    top: 0;
    left: 3rem;
    width: 0;
    white-space: nowrap;
    border-radius: 0 15px 15px 0;

    .search-field-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: .4rem;
      text-align: left;

      svg {
        margin: .3rem;
      }
    }
  }

  .search-field-underlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
  }

  .search-field-open {
    animation: openSearchField 1s ease-in-out forwards;
  }

  .search-field-close {
    animation: closeSearchField 1s ease-in-out forwards;
  }

  @keyframes openSearchField {
    from {
      width: 0;
    }
    to {
      width: 300px;
    }
  }

  @keyframes closeSearchField {
    from {
      width: 300px;
    }
    to {
      width: 0;
    }
  }

  .navbar-fill {
    background: #FFFFFFCC;
  }

  .navbar-open {
    animation: openNavBar 1500ms ease-in forwards;
  }

  .navbar-close {
    animation: closeNavBar 1500ms ease-out forwards;
  }

  @keyframes openNavBar {
    from {
      height: 0;
    }
    to {
      height: 85%;
    }
  }

  @keyframes closeNavBar {
    from {
      height: 85%;
    }
    to {
      height: 0;
    }
  }
</style>
