import styled, { createGlobalStyle, keyframes } from 'styled-components'

export const colors = {
  // brand: '#C00A0A',
  brand: '#6FFFB0',
  gradient: `linear-gradient(to bottom right, #020202, #C00A0A 25%, #020202)`,
}

export const theme1 = {
  colors: {
    brand: colors.brand,
    spacer: `radial-gradient(${colors.brand}, #000000)`,
    gradient: `linear-gradient(to bottom right, #020202, ${colors.brand} 45%, #020202)`,
    rgradient: `linear-gradient(to bottom right, ${colors.brand}, #020202 40%, #020202 60%,  ${colors.brand})`,
    text: 'white',
    error: '#C00A0A',
    background: 'black',
    // altBackground: '#222222',
    altBackground: `linear-gradient(to bottom right, #222222 , #303030, #222222)`,
    inputBackground: '#252525',
    gray: 'gray',
    darkgray: 'rgb(45,45,45)',
    lightblue: 'rgb(164,232,242)',
    button: {
      background: 'rgb(0, 128, 96)',
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}

export const theme2 = {
  colors: {
    brand: colors.brand,
    spacer: `radial-gradient(${colors.brand}, #000000)`,
    gradient: `linear-gradient(to bottom right, #fff, ${colors.brand} 45%, #fff)`,
    rgradient: `linear-gradient(to bottom right, ${colors.brand}, #fff 40%, #fff 60%,  ${colors.brand})`,
    text: 'black',
    error: '#C00A0A',
    background: '#e1e1e1',
    altBackground: '#b1b1b1',
    altBackground: `linear-gradient(to bottom right, #b1b1b1 , #d1d1d1, #b1b1b1)`,
    inputBackground: '#c3c3c3c3',
    gray: 'gray',
    darkgray: 'rgb(45,45,45)',
    lightblue: 'rgb(164,232,242)',
    button: {
      background: 'rgb(0, 128, 96)',
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}

export const theme3 = {
  colors: {
    brand: colors.brand,
    spacer: `radial-gradient(${colors.brand}, #000000)`,
    gradient: `linear-gradient(to bottom right, #020202, ${colors.brand} 45%, #020202)`,
    rgradient: `linear-gradient(to bottom right, #020202 40%, #020202 60%,  ${colors.brand})`,
    text: 'white',
    error: '#C00A0A',
    background: `black`,
    altBackground: `linear-gradient(to bottom right, ${colors.brand}, #101010, #101010, #222222, #101010, #101010, ${colors.brand})`,
    inputBackground: '#252525',
    gray: 'gray',
    darkgray: 'rgb(45,45,45)',
    lightblue: 'rgb(164,232,242)',
    button: {
      background: 'rgb(0, 128, 96)',
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}

export const breakpoints = {
  mobile: '400px',
  phablet: '550px',
  tablet: '750px',
  desktop: '1000px',
  hd: '1300px'
};

export const dimensions = {
  navHeight: '60px',
};

export const spacing = {
  sm: '5px',
  md: '10px',
  lg: '15px',
  xl: '20px',
};

export const Spacer = styled.div`
  background: ${({ theme }) => theme.colors.spacer};
  height: 8px;
  margin: 8px 0;
  width: 100%;
`

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    overflow-y: ${({ open }) => open ? 'hidden' : 'visible'};
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;

  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-family: Cinzel, 'Playfair Display SC', serif;
    margin: 0;
  }

  main { width: 100%; }

  .bg { background: ${({ theme }) => theme.colors.background}; }
  .alt-bg { background: ${({ theme }) => theme.colors.altBackground}; }

  .std-div {
    border-radius: 10px;
    padding: 10px;
  }

  .alt-div-1 {
    border-radius: 30px;
    padding: 10px;
  }

  .flex-c-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-ai-c {
    display: flex;
    align-items: center;
  }

  .flex {
    display: flex;
  }

  .flex-1 {
    flex: 1;
  }

  .fl-wrap {
    flex-wrap: wrap;
  }

  .fd-col {
    flex-direction: column;
  }

  .w-100 { width: 100%; }

  .m-xxs { margin: 2.5px; }

  .mb-s { margin-bottom: 10px; }

  .mb-xs { margin-bottom: 5px; }

  .ml-xs { margin-left: 5px; }

  .mt-xs { margin-top: 5px; }
  .mt-s { margin-top: 10px; }

  .mr-s { margin-right: 10px; }
  .ml-s { margin-left: 10px; }


  .mtb-s {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .active { border: 1px solid ${({ theme }) => theme.colors.brand}; }

  .c-brand { color: ${({ theme }) => theme.colors.brand}; }
  .c-delete { color: red; }

  .border { border: 1px solid gray; }
  .border-top { border-top: 1px solid gray; }

  .rotate { animation: ${rotate360} 1s linear infinite; }

  .pop-up {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    // height: 300px;
    box-shadow: 0 0 5px 2px ${({ theme }) => theme.colors.text};
  }

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
  }

  input, textarea {
    border-radius: 10px;
    border: none;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.brand};
      outline: none;
    }
  }
`






