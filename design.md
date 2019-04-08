## About state
In this version, state is supported inside `Elementary` components. Because the DOM updates are done naively (i.e. the entire tree below the updating component is re-rendered), component instances are lost and new ones created on each update. Normally, this would mean losing the existing state as well. However, `Elementary` components store their state in a persistent "store." When a new component instance is created, the previous state is re-in... _stated_ (see what I did there?). To prevent this from devolving into global mutability madness, the state store is namespaced. Each `Elementary` component must be given a unique ID and that ID is used to access the store. Thus, each logical component instance in the tree has its own isolated namespace to store its state and other component instances cannot access it. The ID must be provided by the user so that it exists in the "render chain" allowing it to remain constant through re-renders, even while the component instances themselves are abandoned and re-instantiated.

> TODO: As an improvement to the below limitation, the state store could detect duplicate uses of an ID, and give an error message.

At this time, the onus is on the user to ensure that every ID used is unique. If an ID is used more than once, the components that share the ID will also share the state store, potentially leading to unexpected state behavior.

## Dealing with classes
Two possible approaches:
* Use some preprocessing to auto-generate factory functions for each class-based component.
  * Would have to rename the class names, or something...
* Use functions as constructors to define components instead of class syntax.
