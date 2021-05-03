import { black, purple, blue, teal, grey, red, white } from './colors'

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    purple,
    blue,
    red,
    primary: {
      light: blue[200],
      main: blue[400],
    },
    secondary: {
      main: blue[400],
    },
    white,
    teal,
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72
}

export default theme