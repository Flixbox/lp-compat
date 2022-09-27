import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import RNAndroidInstalledApps from 'react-native-android-installed-apps-unblocking'

interface AndroidInstalledApp {
  apkDir: string
  appName: string
  firstInstallTime: number
  icon: string
  packageName: string
  lastUpdateTime: number
  size: number
  versionCode: number
  versionName: string
}

const InstalledApps = () => {
  const [installedApps, setInstalledApps] = useState<AndroidInstalledApp[]>([])
  useEffect(() =>
    RNAndroidInstalledApps.getApps()
      .then((apps) => {
        //console.log(apps[0])
        setInstalledApps(apps)
      })
      .catch((error) => {
        alert(error)
      })
  )

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading>
      <FlatList
        data={installedApps}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            pl={['0', '4']}
            pr={['0', '5']}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: `data:image/png;base64,${item.icon}`,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.appName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  {item.packageName}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.appName}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(app) => app.packageName}
      />
    </Box>
  )
}

export default InstalledApps
