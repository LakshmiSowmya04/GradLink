const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 3600000, // Expires in 1 hour
  sameSite: "Lax",
};

export default cookieOptions;
