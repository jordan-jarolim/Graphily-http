import links from './linksEnum';

const getActiveTab = (pathname) => {
  return links.findIndex(({ href }) => href === pathname);
};

export default getActiveTab;
