import {getInjectComponentName, getResolveComponents} from "./utils";
import MagicString from "magic-string";
import Debug from "debug";

const debug = Debug("rollup-plugin-di");

interface Options {
  components: Record<string, any>
}

export default function (options: Options) {
  return {
    name: "rollup-plugin-di",
    transform: function (code: string, id: string) {
      const resolveComponents = getResolveComponents(code);
      const s = new MagicString(code)
      let importBlock = '';
      Array.from(resolveComponents).forEach((resolveComponent, index) => {
        const componentCode = resolveComponent[0];
        const start = resolveComponent.index;
        const end = start + componentCode.length;
        const orignalComponentName: string = componentCode.replace(/_resolveComponent\("|"\)/g, '');
        const injectComponentName = getInjectComponentName(index);
        const importComponentPath = options.components[orignalComponentName];
        const importStatement = `import ${injectComponentName} from "${importComponentPath}";`;
        importBlock += importStatement;

        s.overwrite(start, end, injectComponentName)
      })
      s.prepend(importBlock);
      return s.toString();
    },
  };
}
