import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';
import './global.css';

const HEADER_FONT_FAMILY = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif',
];
const BODY_FONT_FAMILY = ['PT Serif', 'serif'];

oceanBeachTheme.overrideThemeStyles = () => ({
  'h1, h2, h3, h4, h5, h6': {
    marginTop: `2.5rem`,
  },
  'h1, h2': {
    fontFamily: HEADER_FONT_FAMILY.join(','),
    paddingBottom: '0.62rem',
  },
  'h3, h4, h5, h6': {
    fontFamily: BODY_FONT_FAMILY.join(','),
  },
  a: {
    color: 'var(--textLink)',
  },
  hr: {
    background: 'var(--hr)',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  // These two are for gatsby-remark-autolink-headers:
  'a.anchor': {
    boxShadow: 'none',
  },
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--secondary-color)',
  },
  // TODO: why tho
  'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
    fontSize: 'inherit',
  },
  blockquote: {
    color: 'inherit',
    borderLeftColor: 'inherit',
    opacity: '0.8',
  },
  'blockquote.translation': {
    fontSize: '1rem',
  },
  footer: {
    fontSize: '0.8rem',
    display: 'flex',
    'justify-content': 'space-between',
  },
  small: {
    color: 'var(--gray)',
  },
  '.blog-post figcaption': {
    fontSize: '0.8rem',
    color: 'var(--secondary-color)',
    textAlign: 'center',
  },
});

delete oceanBeachTheme.googleFonts;

oceanBeachTheme.baseFontSize = '18px';
oceanBeachTheme.headerFontFamily = HEADER_FONT_FAMILY;
oceanBeachTheme.bodyFontFamily = BODY_FONT_FAMILY;

const typography = new Typography(oceanBeachTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
