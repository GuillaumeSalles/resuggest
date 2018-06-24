declare module "bs-platform/lib/js/caml_obj" {
  export function caml_equal(a: any, b: any): boolean;
}

declare module "bs-platform/lib/js/array.js" {
  export function of_list(list: any): any[];
}
