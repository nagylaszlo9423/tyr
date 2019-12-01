<template>
  <ValidationProvider :rules="rules" v-slot="{ errors }">
    <div class="tyr-input-field form-group">
      <div class="input-group">
        <input :id="id"
               :name="id"
               ref="inputField"
               :type="type"
               :value="value_"
               @input="updateValue"
               @focus="isFocused = true"
               @blur="isFocused=false"/>
        <label v-if="!errors || !errors[0]" :for="id">
          {{ label_ }}
        </label>
        <font-awesome-icon v-if="errors && errors[0]"
                           class="error-icon"
                           icon="exclamation-circle"></font-awesome-icon>
        <transition name="fade">
          <span v-if="info_ && isFocused"
                class="info mx-2 my-1">{{ info_ }}</span>
        </transition>
      </div>
      <transition name="fade">
        <div v-if="errors && errors[0]" class="error-field">
          <span>{{ errors[0] }}</span>
        </div>
      </transition>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {ValidationProvider} from 'vee-validate';
  import {ComponentOptions} from 'vue';
  import {TranslateResult} from 'vue-i18n';

  @Component({
    name: 'input-field',
    components: {
      ValidationProvider
    }
  })
  export default class InputComponent extends Vue implements ComponentOptions<InputComponent> {
    @Prop({required: true}) id: string;
    @Prop() rules: string;
    @Prop() value: string;
    @Prop() label: string;
    @Prop() info: string;
    @Prop({default: 'text'}) type: string;
    label_ = '';
    value_ = '';
    info_ = '';
    isFocused = false;

    $refs: {
      inputField: HTMLInputElement
    };

    created(): void {
      this.label_ = this.$t(this.label) as string;
      this.info_ = this.$t(this.info) as string;
    }

    @Watch('label')
    labelChange(val: string) {
      this.label_ = val;
    }

    @Watch('label')
    infoChange(val: string) {
      this.info_ = val;
    }

    @Watch('value')
    valueChange(val: string) {
      this.value_ = val;
    }

    updateValue() {
      this.value_ = this.$refs.inputField.value;
      this.$emit('input', this.$refs.inputField.value);
    }
  }
</script>

<style lang="scss">
  @import "../../style/variables";

  .tyr-input-field {
    display: block;
    position: relative;
    padding: 1.7rem 0 1rem 0;
    margin: .3rem .6rem;

    input {
      padding: .3rem 2.4rem .3rem .8rem;
      border-radius: 10px;
      border: solid $primary 2px;
      width: 100%;
    }

    label {
      position: absolute;
      top: -2rem;
    }

    .error-icon {
      position: absolute;
      right: 1rem;
      top: .4rem;
      color: red;
    }

    .info {
      position: absolute;
      bottom: -1.2rem;
      font-size: .5rem;
      color: grey;

      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .2s;
      }
      &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
    }

    .error-field {
      position: absolute;
      z-index: 10;
      top: 0;
      left: -.3rem;
      border-radius: 1.4rem;
      padding: .2rem .4rem;
      background-color: $error;
      color: white;
      margin: .1rem 1rem;
      display: flex;
      align-items: center;
      box-shadow: 2px 2px #999999;

      span {
        font-size: .6rem;
      }
    }
  }
</style>
