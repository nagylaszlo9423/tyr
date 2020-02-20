<template>
  <ValidationProvider :name="id"
                      :rules="rules"
                      v-slot="{ errors }">
    <div class="tyr-textarea-field form-group">
      <div class="input-group">
        <textarea :id="id"
                  :name="id"
                  ref="textareaField"
                  :type="type"
                  :value="value_"
                  @input="updateValue"
                  @focus="isFocused = true"
                  @blur="isFocused=false"></textarea>
        <label v-if="!errors || !errors[0]"
               class="tyr-textarea-field-label"
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

  @Component({
    name: 'textarea-field',
    components: {
      ValidationProvider
    }
  })
  export default class TextareaField extends Vue implements ComponentOptions<TextareaField> {
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
      textareaField: HTMLInputElement
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
      this.value_ = this.$refs.textareaField.value;
      this.$emit('input', this.$refs.textareaField.value);
    }
  }
</script>

<style lang="scss" scoped>

</style>
