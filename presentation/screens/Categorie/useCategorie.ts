import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

export default ({
  getAllCategorie,
  categorie,
  getAllServices,
  services,
  getAllSous_categorie,
  sous_categorie,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [categorie_sous, setCategorieSous] = useState({nom: ''});
  const [service, setService] = useState('');
  const [selected, setSelected] = useState<any>({});
  const {params} = useRoute();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (params?.id?.length > 10 && categorie?.items) {
      // @ts-ignore
      const item = categorie?.items?.find(({id}) => params?.id === id) || {};
      setSelected(item);
    }
  }, [params]);

  const init = () => {
    setRefreshing(true);
    // @ts-ignore
    if (params?.id && categorie?.items) {
      // @ts-ignore
      const item = categorie?.items?.find(({id}) => params?.id === id) || {};
      setSelected(item);
    }
    getAllCategorie({}, res => {
      if (Array.isArray(res?.items)) {
        // @ts-ignore
        if (!res?.items.find(({id}) => params?.id === id)) {
          setSelected(res?.items[0]);
          navigation.setParams({id: res?.items[0]?.id});
        }
      }
    });
    getAllSous_categorie();
    getAllServices();
    setRefreshing(false);
  };

  const getService = (url = '') => {
    getAllServices(
      {},
      res => {
        console.log({res});
      },
      url,
    );
  };

  const list = categorie?.items;

  const services_list = services?.items || [];

  const sous_categorie_list = sous_categorie?.items || [];

  const categorie_list = sous_categorie_list.filter(
    ({categorie}) => categorie?._id === selected?.id,
  );

  return {
    setSelected,
    init,
    list,
    services_list,
    sous_categorie_list,
    categorie_list,
    getService,
    selected,
    refreshing,
    search,
    setSearch,
    service,
    setService,
    setRefreshing,
    categorie_sous,
    setCategorieSous,
  };
};
