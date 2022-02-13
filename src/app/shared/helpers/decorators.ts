export function context(dependency: any[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      return method.apply(this, ...dependency);
    };
    return descriptor;
  };
}
