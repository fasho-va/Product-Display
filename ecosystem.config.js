module.exports = {
  apps: [{
    name: 'tutorial-2',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-216-220-130.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/Product-Display.pem',
      ref: 'origin/master',
      repo: 'git@github.com:MasonHN/Product-Display.git',
      path: '/home/ubuntu/Product-Display',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}