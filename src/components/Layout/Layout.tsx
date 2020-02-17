import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme, makeStyles } from '@material-ui/core';

import NavigationBar from '../NavigationBar/NavigationBar';

const useStyles = makeStyles((theme: Theme) => ({
	appBody: {
		minHeight: '600px'
		}
}));

const Layout: React.FC = (props) => {

	const classes = useStyles();

	return(
		<Box my={4}>
			<NavigationBar />
			<div className={classes.appBody}>
				{ props.children }
			</div>
		</Box>
	);	
}

export default Layout;