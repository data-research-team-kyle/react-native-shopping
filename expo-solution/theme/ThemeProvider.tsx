import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { lightColors, darkColors } from './colors';

interface ThemeContextType {
  dark: boolean;
  colors: typeof lightColors;
  setScheme: (scheme: 'light' | 'dark') => void;
}

const defaultThemeContext: ThemeContextType = {
  dark: false,
  colors: lightColors,
  setScheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

// define ThemeProviderProps using ReactNode
// Using ReactNode as a type in your TypeScript code ensures that you can pass any valid React child to a component. 
// This is particularly useful for defining the children prop in a component, as it allows for a flexible and type-safe way to handle the content that will be rendered inside the component.
// For example, in a ThemeProvider component, you might use ReactNode to type the children prop, ensuring that any valid React content can be passed and rendered within the provider. This helps maintain type safety and improves the developer experience by providing better autocompletion and error checking in your IDE.

interface ThemeProviderProps {
  children: ReactNode;
}

// React.FC stands for "React Functional Component." 
// It is a type provided by the @types/react package that helps define a component as a functional component. 
// This type automatically includes the typing for the children prop, which is a common prop in React components used to pass nested elements.
// ThemeProviderProps is a custom type or interface that you define elsewhere in your code. This type specifies the shape and types of the props that the ThemeProvider component expects to receive. By using ThemeProviderProps, you ensure that the component receives the correct props and that TypeScript can provide type checking and autocompletion.
// When you combine React.FC with ThemeProviderProps, you are explicitly stating that the ThemeProvider component is a functional component that expects props conforming to the ThemeProviderProps type. This helps maintain type safety and improves the developer experience by catching potential errors at compile time and providing better tooling support in your IDE.

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme: ThemeContextType = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: 'light' | 'dark') => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);