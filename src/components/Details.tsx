import React from "react";
import { Box, Modal, Grid, Typography } from "@mui/material";
import noImage from "../assets/images/no_image.png";

interface DetailsModalProps {
  data: {
    type?: string;
    images?: {
      type: string;
      link: string;
    }[];
    link?: string;
    mp4?: string;
    ups: number;
    downs: number;
    title: string;
    description: string;
    score: number;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ data, setOpen, open }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    maxWidth: "70%",
    maxHeight: "700px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    background: "darkcyan",
    borderRadius: "5px",
  };

  const imagetype =
    Object.keys(data).length > 0
      ? data?.type
        ? data.type
        : data?.images
        ? data?.images[0]
          ? data?.images[0]?.type
          : data?.images[0]?.type
        : "noImage"
      : "noImage";

  const image =
    Object.keys(data).length > 0
      ? data?.type
        ? data?.link
          ? data?.link
          : data?.mp4
        : data?.images?.[0]?.link ?? noImage
      : noImage;

  const { ups, downs, title, description, score } = data;

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          {/* Images data */}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            style={{
              background: "#0b0a22",
              color: "white",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <Grid container>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography
                  style={{ textDecoration: "uppercase", fontSize: "20px" }}
                  gutterBottom
                >
                  {title || ""}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {description || ""}
                </Typography>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} style={{ color: "green" }}>
                {"UPVOTES:"} {ups}
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} style={{ color: "red" }}>
                {"DOWNVOTES:"} {downs}
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                style={{ color: "yellow" }}
              >
                {"SCORE:"} {score}
              </Grid>
            </Grid>
          </Grid>
          {/* Images */}
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              {imagetype === "video/mp4" ? (
                <video
                  key={"video"}
                  height="500px"
                  controls
                  muted={true}
                  autoPlay={true}
                >
                  <source width={"100%"} src={image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  key={"image"}
                  src={`${image}`}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "500px",
                  }}
                  srcSet={`${image}`}
                  alt={title}
                  loading="lazy"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DetailsModal;
