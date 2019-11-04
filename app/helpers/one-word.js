import { helper } from '@ember/component/helper';

export function oneWord([str,]) {
  return str.replace(/\s+/g, '');
}

export default helper(oneWord);
