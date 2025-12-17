import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  type App,
  featureMap,
  type Theme as SharedTheme,
} from '@lp-compat/shared'
import {
  Alert,
  AppBar,
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import { useStore } from '@nanostores/react'
import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import Custom_features_Example from '@/assets/img/Custom_features_Example.png'
import {
  $addApp,
  $apps,
  $dialogs,
  $discordUserQuery,
  $editApp,
  $getPlayStoreData,
  $searchPlayStoreData,
  closeDialog,
} from '@/store'

const Dialogs = () => {
  const dialogs = useStore($dialogs)
  return (
    <>{dialogs?.EDIT_APP.open && <EditAppDialog {...dialogs?.EDIT_APP} />}</>
  )
}

const AppTextField = ({
  editState,
  field,
  handleChange,
}: {
  editState: Partial<App>
  field: keyof App
  handleChange: (field: keyof App, value: App[keyof App]) => void
}) => {
  return (
    <TextField
      label={field}
      value={editState[field]}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(field, event.target.value)
      }
    />
  )
}

const SearchResult = ({
  result,
  handleChange,
}: {
  result: App
  handleChange: (field: keyof App, value: App[keyof App]) => void
}) => {
  return (
    <>
      <Box display="flex">
        <img src={result.icon} width="100" height="100" alt={result.title} />
        <Button
          onClick={() => {
            handleChange('appId', result.appId)
            handleChange('title', result.title)
            handleChange('icon', result.icon)
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
  )
}

const EditAppDialog = ({
  open,
  appId = '',
}: {
  open: boolean
  appId?: string
}) => {
  const { data: apps } = useStore($apps)
  const initialAppData =
    apps?.find((app) => app.appId === appId) || ({ appId } as App)
  console.log('initialAppData', initialAppData)
  const [editState, setEditState] = useState<App>({ ...initialAppData } as App)
  const [error, setError] = useState(false)
  const [getPlayStoreResult, setGetPlayStoreResult] = useState<App>({} as App)
  const [searchPlayStoreResultByTitle, setSearchPlayStoreResultByTitle] =
    useState<App[]>([] as App[])
  const [searchPlayStoreResultById, setSearchPlayStoreResultById] = useState<
    App[]
  >([] as App[])
  const theme = useTheme()
  const features = featureMap(theme as unknown as SharedTheme)
  const { data, loading } = useStore($discordUserQuery)

  console.log('editState', editState)

  const [debouncedAppId] = useDebounceValue(editState.appId, 500)
  const [debouncedTitle] = useDebounceValue(editState.title, 500)

  const handleChange = (part: keyof App, value: App[keyof App]) => {
    // The internal mongodb ID is not necessary for anything we're doing, neither the editing nor the adding
    setEditState((prevEditState) => ({
      ...prevEditState,
      [part]: value,
      _id: undefined,
    }))
  }

  const handleClose = () => {
    setEditState({} as App)
    closeDialog('EDIT_APP')
  }

  useEffect(() => {
    if (!debouncedAppId) return
    $getPlayStoreData
      .mutate(debouncedAppId)
      .then((res) => setGetPlayStoreResult(res as App))
    $searchPlayStoreData
      .mutate(debouncedAppId)
      .then((res) => setSearchPlayStoreResultById(res as App[]))
  }, [debouncedAppId])

  useEffect(() => {
    if (!debouncedTitle) return
    $searchPlayStoreData
      .mutate(debouncedTitle)
      .then((res) => setSearchPlayStoreResultByTitle(res as App[]))
  }, [debouncedTitle])

  if (loading || !data) return <CircularProgress />

  const handleSave = async () => {
    const user = data
    try {
      await $addApp.mutate({ app: editState, discordUser: user })
      console.log('addApp fulfilled')
      handleClose()
    } catch {
      try {
        await $editApp.mutate({ app: editState, discordUser: user })
        console.log('editApp fulfilled')
        handleClose()
      } catch {
        setError(true)
      }
    }
  }

  if (open && !data.isLoggedIn) {
    alert("You're not logged in!")
    handleClose()
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      {open && Object.keys(editState).length !== 0 && (
        <>
          <AppBar sx={{ position: 'relative' }}>
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
                setError(false)
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
          />
          <Typography>
            You can also use this title field to search for apps.
          </Typography>
          <Box m={1} />
          <AppTextField
            field="icon"
            editState={editState}
            handleChange={handleChange}
          />
          <Typography>
            The icon URL can be obtained by going to{' '}
            <a href={editState.url} target="_blank">
              the app's Google Play page
            </a>{' '}
            and copying the icon image address.
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
            <img
              src={Custom_features_Example.src}
              alt="Custom features example"
            />
          </Box>
          <Box m={1} />
          If this page isn't showing you any results when you search for app
          titles, just try again in an hour or so, as there's likely been too
          many requests made at the time.
          <Box m={1} />
          Notes for special patch features: <br />
          special-patch-fake-modified-apk: This patch must always be applied to
          the original unmodified APK. If you want to patch it multiple times
          you must apply the patch every time you modify it
          <Autocomplete
            multiple
            id="tags-filled"
            options={Object.keys(features).map((key) => key)}
            freeSolo
            value={editState.features}
            onChange={(_event: React.SyntheticEvent, newValue) => {
              console.log('onChange', newValue)
              handleChange('features', newValue)
            }}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => {
                const { key, ...tagProps } = getTagProps({ index })
                return (
                  <Chip
                    key={key}
                    variant="outlined"
                    label={option}
                    {...tagProps}
                  />
                )
              })
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
          <Box m={1} />
          {searchPlayStoreResultByTitle?.length > 0 && (
            <>
              <Typography>Search results by title:</Typography>
              <Box display="flex" flexDirection="column">
                {searchPlayStoreResultByTitle.map((result) => (
                  <SearchResult
                    key={result.appId}
                    result={result}
                    handleChange={handleChange}
                  />
                ))}
              </Box>
            </>
          )}
          <Box m={1} />
          {searchPlayStoreResultById?.length > 0 && (
            <>
              <Typography>Search results by ID:</Typography>
              <Box display="flex" flexDirection="column">
                {searchPlayStoreResultById.map((result) => (
                  <SearchResult
                    key={result.appId}
                    result={result}
                    handleChange={handleChange}
                  />
                ))}
              </Box>
            </>
          )}
        </>
      )}
    </Dialog>
  )
}

export { Dialogs }
