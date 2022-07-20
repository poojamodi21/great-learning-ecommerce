import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';



export default function CustomCard({ name, description, image, price }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" style={{ display: 'flex', justifyContent: 'center' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'center' }}>
            {description}
          </Typography>
          <Typography variant="h6" color="black" style={{ display: 'flex', justifyContent: 'center' }}>
            {price}
          </Typography>
          <Stack spacing={1} >
            <Rating name="half-rating"  defaultValue={2.5} precision={0.5} style={{ display: 'flex', justifyContent: 'center' }}/>
            {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<FavoriteIcon />}>
            Wishlist
          </Button>
          <Button variant="contained" endIcon={< AddCircleOutlineOutlinedIcon />}>
            Add to Cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}