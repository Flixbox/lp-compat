import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { Dialogs } from '@/components/Dialogs'
import { useColorMode } from '@/hooks'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const colorMode = useColorMode()

  return (
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
  )
}

export { Providers }
