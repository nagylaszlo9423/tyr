import {ActionContext, Module} from 'vuex';
import {authService} from '@/services/AuthService';
import {TokenResponse} from 'tyr-api';
import {Environment} from '@/environment/environment';
import {RootState} from '../RootState';

class State {
  code = '';
  tokens: TokenResponse | null = new TokenResponse();
}

export const authStoreModule: Module<State, RootState> = {
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
    async login(store: ActionContext<State, RootState>, request: {email: string, password: string}) {
      const loginResponse = await authService.login(request);
      store.commit('setCode', loginResponse.code);
      const tokenResponse = await authService.exchangeCode(loginResponse.code, loginResponse.redirectUri, Environment.client_id);
      store.commit('setTokens', tokenResponse);
    },
    async refreshToken(store: ActionContext<State, RootState>) {
      if (!store.state.tokens) {
        throw new Error('errors.UNAUTHORIZED');
      }
      const tokens = await authService.refreshTokens(store.state.tokens.refreshToken);
      store.commit('setTokens', tokens);
    }
  }
};
