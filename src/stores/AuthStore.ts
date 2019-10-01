import Vuex from 'vuex';
import {TokenResponse} from "../services/dtos/auth/TokenResponse";
import authService from '../services/AuthService';

class State {
  code = '';
  tokens = new TokenResponse();
}

export default new Vuex.Store({
  state: new State(),
  mutations: {
    async refresh(state: State) {
      state.tokens = await authService.refreshTokens(state.tokens);
    }
  }
});
