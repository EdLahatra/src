import {useEffect} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../services/redux/mapStateToProps';

export interface IProps {}

export default (props: IProps) => {
  const {} = props;

  useEffect(() => {}, []);

  return {};
};

export const reduxConnect = (component: any) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
