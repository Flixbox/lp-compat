import { faFaceSmileWink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Link } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import styles from './Home.module.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { CompatOverview } from '@/components/CompatOverview'

config.autoAddCss = false

const LINKS = [
  { to: '/docs/lp-info', text: 'Important info about LP 💡' },
  { to: '/docs/intro', text: 'How to install & patch an app 📖' },
  { to: '/docs/favourites', text: 'Community Favourites ⭐' },
  { to: '#apps', text: 'To the list 🚀' },
]

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <FontAwesomeIcon icon={faFaceSmileWink} size="4x" aria-hidden="true" />
        <Box className={styles.buttons} flex="1" flexDirection="column">
          {LINKS.map((link, index) => (
            <React.Fragment key={link.to}>
              <Link
                className="button button--secondary button--lg"
                component="a"
                href={link.to}
              >
                {link.text}
              </Link>
              {index < LINKS.length - 1 && <Box m={1} />}
            </React.Fragment>
          ))}
        </Box>
      </div>
    </header>
  )
}

function Home(): JSX.Element {
  return (
    <>
      <HomepageHeader />
      <main>
        <CompatOverview />
      </main>
    </>
  )
}

export { Home }
