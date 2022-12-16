export const viteFinal = (defaultConfig, options) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: 'es2020',
      rollupOptions: {
        external: ['@qwik-city-sw-register', '@qwik-city-plan'],
      },
    },
  });

  return config;
};
