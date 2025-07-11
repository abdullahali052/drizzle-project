import {
  comparePassword,
  createUser,
  generateToken,
  getUserByEmail,
  hashPassword,
} from "../services/auth.service.js";

export const getRegisterPage = (req, res) => {
  if (req.user) res.redirect("/");
  return res.render("auth/register", { errors: req.flash("errors") });
};

export const getLoginPage = (req, res) => {
  if (req.user) res.redirect("/");
  return res.render("auth/login");
};

export const postRegister = async (req, res) => {
  if (req.user) res.redirect("/");
  const { name, email, password } = req.body;

  const userExists = await getUserByEmail(email);

  if (userExists) {
    req.flash("errors", "User Already Exists");
    res.redirect("/register");
  }

  const hashedPassword = await hashPassword(password);

  const [user] = await createUser({ name, email, password: hashedPassword });

  res.redirect("/login");
};
export const postLogin = async (req, res) => {
  if (req.user) res.redirect("/");
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) res.redirect("/login");

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) res.redirect("/login");

  const token = await generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.cookie("access_token", token);

  res.redirect("/");
};

export const getMe = (req, res) => {
  if (!req.user) return res.send("Not Logged In");
  return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);
};

export const LogOut = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
};
