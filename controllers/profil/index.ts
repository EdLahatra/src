/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

export interface Etablishment {
  _id: string;
  typeId: number;
  name: string;
  etablishmentAddress: string;
  managerFullName: string;
  managerAddress: string;
  phone: string;
  siret: string;
  iban: string;
  currency: string;
  // commission: number,
  logo: string;
  presentation: string;
  offers: string;
  heure: [
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
  ];
  deliveryLocation: [
    {label: any},
    {label: any},
    {label: any},
    {label: any},
    {label: any},
    {label: any},
    {label: any},
  ];
  dayDelivery: string;
  cover: string;
  note: string;
  services: any;
  dietetiques: any;
  active?: boolean;
  tva?: boolean;
}

export interface Address {
  label: string;
  roadNumber: string;
  road: string;
  zipCode: string;
  city: string;
  country: string;
  longitude: string;
  latitude: string;
}

export interface IProps {
  addEtablishment: (data: Etablishment, arg: any) => Promise<void>;
  addDish: (data: any) => Promise<void>;
  getAddress: (_: any, res: any) => Promise<void>;
  getAllDish: () => Promise<void>;
  getEtablishAddress: (_: any, res: any) => Promise<void>;
  getByIDEtablishment: (_: any, res: any) => Promise<void>;
  addAddress: (data: any, cb: any) => Promise<void>;
  setEtablishAddress: (data: any) => Promise<void>;
  navigation: any;
  etablishment: Etablishment;
  session: any;
  setModeSession: any;
  route: any;
}

export default (props: IProps, langues: any) => {
  const {
    setEtablishAddress,
    getAddress,
    navigation,
    session,
    setModeSession,
    addEtablishment,
    getByIDEtablishment,
    addAddress,
  } = props;
  const [mode, setMode] = useState('');
  const [message, setMessage] = useState({type: '', message: ''});
  let errors = {};

  const [etablishmentState, setEtablishmentState] = useState<Etablishment>({
    _id: '',
    typeId: 0,
    name: '',
    etablishmentAddress: '',
    managerFullName: '',
    managerAddress: '',
    phone: '',
    siret: '',
    iban: '',
    currency: 'CHF',
    // commission: 0,
    logo: '',
    presentation: '',
    offers: '',
    heure: ['08', '00', '18', '30'],
    deliveryLocation: [
      {label: ''},
      {label: ''},
      {label: ''},
      {label: ''},
      {label: ''},
      {label: ''},
      {label: ''},
    ],
    dayDelivery: '',
    cover: '',
    note: '',
    services: [],
    dietetiques: [],
    tva: false,
  });

  const [addressState, setAddressState] = useState<Address>({
    label: '',
    roadNumber: '',
    road: '',
    zipCode: '',
    city: '',
    country: '',
    longitude: '',
    latitude: '',
  });

  useEffect(() => {
    // getEtablishAddress({}, (res: any) => {
    // 	// if(res && res._id) {
    // 	// 	setAddressState(res);
    // 	// }
    // });
    getAddress({}, (res: any) => {
      if (res && res._id) {
        setAddressState(res);
      }
    });
    setMode(
      session.mode !== 1
        ? langues.profil.go_acount
        : langues.profil.mode_client,
    );
  }, []);

  function goToInscription(cb: any) {
    if (session.mode === 0) {
      getByIDEtablishment({}, (res: any) => {
        cb && cb();
        if (res && res.etablishment && res.etablishment._id) {
          setData(res.etablishment);
          navigation.navigate('Inscription_resoto', {id: res.etablishment._id});
        } else {
          navigation.navigate('Inscription_resoto', {id: 'add'});
        }
      });
    } else {
      setModeSession({mode: 0});
    }
  }

  function setData(data: any) {
    if (data && data._id) {
      setEtablishmentState(data);
    }
  }

  function setSessionTypeController(cb: any) {
    setMessage({type: '', message: ''});
    const {currency, iban, name, phone, presentation, siret} =
      etablishmentState;
    const isOK = Object.values({
      // cover,
      currency,
      iban,
      // logo,
      // note,
      name,
      phone,
      presentation,
      siret,
    }).some((value: string) => !(value && value.toString().length > 0));

    if (!isOK) {
      addEtablishment(etablishmentState, (res: any) => {
        typeof cb === 'function' && cb(res);
        if (res && res._id) {
          setMessage({type: 'success', message: 'Modification réussie'});
        }
      });
    } else {
      typeof cb === 'function' && cb();
      setMessage({type: 'error', message: 'Informations incomplètes'});
    }
  }

  const updateImages = (data: any, cb: any) => {
    setMessage({type: '', message: ''});
    addEtablishment(data, (res: any) => {
      typeof cb === 'function' && cb();
      if (res && res._id) {
        setMessage({type: 'success', message: 'Modification réussie'});
      }
    });
  };

  function sentAddress(cb: any) {
    addAddress(addressState, (_res: any) => {
      cb();
    });
  }

  function sendEtablishAddress(address: Address) {
    setEtablishAddress(address);
  }

  return {
    message,
    addEtablishment,
    mode,
    etablishmentState,
    setEtablishmentState,
    setSessionTypeController,
    goToInscription,
    setAddressState,
    sentAddress,
    sendEtablishAddress,
    updateImages,
    errors,
  };
};

export const reduxConnect = (component: any) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
