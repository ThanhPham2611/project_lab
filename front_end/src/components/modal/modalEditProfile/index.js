import React from "react";
import { Button, Form, Input, Modal, Space, Spin } from "antd";

//scss
import styles from "./editProfile.module.scss";

const ModalEditProfile = ({
  isModalVisible,
  setIsModalVisible,
  linkAvatar,
}) => {
  //form
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <Modal
      title="Edit profile"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin tip="Edit profile......" spinning={false}>
        <div className={styles.wrapperImg}>
          <img src={linkAvatar} alt="img_edit" className={styles.img_edit} />
        </div>

        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item label="Facebook" name="facebook">
            <Input className={styles.form_input} placeholder="Link facebook" />
          </Form.Item>
          <Form.Item label="Tiktok" name="tiktok">
            <Input className={styles.form_input} placeholder="Link tiktok" />
          </Form.Item>
          <Form.Item label="Instagram" name="instagram">
            <Input className={styles.form_input} placeholder="Link instagram" />
          </Form.Item>

          <Form.Item>
            <Space className={styles.btnGroup}>
              <Button className={`${styles.btn} ${styles.changeEdit}`}>
                Change edit
              </Button>
              <Button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalEditProfile;
