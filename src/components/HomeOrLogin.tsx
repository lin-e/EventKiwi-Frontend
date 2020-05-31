import React from 'react';
import { Redirect } from 'react-router';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import Tabs from '../pages/Tabs';


const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type HomeOrLoginProps = PropsFromRedux;

const HomeOrLogin: React.FC<HomeOrLoginProps> = (props) => {
   // return  <Redirect to="/login" />
   return props.loggedIn ? <Tabs /> : <Redirect to="/login" />
};

export default connector(HomeOrLogin);