import removeMd from 'remove-markdown';

export const noop = () => {};

const componentReducer = (ConnectedComponent, hoc) => hoc(ConnectedComponent);

export const connectComponent = (Component, hocArray = []) => {
  const ConnectedComponent = hocArray.reduce(componentReducer, Component);
  return ConnectedComponent;
};

export const extractSummary = (markdown) => {
  if (!markdown) return '';

  const replaced = markdown.replace(/\n\n?/g, ' ').replace(/```(.*)```/g, '');
  const plainText = removeMd(replaced);

  const summary = plainText.slice(0, 120);
  return summary.length === 120 ? summary.concat('...') : summary;
};

export const isAuthor = (myInfo, docOrAuthorId) => {
  const document = typeof docOrAuthorId === 'string' ? { author: docOrAuthorId } : docOrAuthorId;

  if (!myInfo || !document) {
    return false;
  }

  return document.author === myInfo._id;
};

export const removeTitle = (profileName) => {
  if (typeof profileName !== 'string') {
    return '';
  }
  if (profileName.endsWith('님')) {
    return profileName.slice(0, -1);
  }
  return profileName;
};
