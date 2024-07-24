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
      log_file: './logs/app.log', // Caminho para o arquivo de log
      out_file: './logs/out.log', // Caminho para o log padrão
      error_file: './logs/err.log', // Caminho para o log de erro
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Formato de data para logs
    },
    // {
    //   name: 'worker',
    //   script: 'worker.js',
    // },
  ],
}
