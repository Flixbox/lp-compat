import { AppBar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeDialog } from "../redux/systemSlice";

const DialogProvider = () => {
  const { dialogs } = useAppSelector((state) => state.system);
  return (
    <>
      <EditAppDialog open={dialogs?.EDIT_APP.open} />
    </>
  );
};

const EditAppDialog = ({ open }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(closeDialog({ dialog: "EDIT_APP" }));
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            Close
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Sound
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default DialogProvider;
