import React from "react";
import { Modal, Divider } from "antd";
import i18n from "i18next";

import iconEngland from "../../../assets/images/icon/united-kingdom.png";
import iconVietNam from "../../../assets/images/icon/vietnam.png";

import styles from "./language.module.scss";

const ModalLanguage = ({ isModalVisible, setIsModalVisible }) => {
  const onCancel = () => {
    setIsModalVisible(false);
  };

  const changeLangage = (value) => {
    i18n.changeLanguage(value);
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Change Language"
      open={isModalVisible}
      onCancel={onCancel}
      footer={null}
      className="modalLanguage"
    >
      <div className={styles.wrapperLanguage}>
        <div className={styles.wrapperIcon} onClick={() => changeLangage("vi")}>
          <img
            className={styles.iconLanguage}
            src={iconVietNam}
            alt="vietnam flag"
          />
        </div>
        <Divider />
        <div className={styles.wrapperIcon} onClick={() => changeLangage("en")}>
          <img
            className={styles.iconLanguage}
            src={iconEngland}
            alt="england flag"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalLanguage;
