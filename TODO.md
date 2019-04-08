# Framework Todos
- [x] [HIGH PRIORITY] State updates are broken: Need to change them so that Component objects are not reinstantiated whenever they are re-rendered.
  * Simple solution? -> Just keep a list of Component objects and call render() on those?
- [ ] Implement smarter updating: Only replace nodes that have changed.
  * Simple solution: When the component is first attached (via `attach()`), store mapping of all sub-components that are dependent on the state. Then, in `changeState()`, only replace those sub-components.
- [ ] During view updates, prevent unnecessary reflows/re-renders caused by multiple sequential calls to `appendChild()`. Instead, a `DocumentFragment` could be used to build the subtree inside of it, then attach that entire subtree to the existing DOM in one go. See [here](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) for more details on the `DocumentFragment`.
  * Since view updates are managed only in the `Elementary` class, this could all be implemented in that class.
- [ ] Recursively merge state changes. This may not actually be a good idea. React does a shallow merge anyway...
- [ ] Short-circuit state updates if no state has actually changed.
- [x] Router (for GitHub Pages)
- [x] Watch for file changes and auto-refresh page (dev server).
- [x] Create grid layout components.
- [x] Implement a CSS theme framework.
- [ ] Implement a common transition-able component.
  * Would be great to include a callback that is called after the element is rendered to the screen (for slide-in animations, for example).
  * One possibility is to provide an API like this:
    ```
    Box({
      text: "I'm animated",
      transitions: {
        mouseover: {
          transitionDuration: '1s',
          transitionProperty: 'transform',
          transform: 'scale(2)',
        },
        mouseout: {
          transitionDuration: '1s',
          transitionProperty: 'transform',
          transform: 'scale(1)'
        },
        click: {
          transitionDuration: '0.5s',
          transitionProperty: 'background-color',
          backgroundColor: 'black',
        },
      }
    }),
    ```


  - [ ] If props are required, but not supplied, provide a useful error message.
  - [ ] Check for duplicate IDs in the store. Produce error message if a duplicate ID is used.
    - Can be implemented by setting a flag at the beginning of every update, recording all IDs used during that update, and producing the error when a duplicate ID is used.
  - [ ] Package the library for easy re-use in other projects.
  - [ ] Provide better error message for Stateful Elementary Class component instantiation.
    * Right now, if no args are passed in when using a component, we get this error message:
    ```
    Uncaught TypeError: Cannot read property 'id' of undefined
    ```
    which is not very informative.
  - [ ] Expose a function to allow creation of HTML elements with programmatically generated tag names. See `cake.Heading`. I don't really want to expose the `compose` function to users directly.
  - [x] Verify if themes can be overriden by child components. If not, we need to allow this.
  - [ ] Build mechanism to inject default theme into the very root (top) component. This way, components can rely on certain things to be available in the theme (such as colors).
  - [x] Add ability to use `theme.spacing` as a scalar. For example be able to say: `paddingRight: props.theme.spacing * 2`.
    * Could maybe implement this via a method on the `theme.spacing` object. Example usage would be `props.theme.spacing.scale(2)`. Would probably need to create a `BaseTheme` or `ThemeBuilder` class to implement this.
  - [ ] Make `p`, `div`, etc. elements automatically inherit from the theme. For example, it would be nice if all `p` elements' `color` style was set to theme.colors.primary by default.
