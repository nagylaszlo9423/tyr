import {ActionContext, Module} from 'vuex';
import {environment} from '@/environment/environment';
import {TokenResponse} from 'tyr-api/types/axios';
import {RootState} from '@/store/root-state';
import {authService} from '@/services/auth.service';

export class AuthStoreState {
  code = '';
  tokens: TokenResponse | null = <any>{};
}

export const authStoreModule: Module<AuthStoreState, RootState> = {
  namespaced: true,
  state: new AuthStoreState(),
  getters: {
    tokens: (state: AuthStoreState) => state.tokens,
    code: (state: AuthStoreState) => state.code
  },
  mutations: {
    setTokens(state: AuthStoreState, tokens: TokenResponse) {
      state.tokens = tokens;
    },
    setCode(state: AuthStoreState, code: string) {
      state.code = code;
    },
    clear(state: AuthStoreState) {
      state = new AuthStoreState();
    }
  },
  actions: {
    async login(store: ActionContext<AuthStoreState, RootState>, request: {email: string, password: string}) {
      const loginResponse = await authService.login(request);
      store.commit('setCode', loginResponse.code);
      const tokenResponse = await authService.exchangeCode(loginResponse.code, loginResponse.redirectUri, environment.client_id);
      store.commit('setTokens', tokenResponse);
    },
    async refreshToken(store: ActionContext<AuthStoreState, RootState>) {
      if (!store.state.tokens) {
        throw new Error('errors.UNAUTHORIZED');
      }
      const tokens = await authService.refreshTokens(store.state.tokens.refreshToken);
      store.commit('setTokens', tokens);
    }
  }
};