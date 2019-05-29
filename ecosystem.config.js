module.exports = {
  apps: [{
    name: 'Product-Display',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-216-220-130.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/Product-Display.pem',
      ref: 'origin/master',
      repo: 'git@github.com:MasonHN/Product-Display.git',
      path: '/home/ubuntu/Product-Display2/',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}