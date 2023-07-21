import React, { useState } from "react";
import "./LoginModal.scss";
import Modal from "react-modal";
import SelectCountries from "./LoginModal-Components/SelectCountries";

const LoginModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Gender, setGender] = useState(undefined);
  const [RegisterModalIsOpen, RegisterIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeHandleRegister() {
    setIsOpen(false);
    openRegister();
  }
  function closeHandleLogin() {
    setIsOpen(true);
    closeRegister();
  }

  function openRegister() {
    RegisterIsOpen(true);
  }
  function closeRegister() {
    RegisterIsOpen(false);
  }
  return (
    <>
      <li onClick={openModal}>Sign In</li>
      <div>
        <Modal
          className="Modal"
          isOpen={modalIsOpen}
          closeTimeoutMS={500}
          onRequestClose={closeModal}
          style={customStyles}
          overlayClassName="Overlay"
        >
          <button className="absolute top-2 right-3" onClick={closeModal}>
            <i class="fa-solid fa-x"></i>
          </button>
          <div className="nike-unite-swoosh">
            <img
              src="https://s3.nikecdn.com/unite/app/912/images/swoosh_black.png"
              alt="nike"
            />
          </div>
          <div className="header-text">
            <span>
              FOR EVERYTHING ABOUT NIKE <br /> YOUR ACCOUNT
            </span>
          </div>
          <form>
            <div className="login-panel-form">
              <input required placeholder="E-posta adresi" type="text" />
              <input required placeholder="Şifre" type="password" />
              <span className="login-panel-desc">
                Sign in to Nike{" "}
                <a
                  href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=TR&language=tr&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
                  className="underline"
                >
                  Privacy Policy
                </a>
                'nı ve <br />{" "}
                <a
                  href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=TR&language=tr&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
                  className="underline"
                >
                  Terms of use
                </a>
                You accept the.
              </span>
              <button className="login-panel-button">SIGN IN</button>
              <span className="text-center mt-4 text-xs">
                SIGN IN{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={closeHandleRegister}
                >
                  Join us.
                </span>
              </span>
            </div>
          </form>
        </Modal>
        <Modal
          className="Modal"
          isOpen={RegisterModalIsOpen}
          onRequestClose={closeRegister}
          closeTimeoutMS={2000}
          style={customStyles}
          overlayClassName="Overlay"
        >
          <button className="absolute top-2 right-3" onClick={closeRegister}>
            <i class="fa-solid fa-x"></i>
          </button>
          <div className="nike-unite-swoosh">
            <img
              src="https://s3.nikecdn.com/unite/app/912/images/swoosh_black.png"
              alt="nike"
            />
          </div>
          <div className="header-text">
            <span>BECOME A NIKE MEMBER</span>
          </div>
          <form>
            <div className="register-panel-form">
              <input required placeholder="E-posta adresi" type="text" />
              <input required placeholder="Şifre" type="password" />
              <input required placeholder="Adı" type="text" />
              <input required placeholder="Soyadı" type="text" />
              <span className="text-center text-xs mt-2 text-gray-400">
                Earn a Nike Member Award on your Birthday every year.
              </span>
              <input required placeholder="gg/aa/yy" type="date" />
              <SelectCountries />
              <div className="flex gap-4 justify-center mt-4 items-center">
                {Gender}
                <button
                  type="button"
                  onClick={() => setGender(true)}
                  className={`${Gender ? "border-black" : ""
                    } border rounded-md py-2 w-full text-sm px-6`}
                >
                  <i
                    className={`${Gender ? "visible" : "hidden"
                      } fa-solid fa-check`}
                  ></i>{" "}
                  Male
                </button>{" "}
                <button
                  type="button"
                  onClick={() => setGender(false)}
                  className={`${Gender ? "" : "border-black"
                    } border rounded-md py-2 text-sm w-full px-6`}
                >
                  <i
                    className={`${Gender ? "hidden" : "visible"
                      } fa-solid fa-check`}
                  ></i>{" "}
                  Female
                </button>
              </div>
              <span className="register-panel-desc">
                Hesap oluşturarak Nike'ın{" "}
                <a
                  href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=TR&language=tr&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
                  className="underline"
                >
                  Privacy Policy
                </a>
                and <br />{" "}
                <a
                  href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=TR&language=tr&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
                  className="underline"
                >
                  Terms of use
                </a>
                You accept the.
              </span>
              <button className="register-panel-button">JOIN US</button>
              <span className="text-xs text-center mt-4">
                Already a member?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={closeHandleLogin}
                >
                  Sign In.
                </span>{" "}
              </span>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default LoginModal;
