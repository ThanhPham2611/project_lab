export const formatDate = "YYYY-MM-DD";

export const formatDateHour = "YYYY-MM-DD HH:mm:ss";

export const listMajor = [
  {
    value: "TC",
    label: "TC",
  },
  {
    value: "TT",
    label: "TT",
  },
  {
    value: "TE",
    label: "TE",
  },
  {
    value: "TI",
    label: "TI",
  },
];

export const listDevices = [
  {
    code: "Adruino",
    label: "Adruino",
  },
  {
    code: "Cam bien",
    label: "Cam bien",
  },
  {
    code: "Test khi gas",
    label: "Test khi gas",
  },
];

export const EStatusRegister = {
  notApprove: 1,
  approve: 0,
  refuse: 2,
};

export const listStatusRegister = [
  {
    value: EStatusRegister.notApprove,
    label: "Not approve",
  },
  {
    value: EStatusRegister.approve,
    label: "Approve",
  },
  {
    value: EStatusRegister.refuse,
    label: "Refuse",
  },
];

export const detailLocationDevice = (value1, value2) => {
  let nameCabinet;
  let nameRow;
  switch (value1) {
    case 1:
      nameCabinet = "Cabinet 1";
      break;
    case 2:
      nameCabinet = "Cabinet 2";
      break;
    default:
      nameCabinet = "Cabinet 1";
      break;
  }
  switch (value2) {
    case 1:
      nameRow = "Row 1";
      break;
    case 2:
      nameRow = "Row 2";
      break;
    default:
      nameRow = "Row 1";
      break;
  }
  return `${nameCabinet}-${nameRow}`;
};
