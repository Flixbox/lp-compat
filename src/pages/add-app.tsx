import React from "react";
import { Box } from "@mui/system";
import {
  Button,
  Container,
  Grid,
  Input,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { usePersistentState } from "react-persistent-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddApp = () => {
  const [appPackages, setAppPackages] = usePersistentState([], "appPackages");
  const [enteredPackage, setEnteredPackage] = usePersistentState(
    "",
    "enteredPackage"
  );

  let codeBlock = "";
  appPackages.forEach(
    (appPackage) =>
      (codeBlock = `${codeBlock}  "${appPackage.appId}":{"features":["iap"]},\n`)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppPackages([...appPackages, { appId: enteredPackage }]);
  };

  const handleDelete = (appId) =>
    setAppPackages(
      appPackages.filter((appPackage) => appPackage.appId !== appId)
    );

  return (
    <Box>
      <Container>
        <Box m={3} />
        <Typography variant="h3">Add an app</Typography>
        <Box m={3} />
        <form onSubmit={handleSubmit}>
          <Typography>
            Either check the LP app info for the package name or search the play
            store.
          </Typography>
          <Box m={2} />
          <Box display="flex">
            <TextField
              value={enteredPackage}
              onChange={(event) => setEnteredPackage(event.target.value)}
              onSubmit={handleSubmit}
              label="Package name"
              placeholder="com.ironhidegames.android.kingdomrush"
              sx={{ flexGrow: 1 }}
            />
            <Box m={1} />
            <Button variant="outlined" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faAdd} size="lg" />
            </Button>
          </Box>
        </form>
        <Box m={3} />
        <Box>
          <List dense>
            {appPackages.map((appPackage) => (
              <ListItem
                secondaryAction={
                  <Button
                    onClick={() => handleDelete(appPackage.appId)}
                    aria-label="delete"
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </Button>
                }
                key={appPackage.appId}
              >
                <ListItemText primary={appPackage.appId} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box m={3} />
        <Box>
          <Typography variant="h4">Prepared code block</Typography>
          <Typography>
            Use this code in <code>static/compat-data/apps.json</code>
          </Typography>
          <Typography>
            Customize it after pasting it by adjusting the features
          </Typography>
          <pre>
            <code>{codeBlock}</code>
          </pre>
        </Box>
      </Container>
    </Box>
  );
};

export default AddApp;
