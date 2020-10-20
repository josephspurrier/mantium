// export const shallowEqual = (
//   object1: JSX.ElementAttrs,
//   object2: JSX.ElementAttrs,
// ): boolean => {
//   const keys1 = Object.keys(object1);
//   const keys2 = Object.keys(object2);

//   if (keys1.length !== keys2.length) {
//     return false;
//   }

//   for (const key of keys1) {
//     if (String(object1[key]) !== String(object2[key])) {
//       return false;
//     }
//   }

//   return true;
// };

// function inNodeList(arr: NodeListOf<ChildNode>, node: Node): boolean {
//   let v = false;
//   arr.forEach((item) => {
//     //console.log('test:', item, node, item.isEqualNode(node));
//     if (item.isSameNode(node)) {
//       v = true;
//     }
//   });
//   return v;
// }
