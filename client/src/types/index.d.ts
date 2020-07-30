export interface LogInValuesType {
  email: string;
  password: string;
}

export interface SignUpValuesType extends LogInValuesType {
  username: string;
  name: string;
}

export interface ValidationErrorsLogInType {
  email?: string;
  password?: string;
}

interface ValidationErrorsSignUpType extends ValidationErrorsLogInType {
  username?: string;
  name?: string;
}

type PathType<T> = keyof T;

export interface ErrorType {
  path: PathType<SignUpValuesType>[];
  message: string;
  type: string;
  context: {
    key: string;
    label: string;
    value: string;
  };
}
