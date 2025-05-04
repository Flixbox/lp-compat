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
import {
  addApp,
  editApp,
  getPlayStoreData,
  searchPlayStoreData,
} from "../redux/appsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeDialog } from "../redux/systemSlice";
import { App } from "../types";
import { DiscordUser, useDiscord } from "../hooks/useDiscord";

// Hook to manage dialog state
const useDialog = (dialogName: string) => {
  const { dialogs } = useAppSelector((state) => state.system);
  const dialog = dialogs?.[dialogName];
  return dialog;
};

// DialogProvider component made more generic
const DialogProvider = () => {
  const dialog = useDialogEDIT('_APP');
  if (!dialog) return null;

  return <EditAppDialog {...dialog} />;
};

const AppTextField = ({ editState, field, handleChange, label }) => {
  return (
    <TextField
      label={label || field}
      value={editState[field]}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(field, event.target.value)
      }
    />
  );
};

const SearchResult = ({ result, handleChange }) => {
  return (
    <>
      <Box display="flex">
        <img src={result.icon} width="100" height="100" />
        <Button
          onClick={() => {
            handleChange("appId", result.appId);
            handleChange("title", result.title);
            handleChange("icon", result.icon);
          }}
        >
          Use this app
        </Button>
      </Box>
      <Typography>ID: {result.appId} </Typography>
      <Typography>Title: {result.title}</Typography>
      {+result.price && <Typography>Price: {result.price}</Typography>}
      <Box m={1} />
    </>
  );
};

const EditAppDialog = ({ open, appId = "" }) => {
  const dispatch = useAppDispatch();
  const initialAppData = useAppSelector((state) =>
    state.apps.find((app) => app.appId === appId)
  );
  const [editState, setEditState] = useState<App>(initialAppData || { appId } as App);
  const [error, setError] = useState(false);
  const [getPlayStoreResult, setGetPlayStoreResult] = useState<App>({} as App);
  const [searchPlayStoreResultByTitle, setSearchPlayStoreResultByTitle] =
    useState<App[]>([] as App[]);
  const [searchPlayStoreResultById, setSearchPlayStoreResultById] = useState<
    App[]
  >([] as App[]);
  const theme = useTheme();
  const features = featureMap(theme);
  const { discordUser, isLoggedIn } = useDiscord();

  const handleChange = (part, value) => {
    setEditState((prevEditState) => ({ ...prevEditState, [part]: value, _id: undefined }));
  };

  const handleClose = () => {
    setEditState({} as App);
    dispatch(closeDialog({ dialog: "EDIT_APP" }));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setError(true);
      handleClose();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (!editState.appId && !editState.title) return;
      dispatch(getPlayStoreData({ appId: editState.appId })).then((res) =>
        setGetPlayStoreResult(res.payload)
      );
      dispatch(searchPlayStoreData({ query: editState.title })).then((res) =>
        setSearchPlayStoreResultByTitle(res.payload)
      );
      dispatch(searchPlayStoreData({ query: editState.appId })).then((res) =>
        setSearchPlayStoreResultById(res.payload)
      );
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [editState.appId, editState.title]);

  const handleSave = async () => {
    const user = discordUser as DiscordUser;
    let result = await dispatch(addApp({ app: editState, discordUser: user }));
    if (result.meta.requestStatus === "fulfilled") {
      console.log("addApp fulfilled");
      handleClose();
    } else {
      result = await dispatch(editApp({ app: editState, discordUser: user }));
      if (result.meta.requestStatus === "fulfilled") {
        console.log("editApp fulfilled");
        handleClose();
      } else {
        setError(true);
      }
    }
  };

  if (open && !isLoggedIn) {
    setError(true);
    handleClose();
  }

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
                Add or edit app
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Box m={1} />
          <Typography>
            After patching you may have to refresh the data (hit the refresh
            button under the filter section).
          </Typography>
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
          {!getPlayStoreResult?.title && (
            <Alert severity="info">
              Could not find an app with this ID.
              <br />
              Does the app {editState.appId} exist on the Play Store?
            </Alert>
          )}
          <Box m={1} />
          <AppTextField
            field="appId"
            editState={editState}
            handleChange={handleChange}
            label="App ID"
          />
          <Box m={1} />
          {getPlayStoreResult?.title && (
            <Typography>{`Searched app ID ${editState.appId} and found app in play store with title ${getPlayStoreResult.title}`}</Typography>
          )}
          <Box m={1} />
          <AppTextField
            field="title"
            editState={editState}
            handleChange={handleChange}
            label="Title"
          />
          <Typography>
            You can also use this title field to search for apps.
          </Typography>
          <Box m={1} />
          <AppTextField
            field="icon"
            editState={editState}
            handleChange={handleChange}
            label="Icon URL"
          />
          <Typography>
            The icon URL can be obtained by going to <a href={editState.url} target="_blank">the app's Google Play page</a> and copying the icon image address.
          </Typography>
          <Box m={1} />
          <Typography>
            You can select various pre-defined features from the list or add
            your own. <br /> Please try to always at least choose one of iap,
            unclear-iap or no-iap so that users can filter the list. <br />
            You can add custom features by prefixing them with :: <br />
            However, it must be added after a pre-defined feature is added
            first. <br />
            If you did it right, the result should look like this:
          </Typography>
          <Box m={1} />
          <Box m={1}>
            <img src="/lp-compat/img/Custom_features_Example.png" />
          </Box>
          <Box m={1} />
          <Typography>
            If this page isn't showing you any results when you search for app titles, just try again in an hour or so, as there's likely been too many requests made at the time.
          </Typography>
          <Box m={1} />
          <Typography>
            Notes for special patch features: <br />
            special-patch-fake-modified-apk: This patch must always be applied to
            the original unmodified APK. If you want to patch it multiple times
            you must apply the patch every time you modify it
          </Typography>
          <Autocomplete
            multiple
            id="tags-filled"
            options={Object.keys(features)}
            freeSolo
            value={editState.features}
            onChange={(event, newValue) => handleChange("features", newValue)}
            renderTags={(value, get
