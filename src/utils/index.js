export const noop = () => {};

const componentReducer = (ConnectedComponent, hoc) => hoc(ConnectedComponent);

export const connectComponent = (Component, hocArray = []) => {
  const ConnectedComponent = hocArray.reduce(componentReducer, Component);
  return ConnectedComponent;
};
