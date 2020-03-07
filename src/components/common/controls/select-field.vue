<template>
  <div class="tyr-field tyr-select-field form-group" :class="{labeled: label_}">
    <ValidationProvider :name="id"
                        :rules="rules"
                        v-slot="{ errors }">
      <div class="tyr-select-field-group">
        <select :id="id"
                :name="id"
                ref="selectField"
                :class="{block: block}"
                :value="value_"
                @input="updateValue"
                @focus="isFocused = true"
                @blur="isFocused=false"
                :disabled="readonly">
          <option v-for="(option, idx) in options" :key="idx" :value="option">{{ getTranslation(option) }}</option>
        </select>
        <label v-if="label_ && (!errors || !errors[0])"
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
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {ValidationProvider} from 'vee-validate';
  import {trimChar} from '@/utils/utils';

  @Component({
    name: 'select-field',
    components: {ValidationProvider}
  })
  export default class SelectField extends Vue {
    @Prop({required: true}) id: string;
    @Prop({required: true}) options: string[];
    @Prop({default: ''}) translationNamespace: string;
    @Prop() rules: string;
    @Prop() value: string;
    @Prop() label: string;
    @Prop() info: string;
    @Prop({default: 'text'}) type: string;
    @Prop({default: false, type: Boolean}) readonly: boolean;
    @Prop({type: Boolean, default: false}) block: boolean;
    @Prop({default: false, type: Boolean}) firstSelected: boolean;
    label_ = '';
    value_ = '';
    info_ = '';
    isFocused = false;

    $refs: {
      selectField: HTMLSelectElement
    };

    getTranslation(option: string) {
      let prefix = '';
      if (this.translationNamespace) {
        prefix += trimChar(this.translationNamespace, '.') + '.';
      }
      return this.$tc(`${prefix}${option}`);
    }

    created(): void {
      this.label_ = this.label;
      this.info_ = this.info;
      console.log(this.value);
      if (this.value) {
        this.value_ = this.value;
      } else if (this.firstSelected && this.options[0]) {
        this.value_ = this.options[0];
      }
    }

    @Watch('label')
    labelChange(value: string) {
      this.label_ = value;
    }

    @Watch('info')
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
