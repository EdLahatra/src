import models from '../../data/models';

const mapStateToProps = (state: any) =>
  Object.keys(models).reduce((acc, curr) => ({...acc, [curr]: state[curr]}), {
    location: state.location,
    initial: state.initial,
  });

export default mapStateToProps;
