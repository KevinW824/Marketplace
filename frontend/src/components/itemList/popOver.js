import {Paper} from '@mui/material';
import Typography from '@material-ui/core/Typography';
import Pagination from '@mui/material/Pagination';
import {CardContent} from '@mui/material';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import {useContext, useState} from 'react';
import {popOverContext} from './ItemsList';
/**
 *
 * @return {Component} Paper Popover component
 */
function PopOver() {
  const contextInfo = useContext(popOverContext);
  const item = contextInfo.showPopup;
  /**
   *
   * @param {object} event
   * @param {number} value
   */
  function updateNum(event, value) {
    setPage(value);
  }
  const [page, setPage] = useState(1);
  return (
    <Paper
      sx = {{
        'h1': {
          margin: 0,
        },
        'img': {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backdropFilter: 'blur(10px)',
        },
        '& #background': {
          width: ['100%', 'null', '65%'],
          height: ['50%', 'null', '100%'],
          backgroundImage: `url(${item.imgList[page-1]})`,
        },
        '& #itemInfo': {
          display: 'inline-block',
          width: ['100%', 'null', '35%'],
        },
        '& .close': {
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '50px',
          zIndex: '20',
        },
        'zIndex': 2001,
        'width': '100%',
        'height': '100vh',
        'margin': 0,
        'left': 0,
        'position': 'fixed',
        'alignContent': 'space-between',
        'display': ['block', 'null', 'flex'],
        'bottom': 0,
        'padding': 0,
        'boxShadow': 'none',
      }}
      elevation = {0}
    >
      <CancelIcon
        onClick = {contextInfo.notDisplay}
        className = 'close'
        sx = {{
          display: 'block',
          float: 'right',
        }}
      />
      <div id = "background">
        <img src = {item.imgList[page-1]} alt = "placeholder"/>
      </div>
      <div id = "itemInfo">
        <CardContent>
          {
            item.imgList.length > 1 &&
            <Pagination page = {page}
              onChange = {updateNum} count={item.imgList.length}/>
          }
          <Typography variant = "h5">
            {item.title}
          </Typography>
          <Typography color = "textSecondary">
              ${item.price}
          </Typography>
          <Typography component="h5">
            {item.name}
          </Typography>
          <Typography component="h5">
            {item.location}
          </Typography>
          <Button
            fullWidth = {true}
            variant = "contained">LOG IN FOR DETAILS</Button>
        </CardContent>
      </div>
    </Paper>
  );
}

export default PopOver;
