export interface Response {
  success: boolean;
  message: string;
}

export type ResponseWithData<T> = Response & {
  data: T;
};
