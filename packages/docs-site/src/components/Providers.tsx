import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { Provider } from 'react-redux'
import { Dialogs } from '@/components/Dialogs'
import { useColorMode } from '@/hooks'
import { store } from '@/redux/store'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const colorMode = useColorMode()

  return (
    <Provider store={store}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: colorMode,
          },
          components: {
            MuiChip: {
              styleOverrides: {
                labelSmall: {
                  paddingTop: '3px',
                },
              },
            },
            MuiTextField: {
              defaultProps: {
                variant: 'outlined',
              },
            },
          },
        })}
      >
        <Dialogs />
        {children}
      </ThemeProvider>
    </Provider>
  )
}

export { Providers }
