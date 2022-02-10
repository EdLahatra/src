// import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../services/redux/mapStateToProps';

// type NavigationProps = StackNavigationProp<any, 'InscriptionScreen'>;

export interface IProps {
  // signinUsers: (
  //   arg0: {email: string; password: string},
  //   arg1: (res: any) => void,
  // ) => Promise<void>;
  // loginUsers: (user: any) => Promise<void>;
  // navigation: NavigationProps;
}

export default (props: IProps) => {
  // const {navigation, loginUsers} = props;

  useEffect(() => {
    console.log(props);
  });

  return {};
};

export const reduxConnect = (component: any) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
