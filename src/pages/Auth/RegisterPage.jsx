import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";
import axios from 'axios';
import config from '../../config';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FaFacebookF } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const registerTranslations = {
  en: {
    title: "Register",
    welcome: "Welcome to Lorepa",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email",
    password: "Password",
    role: "Role",
    renter: "Renter",
    owner: "Owner",
    registerBtn: "Register",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    successToast: "Account created successfully!",
    failToast: "Registration failed",
    errorToast: "Something went wrong",
    googleSignupFail: "Google signup failed",
    facebookSignupFail: "Facebook signup failed",
    googleSelected: "Google account selected. Please fill the remaining details.",
    facebookSelected: "Facebook account selected. Please fill the remaining details."
  },
  es: {
    title: "Registrarse",
    welcome: "Bienvenido a Lorepa",
    continueWithGoogle: "Continuar con Google",
    continueWithFacebook: "Continuar con Facebook",
    fullName: "Nombre completo",
    phone: "Número de teléfono",
    email: "Correo electrónico",
    password: "Contraseña",
    role: "Rol",
    renter: "Inquilino",
    owner: "Propietario",
    registerBtn: "Registrarse",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    signIn: "Iniciar sesión",
    successToast: "¡Cuenta creada con éxito!",
    failToast: "Registro fallido",
    errorToast: "Algo salió mal",
    googleSignupFail: "Registro con Google fallido",
    facebookSignupFail: "Registro con Facebook fallido",
    googleSelected: "Cuenta de Google seleccionada. Por favor, rellene los detalles restantes.",
    facebookSelected: "Cuenta de Facebook seleccionada. Por favor, rellene los detalles restantes."
  },
  cn: {
    title: "注册",
    welcome: "欢迎来到 Lorepa",
    continueWithGoogle: "使用 Google 继续",
    continueWithFacebook: "使用 Facebook 继续",
    fullName: "全名",
    phone: "电话号码",
    email: "电子邮件",
    password: "密码",
    role: "角色",
    renter: "租客",
    owner: "业主",
    registerBtn: "注册",
    alreadyHaveAccount: "已有账户？",
    signIn: "登录",
    successToast: "账户创建成功！",
    failToast: "注册失败",
    errorToast: "出了点问题",
    googleSignupFail: "谷歌注册失败",
    facebookSignupFail: "Facebook 注册失败",
    googleSelected: "已选择谷歌账户。请填写剩余信息。",
    facebookSelected: "已选择 Facebook 账户。请填写剩余信息。"
  },
  fr: {
    title: "S'inscrire",
    welcome: "Bienvenue sur Lorepa",
    continueWithGoogle: "Continuer avec Google",
    continueWithFacebook: "Continuer avec Facebook",
    fullName: "Nom complet",
    phone: "Numéro de téléphone",
    email: "E-mail",
    password: "Mot de passe",
    role: "Rôle",
    renter: "Locataire",
    owner: "Propriétaire",
    registerBtn: "S'inscrire",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    signIn: "Se connecter",
    successToast: "Compte créé avec succès !",
    failToast: "Échec de l'inscription",
    errorToast: "Quelque chose a mal tourné",
    googleSignupFail: "Échec de l'inscription Google",
    facebookSignupFail: "Échec de l'inscription Facebook",
    googleSelected: "Compte Google sélectionné. Veuillez remplir les détails restants.",
    facebookSelected: "Compte Facebook sélectionné. Veuillez remplir les détails restants."
  },
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('renter');
  const nav = useNavigate();

  const [translations, setTranslations] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return registerTranslations[storedLang] || registerTranslations.en;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslations(registerTranslations[storedLang] || registerTranslations.en);
    };
    window.addEventListener('storage', handleStorageChange);
    const savedEmail = localStorage.getItem("socialEmail");
    const savedPass = localStorage.getItem("socialPassword");
    const savedName = localStorage.getItem("socialName");
    if (savedEmail && savedPass) {
      setEmail(savedEmail);
      setPassword(savedPass);
      if (savedName) setName(savedName);
    }
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.baseUrl}/account/register`, { name, phone, email, password, role });
      if (res.data?.status === 200) {
        localStorage.removeItem("socialEmail");
        localStorage.removeItem("socialPassword");
        localStorage.removeItem("socialName");
        localStorage.setItem('userId', res.data.data._id);
        toast.success(translations.successToast);
        setTimeout(() => nav("/"), 2000);
      } else {
        toast.error(res.data?.msg || translations.failToast);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || translations.errorToast);
    }
  };

  const handleGoogleSignup = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      localStorage.setItem("socialEmail", decoded.email);
      localStorage.setItem("socialPassword", decoded.sub);
      localStorage.setItem("socialName", decoded?.name || '');
      setEmail(decoded.email);
      setPassword(decoded.sub);
      setName(decoded?.name || '');
      toast.success(translations.googleSelected);
    } catch {
      toast.error(translations.googleSignupFail);
    }
  };

  const handleFacebookSignup = ({ data }) => {
    if (!data.email) {
      toast.error(translations.facebookSignupFail);
      return;
    }
    localStorage.setItem("socialEmail", data.email);
    localStorage.setItem("socialPassword", data.id);
    localStorage.setItem("socialName", data.name || '');
    setEmail(data.email);
    setPassword(data.id);
    setName(data.name || '');
    toast.success(translations.facebookSelected);
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-4 relative'>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className='lg:absolute -top-4 left-8'>
        <Link to={"/"}><img src={Logo} alt="logo" className='h-[8rem]' /></Link>
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className='p-6 sm:p-8 md:p-10 w-full max-w-md'>
        <motion.h2 variants={fadeInUp} className='text-xl mb-2'>{translations.title}</motion.h2>
        <motion.p variants={fadeInUp} className='text-sm mb-8'>{translations.welcome}</motion.p>

        <div className="flex flex-col gap-3 mb-6">
          <GoogleLogin onSuccess={handleGoogleSignup} onError={() => toast.error(translations.googleSignupFail)} />
          <LoginSocialFacebook
            appId="1463083271394413"
            fields="name,email,picture"
            onResolve={handleFacebookSignup}
            onReject={() => toast.error(translations.facebookSignupFail)}
          >
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-700 text-white rounded-md">
              <FaFacebookF /> {translations.continueWithFacebook}
            </button>
          </LoginSocialFacebook>
        </div>

        <motion.form onSubmit={handleRegister} className='space-y-6' variants={stagger}>
          <motion.div variants={fadeInUp}>
            <label className='block text-sm mb-1'>{translations.fullName}</label>
            <input type='text' required value={name} onChange={(e) => setName(e.target.value)}
              className='block w-full px-4 py-2 border border-gray-300 rounded-md' />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className='block text-sm mb-1'>{translations.phone}</label>
            <input type='tel' required value={phone} onChange={(e) => setPhone(e.target.value)}
              className='block w-full px-4 py-2 border border-gray-300 rounded-md' />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className='block text-sm mb-1'>{translations.email}</label>
            <input type='email' required value={email} disabled={!!localStorage.getItem("socialEmail")}
              onChange={(e) => setEmail(e.target.value)} className='block w-full px-4 py-2 border border-gray-300 rounded-md' />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className='block text-sm mb-1'>{translations.password}</label>
            <input type='password' required value={password} disabled={!!localStorage.getItem("socialPassword")}
              onChange={(e) => setPassword(e.target.value)} className='block w-full px-4 py-2 border border-gray-300 rounded-md' />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className='block text-sm mb-1'>{translations.role}</label>
            <select required value={role} onChange={(e) => setRole(e.target.value)}
              className='block w-full px-4 py-2 border border-gray-300 rounded-md bg-white'>
              <option value='renter'>{translations.renter}</option>
              <option value='owner'>{translations.owner}</option>
            </select>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <button type='submit' className='w-full py-2 px-4 text-white bg-blue-600 rounded-md'>{translations.registerBtn}</button>
          </motion.div>
        </motion.form>

        <motion.div variants={fadeInUp} className='mt-8 text-center text-sm'>
          <p>{translations.alreadyHaveAccount} <Link to={"/login"} className='text-blue-600 hover:text-blue-500'>{translations.signIn}</Link></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
