module.exports = {
  apps: [{
    name: 'frontend',
    script: 'yarn',
    args: 'start:production --port=3001',
    env: {
      NODE_ENV: 'production',
      PORT: '3001',
    },
  }],
};
