import {ActionContext, Module} from 'vuex';
import {TokenResponse} from "../../services/dtos/auth/TokenResponse";
import {authService} from "../../services/AuthService";

class State {
  code = '';
  tokens = new TokenResponse();
}

export default {
  namespaced: true,
  state: new State(),
  getters: {
    tokens: (state: State) => state.tokens,
    code: (state: State) => state.code
  },
  mutations: {
    async setTokens(state: State, tokens: TokenResponse) {
      state.tokens = tokens;
    },
    clear(state: State) {
      state = new State();
    }
  },
  actions: {
    async refreshToken(store: ActionContext<State, any>) {
      store.commit('auth/setTokens', await authService.refreshTokens(store.state.tokens.refreshToken));
    }
  }
} as Module<State, any>;
