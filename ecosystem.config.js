module.exports = {
  apps: [
    {
      name: 'app',
      script: './src/server.js',
      instances: 1, // Pode ser um número específico ou 'max' para usar todos os núcleos disponíveis

      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    // {
    //   name: 'worker',
    //   script: 'worker.js',
    // },
  ],
}
