export interface IAuthSuccessResponse {
  message: string;
  user: {
    userId: number;
    email: string;
  };
}
