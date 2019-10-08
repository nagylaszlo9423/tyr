import {ActionContext, Module} from 'vuex';
import {TokenResponse} from "../../services/dtos/auth/TokenResponse";
import {authService} from "../../services/AuthService";
import environment from '../../environment/environment';

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
    setTokens(state: State, tokens: TokenResponse) {
      state.tokens = tokens;
    },
    setCode(state: State, code: string) {
      state.code = code;
    },
    clear(state: State) {
      state = new State();
    }
  },
  actions: {
    async login(store: ActionContext<State, any>, request: {email: string, password: string}) {
      const loginResponse = await authService.login(request);
      store.commit('setCode', loginResponse.code);
      const tokenResponse = await authService.exchangeCode(loginResponse.code, loginResponse.redirectUri, environment.client_id);
      store.commit('setTokens', tokenResponse);
    },
    async refreshToken(store: ActionContext<State, any>) {
      const tokens = await authService.refreshTokens(store.state.tokens.refreshToken);
      store.commit('setTokens', tokens);
    }
  }
} as Module<State, any>;
