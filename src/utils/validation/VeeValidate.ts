import * as rules from 'vee-validate/dist/rules';
import {extend, configure} from 'vee-validate';
import i18n from '../../i18n/I18n';
import {ValidationMessageGenerator} from 'vee-validate/dist/types/types';

for (let rule in rules) {
  extend(rule, (rules as any)[rule]);
}

configure({
  defaultMessage: ((field: string, values: Record<string, any>) => {
    const params = [i18n.t(`validation.names.${field}`)];
    if (values) {
      if (values.length !== undefined) {
        params.push(values.length);
      }
      return i18n.t(`validation.messages.${values._rule_}`, params);
    }
    return values;
  }) as ValidationMessageGenerator,
  mode: 'lazy'
});
