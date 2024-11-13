export class Env {
  static get HEADER_KEY() {
    return import.meta.env.VITE_HEADER_KEY;
  }
  static get HEADER_VALUE() {
    return import.meta.env.VITE_HEADER_VALUE;
  }
}

