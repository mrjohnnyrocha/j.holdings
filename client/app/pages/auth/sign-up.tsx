import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import SideBar from "@/SideBar/SideBar";
import FriendlyCaptcha from "@/FriendlyCaptcha/FriendlyCaptcha";
import styles from "../../styles/auth/sign-up.module.css";

const SignUp: React.FC = () => {
  const [providers, setProviders] = React.useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    companyName: '',
    password: '',
    repeatPassword: ''
  });
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Check if all mandatory fields are filled
    if (formData.firstName && formData.lastName && formData.email && formData.password && formData.repeatPassword) {
      setCaptchaVisible(true);
    } else {
      setCaptchaVisible(false);
    }
  };

  return (
    <div>
      <SideBar />
      <div className={styles.signUpContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/assets/j_logo.png"
            alt="j Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.oauthButtons}>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className={styles.button}
                >
                  <Image
                    src={`/assets/${provider.name.toLowerCase()}.svg`}
                    alt={provider.name}
                    width={20}
                    height={20}
                  />
                  Sign up with {provider.name}
                </button>
              ))}
          </div>
          <div className={styles.separator}>OR</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className={styles.inputContainer}>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label>Username (Optional)</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            </div>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputContainer}>
              <label>Company Name (Optional)</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
            </div>
            <div className={styles.inputContainer}>
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputContainer}>
              <label>Repeat Password</label>
              <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleInputChange} required />
            </div>
            {captchaVisible && (
              <div className={styles.captcha}>
                <FriendlyCaptcha />
              </div>
            )}
            <button type="submit" className={styles.authButton}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
