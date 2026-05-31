class MMKV {
  constructor() { this.store = new Map(); }
  set(key, value) { this.store.set(String(key), value); }
  getString(key) { const v = this.store.get(String(key)); return v == null ? undefined : String(v); }
  getNumber(key) { const v = this.store.get(String(key)); return typeof v === 'number' ? v : v == null ? undefined : Number(v); }
  getBoolean(key) { const v = this.store.get(String(key)); return typeof v === 'boolean' ? v : v == null ? undefined : Boolean(v); }
  contains(key) { return this.store.has(String(key)); }
  delete(key) { this.store.delete(String(key)); }
  clearAll() { this.store.clear(); }
  getAllKeys() { return Array.from(this.store.keys()); }
  addOnValueChangedListener() { return { remove() {} }; }
}
module.exports = { MMKV };
