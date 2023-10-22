import { createTheme, responsiveFontSizes }
	from '@mui/material/styles';

const theme = responsiveFontSizes(createTheme({
	spacing: 4,
	typography: {
		fontFamily: [
			'Sweet Sans Pro',
            'Playfair Display',
			'Raleway',
			'Open Sans',
		].join(','),
		h1: {
			fontSize: '2.5rem',
			fontFamily: 'Sweet Sans Pro',
            color: '#345C50',
            fontStyle: 'bold',
            textAlign: 'center',
		},
		h2: {
			fontFamily: 'Sweet Sans Pro',
			fontStyle: 'bold',
            color: '#345C50',
            textAlign: 'center',
		},
		h3: {
			fontFamily: 'Sweet Sans Pro',
            color: '#667B68',
            fontStyle: 'bold',
            textAlign: 'center',
		},
        h4: {
            fontFamily: 'Sweet Sans Pro',
            color: '#667B68',
            fontStyle: 'bold',
            textAlign: 'center',
        },
        h5: {
            fontFamily: 'Sweet Sans Pro',
            color: '#667B68',
            fontStyle: 'bold',
            textAlign: 'center',
        },
	},
	palette: {
		background: {
			default: '#009900'//green
		},
		primary: { 
        /* ======= GREEN ======= */
            main: '#667B68',
            light: '#A3B899',
            dark: '#345C50',
		},
		secondary: {
        /* ======= TAN ======= */
        main: '#E5D3B3',
        light: '#F4EAD7',
        dark: '#D2B48C',
		},
	},

}));


export default theme;
