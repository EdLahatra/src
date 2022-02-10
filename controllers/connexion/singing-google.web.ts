import {useEffect} from 'react';

export default () => {
  useEffect(() => {
    return () => {};
  }, []);

  const singingGmail = async () => {
    return {email: '', familyName: '', name: '', photo: ''};
  };

  return {
    singingGmail,
  };
};
