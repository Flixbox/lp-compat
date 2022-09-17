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
    (appPackage) => (codeBlock = `${codeBlock}${appPackage}\n`)
  );

  const handleSubmit = () => setAppPackages([...appPackages, enteredPackage]);
  return (
    <Box>
      <Container>
        <Box m={3} />
        <Typography variant="h3">Add an app</Typography>
        <Box m={3} />
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
        <Box m={3} />
        <Box>
          <List dense>
            {appPackages.map((appPackage) => (
              <ListItem
                secondaryAction={
                  <Button aria-label="delete">
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </Button>
                }
                key={appPackage}
              >
                <ListItemText primary={appPackage} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box m={3} />
        <Box>
          <pre>
            <code>{codeBlock}</code>
          </pre>
        </Box>
      </Container>
    </Box>
  );
};

export default AddApp;
