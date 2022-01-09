import '../styles/globals.css'
import '../styles/properties.css'
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];