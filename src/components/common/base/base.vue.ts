import {Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';


export abstract class BaseVue extends Vue {
  $toasted: any;
  // @ts-ignore
  $refs: {
    validator: InstanceType<typeof ValidationObserver>;
  } & any;
}
