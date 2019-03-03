import {
  SSR_COMMON_PAGE,
  SSR_POST_PAGE,
  SSR_POST_LIST_PAGE,
} from '../types/ssr';

export const ssrCommonPage = () => ({
  type: SSR_COMMON_PAGE,
});

export const ssrPostPage = () => ({
  type: SSR_POST_PAGE,
});


export const ssrPostListPage = () => ({
  type: SSR_POST_LIST_PAGE,
});
