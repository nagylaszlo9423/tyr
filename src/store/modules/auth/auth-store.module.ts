import {ActionContext, Module} from 'vuex';
import {environment} from '@/environment/environment';
import {ProfileInfoResponse, TokenResponse} from 'tyr-api/types/axios';
import {RootState} from '@/store/root-state';
import {authService} from '@/services/auth.service';
import {BaseStoreModule} from '@/store/base-store.module';
import {UserModel} from '@/models/user.model';
import {userService} from '@/services/generated-services';
import {SocialLoginData} from '@/components/auth/social-login-data';

export class AuthStoreState {
  code = '';
  tokens: TokenResponse | null = <any>{};
  user: UserModel = new UserModel();
}

export const authStoreModule: Module<AuthStoreState, RootState> = new BaseStoreModule({
  namespaced: true,
  state: new AuthStoreState(),
  getters: {
    tokens: (state: AuthStoreState) => state.tokens,
    code: (state: AuthStoreState) => state.code,
  },
  mutations: {
    setTokens(state: AuthStoreState, tokens: TokenResponse) {
      state.tokens = tokens;
    },
    setCode(state: AuthStoreState, code: string) {
      state.code = code;
    },
    setProfileInfo(state: AuthStoreState, profileInfo: ProfileInfoResponse) {
      state.user = new UserModel({
        id: profileInfo.id,
        email: profileInfo.email
      });
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
      const profileInfo = await userService.getProfileInfo();
      store.commit('setProfileInfo', profileInfo.data);
    },
    async socialLogin(store: ActionContext<AuthStoreState, RootState>, data: SocialLoginData) {
      store.commit('setCode', data.code);

      let tokenResponse;
      switch (data.provider) {
        case 'google':
          tokenResponse = await authService.exchangeCode(data.code, environment.google.redirect_uri, environment.google.client_id);
          break;
        case 'facebook':
          tokenResponse = await authService.exchangeCode(data.code, environment.facebook.redirect_uri, environment.facebook.client_id);
          break;
      }

      if (tokenResponse) {
        store.commit('setTokens', tokenResponse);
        const profileInfo = await userService.getProfileInfo();
        store.commit('setProfileInfo', profileInfo.data);
      } else {
        throw new Error('errors.SOCIAL_LOGIN_FAILED');
      }
    },
    async refreshToken(store: ActionContext<AuthStoreState, RootState>) {
      if (!store.state.tokens) {
        throw new Error('errors.UNAUTHORIZED');
      }
      const tokens = await authService.refreshTokens(store.state.tokens.refreshToken);
      store.commit('setTokens', tokens);
    }
  }
});
