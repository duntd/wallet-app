export interface IBaseRes {
  readonly error: boolean;
}
export interface IDataWrapperRes<T> extends IBaseRes {
  error: boolean;
  message?: any;
  readonly data: T;
}

export type ErrorData = IDataWrapperRes<null>;
export type ErrorHandler = (error: ErrorData) => void;

export interface IDataWrapperTotalRes<T> extends IBaseRes {
  error: boolean;
  message: any;
}
