declare module "*.vue" {
  import Vue from "Vue";
  export default Vue;
}

declare module "*.json" {
  const value: any;
  export default value;
}
