import {Module} from 'vuex';
import {TokenResponse} from "../../services/dtos/auth/TokenResponse";
import {authService} from "../../services/AuthService";

class State {
  code = '';
  tokens = new TokenResponse();
}

export default {
  namespaced: true,
  state: new State(),
  mutations: {
    async refresh(state: State) {
      state.tokens = await authService.refreshTokens(state.tokens.refreshToken);
    },
    clear(state: State) {
      state = new State();
    }
  }
} as Module<State, any>;
