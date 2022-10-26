import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Space, Spin, Upload } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//local
import { patch } from "../../../services/axios/baseAPI";
import { storage } from "../../../services/firebase";

//scss
import styles from "./editProfile.module.scss";
import { userInfo } from "../../../store/modules/usersSlices";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ModalEditProfile = ({
  isModalVisible,
  setIsModalVisible,
  linkAvatar,
}) => {
  //redux
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userInfo);

  //form
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      facebook: userData.facebook,
      tiktok: userData.tiktok,
      instagram: userData.instagram,
    });
  }, [userData]);

  //state
  const [imgPrev, setImgPrev] = useState(linkAvatar);
  const [fileSource, setFileSource] = useState();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImgPrev(linkAvatar);
  };

  const onFinish = (value) => {
    if (!fileSource) return;
    const storageRef = ref(storage, fileSource?.name);
    const uploadAvatar = uploadBytesResumable(storageRef, fileSource);

    uploadAvatar.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadAvatar.snapshot.ref).then((downloadURL) => {
          const newData = {
            ...value,
            avatarUrl: downloadURL,
          };
          changeInfo(newData);
        });
      }
    );
  };

  const patchChangeInfo = (data) => patch(`updateInfo`, data);

  const { mutate: changeInfo, isLoading: isPatchingInfo } = useMutation(
    patchChangeInfo,
    {
      onSuccess: (data) => {
        message.success(data.message);
        setIsModalVisible(false);
        form.resetFields();
        dispatch(userInfo());
      },
      onError: (error) => {},
    }
  );

  const beforeUploadThumb = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("The image needs to be in jpg or png format");
    }

    const isLt1M = file.size / 1024 / 1024 < 5;

    if (!isLt1M) {
      message.error("Maximum image size is < 5mb");
    }

    return isJpgOrPng && isLt1M;
  };

  const handleChange = (target) => {
    setFileSource(target.file.originFileObj);
    if (target.file?.percent === 100) {
      getBase64(target.file.originFileObj, (url) => {
        setImgPrev(url);
      });
    }
  };

  return (
    <Modal
      title="Edit profile"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin tip="Change profile......" spinning={isPatchingInfo}>
        <div className={styles.wrapperImg}>
          <ImgCrop
            beforeCrop={beforeUploadThumb}
            modalClassName="cropImg"
            maxZoom={5}
            aspect={1 / 1}
            modalTitle={"Edit image"}
            modalOk={"Save change"}
            modalCancel={"Cancel"}
          >
            <Upload
              beforeCrop={beforeUploadThumb}
              name="banner"
              showUploadList={false}
              maxCount={1}
              onChange={handleChange}
            >
              <img src={imgPrev} alt="img_edit" className={styles.img_edit} />
            </Upload>
          </ImgCrop>
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
              <Button className="btn editProfile" htmlType="submit">
                Change edit
              </Button>
              <Button className="btn cancel" onClick={handleCancel}>
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
