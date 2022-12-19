import { Avatar, Col, Image, Modal, Row, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

//locale
import { formatDate } from "../../../utils";

//icon
import { UserOutlined } from "@ant-design/icons";

//styles
import styles from "./modalViewUser.module.scss";
import { EOffice, ERole } from "../../../utils/role";
import { useTranslation } from "react-i18next";

const responsive = {
  xxl: 12,
  xl: 12,
  md: 12,
  lg: 12,
  sm: 12,
  xs: 24,
};

const detailResponsive = {
  xxl: 7,
  xl: 8,
  md: 9,
  lg: 8,
  sm: 24,
  xs: 10,
};

const ModalViewUser = ({ isModal, setIsModal }) => {
  //redux
  const { detailUser } = useSelector((state) => state.userInfo);

  //translation
  const { t } = useTranslation("common");

  const handleCancel = () => {
    setIsModal(false);
  };

  return (
    <Modal
      title={t("modal_view_user.title_modal")}
      open={isModal}
      onCancel={handleCancel}
      footer={false}
      className="view_user"
    >
      <Spin tip={t("ults.spin_loading")} spinning={!detailUser}>
        <Row justify="center" className={styles.rowDetail}>
          <Avatar
            size={100}
            src={detailUser.avatarUrl && <Image src={detailUser.avatarUrl} />}
            icon={!detailUser.avatarUrl && <UserOutlined />}
            alt={t("modal_view_user.alt_image")}
            height={100}
          />
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.user_name")}: </label>
              </Col>
              <Col>
                <span>{`${detailUser.firstName} ${detailUser.lastName}`}</span>
              </Col>
            </Row>
          </Col>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.birthday")}: </label>
              </Col>
              <Col>
                <span>{moment(detailUser.birthday).format(formatDate)}</span>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.email")}: </label>
              </Col>
              <Col>
                <span>{detailUser.email}</span>
              </Col>
            </Row>
          </Col>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.is_change_pass")}: </label>
              </Col>
              <Col>
                <span>
                  {detailUser.isChangePassword
                    ? t("modal_view_user.changed")
                    : t("modal_view_user.no_change")}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.major")}: </label>
              </Col>
              <Col>
                <span>{detailUser.majors || "Null"}</span>
              </Col>
            </Row>
          </Col>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.office")}: </label>
              </Col>
              <Col>
                <span>
                  {detailUser.office === EOffice.admin
                    ? t("ults.admin")
                    : detailUser.office === EOffice.student
                    ? t("ults.student")
                    : t("ults.teacher")}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label>{t("modal_view_user.phone")}: </label>
              </Col>
              <Col>
                <span>{`0${detailUser.phone}`}</span>
              </Col>
            </Row>
          </Col>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label className={styles.labelContent}>
                  {t("modal_view_user.role")}:{" "}
                </label>
              </Col>
              <Col>
                <span>
                  {detailUser.role === ERole.admin
                    ? t("ults.admin")
                    : t("ults.user")}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label className={styles.labelContent}>
                  {t("modal_view_user.create_date")}:{" "}
                </label>
              </Col>
              <Col>
                <span>{moment(detailUser.createdAt).format(formatDate)}</span>
              </Col>
            </Row>
          </Col>
          <Col {...responsive}>
            <Row>
              <Col {...detailResponsive}>
                <label className={styles.labelContent}>
                  {t("modal_view_user.update")}:{" "}
                </label>
              </Col>
              <Col>
                <span>{moment(detailUser.updatedAt).format(formatDate)}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default ModalViewUser;
