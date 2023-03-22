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

export const optionRoom = [
  {
    value: 1,
    label: "Tủ 1",
    children: [
      {
        value: 1,
        label: "Hàng 1",
      },
      {
        value: 2,
        label: "Hàng 2",
      },
      {
        value: 3,
        label: "Hàng 3",
      },
    ],
  },
  {
    value: 2,
    label: "Tủ 2",
    children: [
      {
        value: 1,
        label: "Hàng 1",
      },
      {
        value: 2,
        label: "Hàng 2",
      },
      {
        value: 3,
        label: "Hàng 3",
      },
    ]
  },
  {
    value: 3,
    label: "Tủ 3",
    children: [
      {
        value: 1,
        label: "Hàng 1",
      },
      {
        value: 2,
        label: "Hàng 2",
      },
      {
        value: 3,
        label: "Hàng 3",
      },
    ]
  }
];

export const EStatusRegister = {
  notApprove: 1,
  approve: 0,
  refuse: 2,
};

export const listStatusRegister = [
  {
    value: EStatusRegister.notApprove,
    label: "Đang chờ",
  },
  {
    value: EStatusRegister.approve,
    label: "Chấp nhận",
  },
  {
    value: EStatusRegister.refuse,
    label: "Từ chối",
  },
];

export const detailLocationDevice = (value1, value2) => {
  let nameCabinet;
  let nameRow;
  switch (value1) {
    case 1:
      nameCabinet = "Tủ 1";
      break;
    case 2:
      nameCabinet = "Tủ 2";
      break;
    default:
      nameCabinet = "Tủ 1";
      break;
  }
  switch (value2) {
    case 1:
      nameRow = "Hàng 1";
      break;
    case 2:
      nameRow = "Hàng 2";
      break;
    default:
      nameRow = "Hàng 1";
      break;
  }
  return `${nameCabinet}-${nameRow}`;
};

export const deviceStatus = (status) => {
  if (status === 0) {
    return 'Chưa được mượn'
  } else {
    return 'Đã được mượn'
  }
}

export const deviceRequest = (status) => {
  if (status === 1) {
    return 'Chưa được duyệt'
  } else {
    return 'Đã được duyệt'
  }
}