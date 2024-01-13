export interface IConfigState {
  loading: ILoading;
  modal: IModal;
  popUp: IPopUp;
  toast: IToast;

  badge: boolean;
}

export interface ILoading {
  isLoading: boolean;
  children?: JSX.Element;
}
export interface IModal {
  open: boolean;
  children?: JSX.Element;
}
export interface IPopUp {
  open: boolean;
  children?: JSX.Element;
}

export interface IToast {
  open: boolean;
  children?: JSX.Element;
}
