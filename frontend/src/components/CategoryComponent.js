import React, {createContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CategorySelectDrawer from './CategorySelect';
import CategoryFilterDrawer from './CategoryFilter';
import DimensionsProvider, {useDimensions} from './DimensionsProvider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Drawer from '@material-ui/core/Drawer';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@material-ui/core/Button';
import DisplayItems from './itemList/ItemsList';
import Appbar from '@material-ui/core/Appbar';
import Grid from '@material-ui/core/Grid';

export const CategoryContext = createContext();

const drawerWidth = 360;
const paperElevation = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  categoryPaper: {
    marginLeft: drawerWidth,
  },
  categoryHeader: {
    fontWeight: 'bold',
  },
  drawerPaper: {
    marginTop: '56px',
    width: drawerWidth,
  },
  drawerHeader: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    textAlign: 'center',
  },
  appbar: {
    zIndex: '1201',
    backgroundColor: '#fff',
    height: '56px',
  },
  title: {
    color: '#1778f2',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  loginButton: {
    backgroundColor: '#1778f2',
    color: '#fff',
  },
}));

/**
 * Category Component
 *
 * @return {object} Category Component of web app
 */
export default function CategoryComponent() {
  const classes = useStyles();
  const {width} = useDimensions();
  const wide = (width > 550 ? true : false);
  const [category, setCategory] = React.useState('');
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleSelectOpen = () => {
    setOpenSelect(!openSelect);
  };
  const handleFilterOpen = () => {
    setOpenFilter(!openFilter);
  };
  if (wide) {
    return (
      <DimensionsProvider>
        <Appbar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Grid container>
              <Grid item xs={11}>
                <Typography className={classes.title}>
                  Mugtome Bazaar
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant='contained'
                  className={classes.loginButton}
                  href='/login'
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Appbar>
        <Drawer
          className={classes.drawerHeader}
          variant='persistent'
          anchor='left'
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <SubCategoryDesktopHeader whichCategory={category}/>
          <Divider />
          <Stack direction="column" overflow="auto">
            <CategoryContext.Provider
              value={{
                openFilter, handleFilterOpen,
                category,
              }}>
              <CategoryFilterDrawer />
            </CategoryContext.Provider>
            <CategoryContext.Provider
              value={{
                openSelect, setOpenSelect,
                category, setCategory, handleSelectOpen,
              }}>
              <CategorySelectDrawer />
            </CategoryContext.Provider>
          </Stack>
        </Drawer>
        <CategoryContext.Provider
          value={{
            category, setCategory, handleSelectOpen,
          }}>
          <SubCategoryComponent />
          <Paper
            elevation={paperElevation}
            style={{
              marginLeft: drawerWidth,
              padding: 10,
              marginTop: 10,
            }}>
            <DisplayItems whichCat={category}/>
          </Paper>
        </CategoryContext.Provider>
      </DimensionsProvider>
    );
  } else {
    return (
      <DimensionsProvider>
        <CategoryContext.Provider
          value={{
            openSelect, setOpenSelect,
            category, setCategory, handleSelectOpen,
          }}>
          <CategorySelectDrawer />
        </CategoryContext.Provider>
        <CategoryContext.Provider
          value={{
            openFilter, handleFilterOpen,
            category,
          }}>
          <CategoryFilterDrawer />
        </CategoryContext.Provider>
        <CategoryContext.Provider
          value={{
            category, setCategory, handleSelectOpen, handleFilterOpen,
          }}>
          <SubCategoryComponent />
          <Paper
            elevation={paperElevation}
            style={{
              padding: 10,
              marginTop: 10,
            }}>
            <DisplayItems whichCat={category}/>
          </Paper>
        </CategoryContext.Provider>
      </DimensionsProvider>
    );
  }
}

/**
 * Sub Category Component
 *
 * @return {object} Sub category Component of web app
 */
const SubCategoryComponent = () => {
  const {width} = useDimensions();
  const wide = (width > 550 ? true : false);
  if (wide) {
    return (
      <CategoryContext.Consumer>
        {({category, setCategory}) => (
          <CategoryContext.Provider value={{category, setCategory}}>
            <SubCategoryDesktopPaper whichCategory={category} />
          </CategoryContext.Provider>
        )}
      </CategoryContext.Consumer>
    );
  } else {
    return (
      <CategoryContext.Consumer>
        {({category, setCategory, handleSelectOpen, handleFilterOpen}) => (
          <Paper elevation={paperElevation}>
            <CategoryContext.Provider
              value={{setCategory, handleSelectOpen, handleFilterOpen}}>
              <SubCategoryMobileHeader whichCategory={category}/>
              <SubCategoryButtons whichCategory={category}/>
              <Divider/>
              <SubCategoryMobileFilter whichCategory={category}/>
            </CategoryContext.Provider>
          </Paper>
        )}
      </CategoryContext.Consumer>
    );
  }
};

