import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

interface CardProps {
  image: string;
  title: string;
  description: string;
  imagetype: string;
  itemIndex: number;
  handleOpen?: () => void; // Add a question mark to make it an optional prop
  id: string;
  isAlbum: boolean;
  setPostDetails: React.Dispatch<React.SetStateAction<any>>;
  postDetails: any;
  data: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  imagetype,
  itemIndex,
  setPostDetails,
  data,
  setOpen,
}) => {
  return (
    <ImageListItem onClick={() => {
      setPostDetails(data);
      setOpen(true);
    }} key={'item' + itemIndex} >
      {imagetype === 'video/mp4' ? (
        <video
          key={'video' + itemIndex}
          width='100%'
          height='100%'
          muted={true}
          autoPlay={true}
        >
          <source src={image} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          key={'image' + itemIndex}
          width="100%"
          src={`${image}?fit=crop&auto=format`}
          srcSet={`${image}?fit=crop&auto=format&dpr=2 2x`}
          alt={title}
          loading="lazy"
        />
      )}
      <ImageListItemBar
        title={title}
        subtitle={description}
      />
    </ImageListItem>
  );
};

export default Card;
