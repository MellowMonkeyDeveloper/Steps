module.exports = {
    apps: [
      {
        name: 'doprod',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        cwd: '/var/www/doprod',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'local',
          PORT: 3000
        },
        env_production: {
          NODE_ENV: 'local'
        }
      }
    ]
  };
