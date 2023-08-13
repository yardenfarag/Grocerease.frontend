import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const isDarkMode = useSelector((state: RootState) => state.settings.isDarkMode)
  
  React.useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode]);

  return <>{children}</>
};

export default DarkModeProvider
