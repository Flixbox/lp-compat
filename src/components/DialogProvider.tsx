import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
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
import React, { useEffect, useState } from "react";
import { featureMap } from "../featureMap";
import { addApp } from "../redux/appsSlice";
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
  const [error, setError] = useState(false);
  const theme = useTheme();
  const features = featureMap(theme);

  console.log("editState", editState);

  const handleChange = (part, value) => {
    setEditState({ ...editState, [part]: value });
  };

  const handleClose = () => {
    setEditState({} as App);
    dispatch(closeDialog({ dialog: "EDIT_APP" }));
  };

  // Populate edit fields when the dialog opens
  useEffect(() => {
    if (open) setEditState({ ...initialAppData } as App);
  }, [open]);

  const handleSave = async () => {
    const result = await dispatch(addApp({ app: editState }));
    if (result.meta.requestStatus === "fulfilled") {
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      {open && Object.keys(editState).length !== 0 && (
        <>
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
              <Button autoFocus color="inherit" onClick={handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Box m={1} />
          {error && (
            <Alert
              severity="error"
              onClose={() => {
                setError(false);
              }}
            >
              That didn't work. Make sure you prefix any custom features with ::
              <br />
              Does the app {editState.appId} exist on the Play Store?
            </Alert>
          )}
          <Box m={1} />
          <Typography>{appId}</Typography>
          <Box m={1} />
          <AppTextField
            field="title"
            editState={editState}
            handleChange={handleChange}
          />
          <Box m={1} />
          <Typography>
            You can select various pre-defined features from the list or add
            your own. <br /> Please try to always at least choose one of iap,
            unclear-iap or no-iap so that users can filter the list. <br />
            You can add custom features by prefixing them with :: <br />
            Examples: <br />
            ::Works with version 1.2.3 from APKPure <br />
            warning::Does not work with Android 12
          </Typography>
          <Box m={1} />
          <Autocomplete
            multiple
            id="tags-filled"
            options={Object.keys(features).map((key) => key)}
            freeSolo
            value={editState.features}
            onChange={(event: any, newValue) => {
              console.log("onChange", newValue);
              handleChange("features", newValue);
            }}
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
                label="Features"
                placeholder="Features"
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" flexDirection="column" {...props}>
                <Typography>{features[option].label}</Typography>
                <Typography variant="caption">{option}</Typography>
              </Box>
            )}
          />
        </>
      )}
    </Dialog>
  );
};

export default DialogProvider;
