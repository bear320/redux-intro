export type CustomerState = {
  fullName: string;
  nationalId: string;
  createdAt: string;
};

export type CustomerAction =
  | {
      type: "customer/create";
      payload: { fullName: string; nationalId: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };
