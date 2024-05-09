export const appConfig = {
  port: Number(process.env.PORT) || 3000,
  secretSalt: Number(process.env.SECRET_SALT),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}
