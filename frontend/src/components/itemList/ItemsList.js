/** @jsxImportSource @emotion/react */
// import {css} from '@emotion/react';
import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useState, useEffect, createContext} from 'react';
import PopOver from './popOver';
// import itemsData from '../../data/items.json';

export const popOverContext = createContext();

/**
 * @return {element} Item display element
 * @param {string} props Category string passed down from category component
 */
function DisplayItems(props) {
  const [itemsObj, setItemsObj] = useState([]);

  const [showPopup, setShowPopup] = useState(null);
  /**
   *
   * @param {object} listing
   */
  function displayPopup(listing) {
    console.log(listing);
    if (!showPopup) {
      setShowPopup(listing);
    } else {
      setShowPopup(null);
    }
  }

  const user = localStorage.getItem('user');
  const bearerToken = user ? user.accessToken : '';

  useEffect(() =>{
    if (props.whichCat) {
      fetch(`http://localhost:3010/v0/todaysPicks/?category=${props.whichCat}`, {
        headers: new Headers({
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then((res) => res.json())
        .then((data) => setItemsObj(data));
    } else {
      fetch(`http://localhost:3010/v0/todaysPicks`, {
        headers: new Headers({
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then((res) => res.json())
        .then((data) => setItemsObj(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.whichCat]);


  if (!itemsObj) {
    return (<h1>Nothing</h1>);
  } else {
    return (
      <div>
        {
          showPopup &&
          <popOverContext.Provider value =
            {{showPopup, notDisplay: displayPopup}}>
            <PopOver/>
          </popOverContext.Provider>
        }
        <Box sx = {{display: 'grid', gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
          {itemsObj.map(({listing}, index) => (
            <Card onClick = {(e) =>
              displayPopup(listing, e)} elevation = {0} component = "div"
            key = {index}>
              <CardMedia
                sx = {{
                  objectFit: 'fill',
                }}
                component="img"
                alt="Car Should be Here"
                height = "50%"
                image={listing.imgList[0]}
                title="Car"
              />
              <CardContent id = "itemInfo">
                <Typography component="h4">
                  ${listing.price}
                </Typography>
                <Typography component="h4">
                  {listing.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {listing.location}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    );
  }
}

export default DisplayItems;
