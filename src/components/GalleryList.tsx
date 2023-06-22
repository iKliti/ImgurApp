import React, { useState, useEffect } from "react";

import { Grid, Box, Toolbar } from '@mui/material'
import noImage from '../assets/images/no_image.png'
import Card from './Card'
import ImageList from '@mui/material/ImageList'
import Header from '../components/layouts/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getGallery } from '../store/gallerySlice'
import { GalleryState } from '../store/gallerySlice'
import Details from '../components/Details'
import Loading from "../helpers/Loading";

const Gallery: React.FC = () => {
  const dispatch = useDispatch();
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const { gallery, loading } = useSelector((state: { gallery: GalleryState }) => state.gallery);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [postDetails, setPostDetails] = useState<any>({});

  useEffect(() => {
    dispatch(getGallery({ section: 'hot', viral: true, window: 'day', sort: 'viral' }) as any);
  }, []);

  useEffect(() => {
    setGalleryData(gallery ?? [])
    if (!loading) {
      setRefresh(false)
    }
  }, [gallery])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header setRefresh={setRefresh} />
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Grid container style={{ paddingTop: '50px' }}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ImageList variant="masonry" cols={6} gap={10}>
              {galleryData?.map((item, itemIndex) => {
                const imagetype = item?.type ? item.type : item.images ? item.images[0]?.type : 'noImage'
                const image = item?.type ? item.link : item.images ? item.images[0]?.link : noImage
                return (
                  <React.Fragment key={itemIndex}>
                    <Card
                      setOpen={setOpen}
                      data={item}
                      postDetails={postDetails}
                      setPostDetails={setPostDetails}
                      isAlbum={item.is_album}
                      id={item.id}
                      itemIndex={itemIndex}
                      title={item.title}
                      description={item.description}
                      image={image}
                      imagetype={imagetype}
                    />
                  </React.Fragment>
                )
              })}
            </ImageList>
          </Grid>
        </Grid>
      </Box>
      <Details open={open} setOpen={setOpen} data={postDetails} />
      {refresh && <Loading />}
    </>
  )
};

export default Gallery;
