'use client';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = makeStore();
  const perisitor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={perisitor}>{children}</PersistGate>
    </Provider>
  );
}
