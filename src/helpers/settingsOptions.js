export const options = {
  theme: [
    'plain',
    'light',
    'dark'
  ],
  dark: {
    theme: {
    primary: "#190933",
    secondary: "#E0E2F7",
    activity: "#ff7733",
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: "#010429",
    button: "#D81B60",
    accentmain: "#ff002b",
    accentinfo: '#0096ff',
    accent1: "#00E5FF",
    accent2: "#FFC400",
    accent3: "#76FF03",
    accent4: "#F48FB1"
  },
  emphasis: {
    high: '#FFFFFFDF',
    medium: '#FFFFFF9F',
    disabled: '#FFFFFF5F'
  },
  dark: true
},
  light: {
    theme: {
    primary: "#190933",
    secondary: "#E0E2F7",
    activity: "#ff7733",
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: "#FFFFFF",
    button: "#D81B60",
    accentmain: "#ff002b",
    accentinfo: '#1867c0',
    accent1: "#43A047",
    accent2: "#9C27B0",
    accent3: "#03A9F4",
    accent4: "#FF5722"
  },
  emphasis: {
    high: '#000000BF',
    medium: '#0000009F',
    disabled: '#0000005F'
  },
  dark: false
},
  plain: {
    theme: {
    primary: "#190933",
    secondary: "#E0E2F7",
    activity: "#ff7733",
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: "#FFFFFF",
    button: "#D81B60",
    accentmain: "#ff002b",
    accentinfo: '#1867c0',
    accent1: "#111111",
    accent2: "#111111",
    accent3: "#111111",
    accent4: "#111111"
  },
  emphasis: {
    high: '#000000BF',
    medium: '#0000009F',
    disabled: '#0000005F'
  },
  dark: false
},
  script: [
    'iast',
    'devanagari',
    'gujarati',
    'tamil',
    'telugu',
    'malayalam',
    'kannada',
    'bengali',
    'gurmukhi',
    'oriya',
    'itrans'
  ],
  language: [
    'hindi',
    'english'
  ],
  slines: [
    '2x',
    '4x',
    'auto'
  ],
  // fweight: ['100', '300', '400', '500', '700', '900'],
  fsize: ['small', 'medium', 'big'],
  fsizeInternal: {small: 'body-2', medium: 'subheading', big: 'title'},
  fsizeAvailable: ['body-2', 'subheading', 'title', 'headline', 'display-1', 'display-2', 'display-3', 'display-4']
}
