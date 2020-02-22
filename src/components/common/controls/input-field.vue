<template>
  <ValidationProvider :name="id"
                      :rules="rules"
                      v-slot="{ errors }">
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
        <label v-if="!errors || !errors[0]"
               class="tyr-input-field-label"
               :class="{focus: isFocused || value_}"
               :for="id">
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
        <div v-if="errors && errors[0]" class="error-popup">
          <span class="errors">{{ errors[0] }}</span>
          <span class="arrow-down"></span>
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
  export default class InputField extends Vue implements ComponentOptions<InputField> {
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
      this.label_ = this.label;
      this.info_ = this.info;
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

</style>
