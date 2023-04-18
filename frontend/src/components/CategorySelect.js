import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useDimensions} from './DimensionsProvider';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {CategoryContext} from './CategoryComponent';

/**
 * Styling for Category Select Drawer
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerMobile: {
    width: '100%',
  },
  drawerPaperMobile: {
    width: '100%',
  },
  drawerHeader: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    textAlign: 'center',
  },
  drawerHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
    flexGrow: 1,
  },
}));

/**
 * Category Select Drawer
 *
 * @return {object} Drawer that contains category selections
 *
 * Resources:
 * https://mui.com/components/drawers/#ResponsiveDrawer.js
 */
export default function CategorySelectDrawer() {
  const {openSelect, handleSelectOpen} = React.useContext(CategoryContext);
  const classes = useStyles();
  const {width} = useDimensions();
  const wide = (width > 550 ? true : false);
  if (wide) {
    return (
      <div>
        <Toolbar>
          <Typography className={classes.drawerHeaderText}
            variant='h6' noWrap>
            Categories
          </Typography>
        </Toolbar>
        <Divider />
        <CategoryList />
        <Divider />
      </div>
    );
  } else {
    return (
      <Drawer
        className={classes.drawerMobile}
        variant='persistent'
        anchor='left'
        open={openSelect}
        classes={{
          paper: classes.drawerPaperMobile,
        }}
      >
        <Toolbar className={classes.drawerHeader}>
          <Typography className={classes.drawerHeaderText}
            variant='h6' noWrap>
            Select Category
          </Typography>
          <IconButton
            color='inherit'
            aria-label='toggle drawer'
            onClick={handleSelectOpen}
            edge='end'
            className={clsx(classes.menuButton, openSelect)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <CategoryList />
      </Drawer>
    );
  }
}

/**
* Category List component
*
* @return {List} Returns list of top level categories
*
* Resources:
* https://mui.com/components/material-icons/
*/
function CategoryList() {
  const {setCategory, setOpenSelect} = React.useContext(CategoryContext);
  useEffect(() => {}, [setCategory, setOpenSelect]);
  const Categories = [
    {avatarIcon: (<DirectionsCarIcon />), label: 'Vehicles'},
    {avatarIcon: (<CheckroomIcon />), label: 'Apparel'},
    {avatarIcon: (<PhoneIphoneIcon />), label: 'Electronics'},
    {avatarIcon: (<SportsEsportsIcon />), label: 'Toys'},
  ];
  return (
    <List>
      {Categories.map((item, index) => (
        <ListItem button key={item.label} id={index}
          onClick={function() {
            setCategory(`${item.label}`);
            setOpenSelect(false);
          }}>
          <ListItemIcon>{item.avatarIcon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
}
