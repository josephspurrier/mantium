interface Obj {
    property1: string;
  }
  
  function Monkey(parent: HTMLElement, text: string): void {
    //parent.innerHTML = text;
    console.log('Monkey:', text);
  }
  
  const tag = (
    type: string,
  ): ((b: TemplateStringsArray, ...vals: any[]) => Obj) => (Obj) => {
    // both `html` and `svg` tags have their own cache
    //const keyed = umap(new WeakMap());
    // keyed operations always re-use the same cache and unroll
    // the template and its interpolations right away
    // const fixed = (cache) => (template, ...values) =>
    //   unroll(cache, { type, template, values });
    //return Object.defineProperties({}, {});
    console.log('Called type:', type);
    //console.log('b:', b);
    //console.log('vals:', vals);
    return Object.defineProperties(() => Monkey, {
      property1: {
        value: 42,
        writable: true,
      },
      property2: {},
    }) as Obj;
    // // non keyed operations are recognized as instance of Hole
    // // during the "unroll", recursively resolved and updated
    // (template, ...values) => new Hole(type, template, values),
    // {
    //   // for: {
    //   //   // keyed operations need a reference object, usually the parent node
    //   //   // which is showing keyed results, and optionally a unique id per each
    //   //   // related node, handy with JSON results and mutable list of objects
    //   //   // that usually carry a unique identifier
    //   //   value(ref, id) {
    //   //     const memo = keyed.get(ref) || keyed.set(ref, create(null));
    //   //     return memo[id] || (memo[id] = fixed(createCache()));
    //   //   },
    //   },
    //   node: {
    //     // it is possible to create one-off content out of the box via node tag
    //     // this might return the single created node, or a fragment with all
    //     // nodes present at the root level and, of course, their child nodes
    //     value: (template, ...values) =>
    //       unroll(createCache(), { type, template, values }).valueOf(),
    //   },
    // },
  };
  
  const html = tag('html');
  
  const count = 0;
  
  //console.log()
  
  function render(parent: HTMLElement, s: Obj): HTMLElement {
    //s.property1
    //console.log('Render:', s.property1, s()('ok','ok');
    //parent.appendChild(s());
  
    console.log('Render:', s();
  
    return parent;
  }
  
  render(root, html`Clicks: ${count}`);
  
  // const buttonState = {disabled: false, text: 'Click Me'};
  // const {disabled, text} = buttonState;
  // const {log} = console;
  
  // render(document.body, html`
  //   <button class="clickable"
  //     onclick=${() => log('clicked')}
  //     .disabled=${disabled}
  //   >
  //     ${text}
  //   </button>
  // `);