import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'
import { DialogProvider } from '@/components/DialogProvider'
import { useColorMode } from '@/hooks'
import { store } from '@/redux/store'

const queryClient = new QueryClient()

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const colorMode = useColorMode()

  return (
    <QueryClientProvider client={queryClient}>
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
          <DialogProvider />
          {children}
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export { Providers }
