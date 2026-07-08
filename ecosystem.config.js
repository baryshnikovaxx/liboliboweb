module.exports = {
  apps: [
    {
      name: "liboliboweb-ru",
      cwd: "/var/www/liboliboweb",
      script: "npm",
      args: "start",
      env: {
        PORT: 3101,
        NODE_ENV: "production",
      },
    },
    {
      name: "liboliboweb-me",
      cwd: "/var/www/liboliboweb-me",
      script: "npm",
      args: "start",
      env: {
        PORT: 3102,
        NODE_ENV: "production",
      },
    },
  ],
};
