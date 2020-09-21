import { createVnode } from '@/lib/vnode';

export interface FragmentAttrs {
  children: JSX.Vnode[];
}

export const createFragment = (
  attrs: FragmentAttrs,
): JSX.Vnode[] | string[] => {
  return attrs.children;
};

// Sets the top element to always be a ROOTFRAGMENT. This allows us to support
// fragments at the top level and makes the virtual DOM calculations simpler.
export const cleanState = (vn: JSX.Vnode): JSX.Vnode => {
  let rnode = removeFragments(vn);
  if (rnode.tag === 'FRAGMENT') {
    rnode.tag = 'ROOTFRAGMENT';
  } else {
    rnode = createVnode('ROOTFRAGMENT', {}, rnode);
  }
  return rnode;
};

// Removes any "FRAGMENT" elements from the state to make the DOM comparisons
// easier to perform.
const removeFragments = (vn: JSX.Vnode): JSX.Vnode => {
  const cleanChildren = (vn: JSX.Vnode): (string | JSX.Vnode)[] => {
    const rChildren = [] as (string | JSX.Vnode)[];
    if (!vn.children) {
      vn.children = [];
    }
    vn.children.forEach((element: JSX.Vnode | string) => {
      const vc = element as JSX.Vnode;
      if (vc.tag) {
        if (vc.tag === 'FRAGMENT') {
          rChildren.push(...cleanChildren(vc));
        } else {
          rChildren.push(removeFragments(vc));
        }
      } else {
        rChildren.push(element);
      }
    });

    return rChildren;
  };

  return {
    tag: vn.tag,
    attrs: vn.attrs,
    children: cleanChildren(vn),
  } as JSX.Vnode;
};
