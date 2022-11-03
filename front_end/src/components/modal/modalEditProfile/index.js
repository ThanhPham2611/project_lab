import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Spin,
  Upload,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//local
import { patch } from "../../../services/axios/baseAPI";
import { storage } from "../../../services/firebase";

//icon
import { UserOutlined } from "@ant-design/icons";

//scss
import styles from "./editProfile.module.scss";
import { userInfo } from "../../../store/modules/usersSlices";
import { useTranslation } from "react-i18next";

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

  //translation
  const { t } = useTranslation("common");

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
      message.error(t("modal_edit_profile.mess_image_format"));
    }

    const isLt1M = file.size / 1024 / 1024 < 5;

    if (!isLt1M) {
      message.error(t("modal_edit_profile.mess_image_size"));
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
      title={t("modal_edit_profile.title_edit_profile")}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin
        tip={t("modal_edit_profile.loading_change")}
        spinning={isPatchingInfo}
      >
        <div className={styles.wrapperImg}>
          <ImgCrop
            beforeCrop={beforeUploadThumb}
            modalClassName="cropImg"
            maxZoom={5}
            aspect={1 / 1}
            modalTitle={t("modal_edit_profile.edit_image")}
            modalOk={t("modal_edit_profile.btn_save_change")}
            modalCancel={t("modal_edit_profile.btn_cancel_drop")}
          >
            <Upload
              beforeCrop={beforeUploadThumb}
              name="banner"
              showUploadList={false}
              maxCount={1}
              onChange={handleChange}
            >
              {imgPrev ? (
                <img src={imgPrev} alt="img_edit" className={styles.img_edit} />
              ) : (
                <Avatar size={80} icon={<UserOutlined />} />
              )}
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
                {t("modal_edit_profile.btn_change_edit")}
              </Button>
              <Button className="btn cancel" onClick={handleCancel}>
                {t("modal_edit_profile.btn_cancel")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalEditProfile;
