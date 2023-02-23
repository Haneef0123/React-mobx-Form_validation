import { useContext } from 'react';
import { createContext } from 'react';
import ValidationStore from '../stores/ValidationStore';

interface RootStore {
  validationStore: ValidationStore;
}

export const storesContext = createContext<RootStore | null>(null);

export const StoresProvider = storesContext.Provider;

const useStores = (): RootStore => {
  const stores = useContext(storesContext);
  if (!stores) {
    throw new Error('useStores must be used within a StoresProvider.');
  }
  return stores;
};

export default useStores;
