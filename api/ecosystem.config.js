module.exports = {
  apps: [
    {
      name: 'dayone-placer',
      script: './index.js',
      instances: 1,
      exec_mode: 'cluster',
      max_memory_restart: '128M',
      combine_logs: true,
    },
  ],
};
