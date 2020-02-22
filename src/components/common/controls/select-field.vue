<template>
  <ValidationProvider :name="id"
                      :rules="rules"
                      v-slot="{ errors }">
    <div class="tyr-select-field form-group">
      <div class="select-group">
        <select :id="id"
                :name="id"
                ref="selectField"
                :value="value_"
                @input="updateValue"
                @focus="isFocused = true"
                @blur="isFocused=false">
          <option v-for="(option, idx) in options" :key="idx" :value="option">{{$t(option)}}</option>
        </select>
        <label v-if="!errors || !errors[0]"
               class="tyr-select-field-label"
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

  @Component({
    name: 'select-field',
    components: {ValidationProvider}
  })
  export default class SelectField extends Vue {
    @Prop({required: true}) id: string;
    @Prop({required: true}) options: string[];
    @Prop({default: ''}) translationPrefix: string;
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
      selectField: HTMLSelectElement
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
      this.value_ = this.$refs.selectField.value;
      this.$emit('input', this.$refs.selectField.value);
    }
  }
</script>

<style lang="scss" scoped>

</style>
