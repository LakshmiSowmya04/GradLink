const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 3600000, // Expires in 1 hour
  sameSite: "Lax",
};

module.exports = cookieOptions;
