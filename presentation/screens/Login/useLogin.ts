import {useState} from 'react';
import {post, put} from '../../../services/technique/api';

export const useLogin = ({
  signinUtilisateur,
  inscriptionUtilisateur,
  navigation,
}) => {
  const [page, setPage] = useState('signin');
  const [email, setEmail] = useState('herypaslie.dell@gmail.com');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
  const [nom, setNom] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('azerty123');
  const [password1, setPassword1] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [showValidation, setshowValidation] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const signin = page === 'signin';

  const toSignin = () => {
    setMessage('');
    setLoading(true);
    if (signin) {
      signinUtilisateur(
        {email, password},
        ({accessToken, refreshToken, utilisateur, message}) => {
          setLoading(false);
          if (accessToken && refreshToken && utilisateur) {
            navigation.navigate('HomeScreen');
          } else if (message === 'Utilisateur inactif') {
            setshowValidation(true);
          } else if (message === 'Email non trouvé dans la base') {
            setMessage(message);
          }
        },
      );
    } else {
      inscriptionUtilisateur(
        {email, password, ville, adresse, nom},
        (res: any) => {
          console.log({res});
          setLoading(false);
          setshowValidation(true);
        },
      );
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setError('');
    if (forgot) {
      const res = await post('authentification/reset-password', {
        email,
      });
      setLoading(false);
      console.log({res});
      if (res?.data === true) {
        setError('');
        setError('Un lien a été envoyé dans votre e-mail');
        // navigation.goBack();
      } else {
        setError('E-mail incorrect');
      }
    } else {
      const res = await put('users/to-active', {email, code});
      setLoading(false);
      console.log({res});
      if (res?.data === true) {
        setError('');
        setshowValidation(false);
        setCode('');
        // navigation.goBack();
      } else {
        setError('Le code est incorrect.');
      }
    }
  };

  const sendCode = async () => {
    const res = await put('inscription/code', {email});
    console.log({res});
  };

  return {
    page,
    setPage,
    email,
    setEmail,
    ville,
    setVille,
    adresse,
    setAdresse,
    nom,
    setNom,
    code,
    setCode,
    password,
    setPassword,
    password1,
    setPassword1,
    loading,
    setLoading,
    forgot,
    setForgot,
    showValidation,
    setshowValidation,
    message,
    setMessage,
    error,
    setError,
    toSignin,
    resetPassword,
    sendCode,
  };
};
