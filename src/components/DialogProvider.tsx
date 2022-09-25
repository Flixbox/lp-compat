import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Autocomplete,
  Button,
  Chip,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { featureMap } from "../featureMap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeDialog } from "../redux/systemSlice";
import { App } from "../types";

const DialogProvider = () => {
  const { dialogs } = useAppSelector((state) => state.system);
  return (
    <>
      <EditAppDialog {...dialogs?.EDIT_APP} />
    </>
  );
};

const AppTextField = ({ editState, field, handleChange }) => {
  return (
    <TextField
      label={field}
      value={editState[field]}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(field, event.target.value)
      }
    />
  );
};

const EditAppDialog = ({ open, appId = "" }) => {
  const dispatch = useAppDispatch();
  const initialAppData = useAppSelector((state) =>
    state.apps.find((app) => app.appId === appId)
  ) || { appId };
  console.log("initialAppData", initialAppData);
  const [editState, setEditState] = useState<App>({ ...initialAppData } as App);
  const theme = useTheme();
  const features = featureMap(theme);
  console.log("editState", editState);

  const handleChange = (part, value) => {
    setEditState({ ...editState, [part]: value });
  };

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
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit app
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box m={1} />
      <Typography>{appId}</Typography>
      <Box m={1} />
      <AppTextField
        field="title"
        editState={editState}
        handleChange={handleChange}
      />
      <Autocomplete
        multiple
        id="tags-filled"
        options={Object.keys(features).map((key) => key)}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      />
    </Dialog>
  );
};

export default DialogProvider;
