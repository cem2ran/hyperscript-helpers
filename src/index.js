import Proxy from 'harmony-proxy';

const isValidString =
  param =>
    typeof param === 'string' && param.length > 0;

const startsWith =
  (string, start) =>
    string[0] === start;

export const isSelector =
  param =>
    isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));

const node =
  h =>
    tagName =>
      (first, ...rest) => {
        if (isSelector(first)) {
          return h(tagName + first, ...rest);
        } else {
          return h(tagName, first, ...rest);
        }
      };

export const helpers =
  h => new Proxy({ },{
    get(target, name) {
      return node(h)(name);
    }
  });
