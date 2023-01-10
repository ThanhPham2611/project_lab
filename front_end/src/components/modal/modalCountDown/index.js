import React, { useEffect, useState } from "react";
import { Modal, Result } from "antd";

const ModalCountDown = ({ isModal, setIsModal }) => {
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(countTimer, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  const countTimer = () => {
    setCountDown((prev) => {
      const timeDecre = prev - 1;
      if (prev === 0) {
        return 0;
      }
      return timeDecre;
    });
  };

  return (
    <Modal open={isModal} footer={false}>
      <Result
        status="success"
        title={`Your password has been sent in the mail, go to the login page after ${countDown}s`}
      />
    </Modal>
  );
};

export default ModalCountDown;
