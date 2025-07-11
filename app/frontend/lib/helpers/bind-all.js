export default function bindAll(that, ...methods) {
  methods.forEach(method => (that[method] = that[method].bind(that)));
}