/**
 * Function that gets number of subcategories of category
 *
 * @param {string} category Category to get number of subcategories for
 * @param {function} setSubCount Function to set number of subcategories
 *
 */
function getSubCount(category, setSubCount) {
  if (category) {
    fetch(`/v0/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setSubCount(json.sub.length);
      });
  }
}

/**
 * Sub Category Desktop Paper component
 *
 * @param {string} props Selected category
 * @return {object} Sub Category Desktop Paper component
 */
const SubCategoryDesktopPaper = (props) => {
  const [subCount, setSubCount] = React.useState(0);
  const classes = useStyles();
  getSubCount(props.whichCategory, setSubCount);
  if (props.whichCategory && subCount > 0) {
    return (
      <CategoryContext.Consumer>
        {({category}) => (
          <Paper
            elevation={paperElevation}
            className={classes.categoryPaper}>
            <Toolbar>
              <Typography variant='h6' noWrap
                className={classes.categoryHeader}>
                Shop by Category
              </Typography>
            </Toolbar>
            <SubCategoryButtons whichCategory={category} />
          </Paper>
        )}
      </CategoryContext.Consumer>
    );
  } else {
    return null;
  }
};

/**
 * Sub Category Desktop Header component
 *
 * @param {string} props Selected category
 * @return {object} Sub Category Desktop Header component
 */
const SubCategoryDesktopHeader = (props) => {
  const classes = useStyles();
  if (props.whichCategory) {
    return (
      <Toolbar>
        <Typography variant='h6' noWrap className={classes.categoryHeader}>
          {props.whichCategory}
        </Typography>
      </Toolbar>
    );
  } else {
    return (
      <Toolbar>
        <Typography variant='h6' noWrap className={classes.categoryHeader}>
          Marketplace
        </Typography>
      </Toolbar>
    );
  }
};

/**
 * Sub Category Mobile Header component
 *
 * @param {string} props Selected category
 * @return {object} Sub Category Mobile Header component
 */
const SubCategoryMobileHeader = (props) => {
  const classes = useStyles();
  if (props.whichCategory) {
    return (
      <CategoryContext.Consumer>
        {({handleSelectOpen}) => (
          <Toolbar>
            <ListItemButton onClick={handleSelectOpen}>
              <Typography variant='h6' noWrap
                className={classes.categoryHeader}>
                {props.whichCategory}
              </Typography>
              <ArrowDropDownIcon />
            </ListItemButton>
          </Toolbar>
        )}
      </CategoryContext.Consumer>
    );
  } else {
    return null;
  }
};

/**
 * Sub Category Mobile Filter button component
 *
 * @param {string} props Selected category
 * @return {object} Sub Category Mobile Filter button component
 */
const SubCategoryMobileFilter = (props) => {
  if (props.whichCategory) {
    return (
      <CategoryContext.Consumer>
        {({handleFilterOpen}) => (
          <Toolbar>
            <Button
              variant="contained"
              startIcon={<TuneIcon />}
              style={{textTransform: 'none'}}
              onClick={handleFilterOpen}>
              Filters
            </Button>
          </Toolbar>
        )}
      </CategoryContext.Consumer>
    );
  } else {
    return null;
  }
};

/**
 * Function that gets subcategory of category
 *
 * @param {string} category Category to get subcategories for
 * @param {function} setSubCat Function to set subcategories array
 *
 */
function getSubcategory(category, setSubCat) {
  if (category) {
    fetch(`/v0/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setSubCat(json.sub);
      });
  }
}

/**
 * Sub Category Buttons component
 *
 * @param {string} props Selected category
 * @return {object} Sub Category Buttons component
 */
const SubCategoryButtons = (props) => {
  const {setCategory, handleSelectOpen} = React.useContext(CategoryContext);
  const [subCat, setSubCat] = React.useState([]);
  useEffect(() => {
    getSubcategory(props.whichCategory, setSubCat);
    return () => {
      setSubCat([]);
    };
  }, [props.whichCategory]);
  if (props.whichCategory) {
    if (subCat.length > 0) {
      return (
        <Toolbar>
          <Stack direction="row" spacing={1} overflow="auto">
            {subCat.map((item, index) => (
              <Chip label={item} key={index}
                style={{
                  backgroundColor: '#e0e0e0',
                  color: 'black',
                  fontWeight: 'bold',
                }}
                clickable
                onClick={function() {
                  setCategory(`${item}`);
                }}/>
            ))}
          </Stack>
        </Toolbar>
      );
    } else {
      return null;
    }
  } else {
    return (
      <Toolbar>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          href='/login'
        >
          <AccountCircle />
        </IconButton>
        <Stack direction="row" spacing={1} overflow="auto">
          <Chip label="All Categories"
            style={{
              backgroundColor: '#e0e0e0',
              color: 'black',
              fontWeight: 'bold',
            }}clickable
            onClick={handleSelectOpen}/>
        </Stack>
      </Toolbar>
    );
  }
};
