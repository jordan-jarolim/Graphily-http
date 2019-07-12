import Tab from '@material-ui/core/Tab';
import Router from 'next/router';

const LinkTab = ({ href, ...props }) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        Router.push(href);
      }}
      {...props}
    />
  );
};

export default LinkTab;
