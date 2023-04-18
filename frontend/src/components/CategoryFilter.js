import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useDimensions} from './DimensionsProvider';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {CategoryContext} from './CategoryComponent';

/**
 * Styling for Category Filter Drawer
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
  textField: {
    height: 30,
    width: 140,
  },
  listItemText: {
    textAlign: 'center',
  },
}));

/**
 * Category Filter Drawer
 *
 * @return {object} Drawer that contains category selections
 *
 * Resources:
 * https://mui.com/components/drawers/#ResponsiveDrawer.js
 * https://mui.com/components/app-bar/#ButtonAppBar.js
 */
export default function CategoryFilterDrawer() {
  const {openFilter, handleFilterOpen} = React.useContext(CategoryContext);
  const classes = useStyles();
  const {width} = useDimensions();
  const wide = (width > 550 ? true : false);
  if (wide) {
    return (
      <div>
        <Toolbar>
          <Typography className={classes.drawerHeaderText}
            variant='h6' noWrap>
            Filters
          </Typography>
        </Toolbar>
        <Divider />
        <CategoryFilterList />
        <Divider />
      </div>
    );
  } else {
    return (
      <Drawer
        className={classes.drawerMobile}
        variant='persistent'
        anchor='left'
        open={openFilter}
        classes={{
          paper: classes.drawerPaperMobile,
        }}
      >
        <Toolbar className={classes.drawerHeader}>
          <Typography className={classes.drawerHeaderText}
            variant='h6' noWrap>
            Filters
          </Typography>
          <IconButton
            color='inherit'
            aria-label='toggle drawer'
            onClick={handleFilterOpen}
            edge='end'
            className={clsx(classes.menuButton, openFilter)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <CategoryFilterList />
        <Button variant="contained" onClick={handleFilterOpen}>
          See Listings
        </Button>
      </Drawer>
    );
  }
}

/**
 * Function that gets number of filters of category
 *
 * @param {string} category Category to get number of filters for
 * @param {function} setClickedFilters Function to set number of filters
 *
 */
function getFilterCount(category, setClickedFilters) {
  const user = localStorage.getItem('user');
  const bearerToken = user ? user.accessToken : '';
  if (category) {
    fetch(`/v0/category/${category}`, {
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        const temp = [];
        for (let i = 0; i < json.filter.length; i++) {
          temp.push(false);
        }
        setClickedFilters(temp);
      });
  }
}

/**
 * Function that gets filters of category
 *
 * @param {string} category Category to get filter for
 * @param {function} setFilter Function to set filter for category
 *
 */
function getFilters(category, setFilter) {
  const user = localStorage.getItem('user');
  const bearerToken = user ? user.accessToken : '';
  if (category) {
    fetch(`/v0/category/${category}`, {
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setFilter(json.filter);
      });
  }
}

/**
* Category Filter List component
*
* @return {List} Returns list of category filters
*
* Resources:
* https://mui.com/components/material-icons/
* https://mui.com/components/lists/#NestedList.js
* https://mui.com/components/radio-buttons/#RadioButtonsGroup.js
* https://mui.com/components/text-fields/#BasicTextFields.js
* https://mui.com/components/text-fields/#FormPropsTextFields.js
* https://mui.com/components/checkboxes/#CheckboxLabels.js
* https://stackoverflow.com/questions/62454545/how-to-collapse-only-one-div-when-using-react-and-map
*/
function CategoryFilterList() {
  const classes = useStyles();
  const {category} = React.useContext(CategoryContext);
  const [open, setOpen] = React.useState({});
  const [subRadio, setSubRadio] = React.useState({});
  const [subCheck, setSubCheck] = React.useState({});
  const [clickedFilters, setClickedFilters] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  useEffect(() => {
    getFilterCount(category, setClickedFilters);
    getFilters(category, setFilter);
    return () => {
      setClickedFilters([]);
      setFilter([]);
    };
  }, [category]);
  const handleFilterClick = (index) => {
    clickedFilters[index - 1] = !clickedFilters[index - 1];
    setOpen((prevState) => ({...prevState, [index]: !prevState[index]}));
  };
  const handleSubRadioClick = (index, sIndex) => {
    setSubRadio((prevState) => ({...prevState, [index]: `${sIndex}`}));
  };
  const handleSubCheckClick = (sIndex) => {
    setSubCheck((prevState) => ({...prevState, [sIndex]: !prevState[sIndex]}));
  };
  const renderFilterValues = (filterItem, filterIndex) => {
    switch (filterItem.type) {
    case 'input':
      return (
        <div key={filterIndex}>
          <ListItem>
            <ListItemText primary={filterItem.name}/>
          </ListItem>
          <ListItem>
            <TextField variant="outlined"
              placeholder={'Min'}
              InputProps={{
                className: classes.textField,
              }}
              inputProps={{
                maxLength: 12,
                style: {fontWeight: 'bold'},
              }}/>
            <ListItemText className={classes.listItemText} primary="to" />
            <TextField variant="outlined"
              placeholder={'Max'}
              InputProps={{
                className: classes.textField,
              }}
              inputProps={{
                maxLength: 12,
                style: {fontWeight: 'bold'},
              }}/>
          </ListItem>
        </div>
      );
    case 'radio':
      return (
        <div key={filterIndex}>
          <ListItemButton onClick={() => handleFilterClick(filterIndex)}>
            <ListItemText>
              {filterItem.name}
            </ListItemText>
            {open[filterIndex] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[filterIndex]} timeout="auto" unmountOnExit>
            <List>
              {filterItem.value.map((subItem, subIndex) => (
                <ListItemButton key={`${filterIndex}_${subIndex}`}
                  onClick={()=>handleSubRadioClick(filterIndex, subIndex)}>
                  <ListItemText primary={subItem} />
                  <Radio
                    checked={subRadio[filterIndex] === `${subIndex}` ||
                      false}/>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      );
    case 'checkbox':
      return (
        <div key={filterIndex}>
          <ListItemButton onClick={() => handleFilterClick(filterIndex)}>
            <ListItemText>
              {filterItem.name}
            </ListItemText>
            {open[filterIndex] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[filterIndex]} timeout="auto" unmountOnExit>
            <List>
              {filterItem.value.map((subItem, subIndex) => (
                <ListItemButton key={`${filterIndex}_${subIndex}`}
                  onClick={
                    ()=>handleSubCheckClick(`${filterIndex}_${subIndex}`)}>
                  <ListItemText primary={subItem} />
                  <Checkbox
                    checked={subCheck[`${filterIndex}_${subIndex}`] || false}/>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      );
    default:
      return null;
    }
  };
  if (category) {
    return (
      <List>
        {filter.map((item, index) => (
          <div key={index}>
            {renderFilterValues(item, index)}
          </div>
        ))}
      </List>
    );
  } else {
    return null;
  }
}
