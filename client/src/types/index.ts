export interface LogInValuesType {
  email: string;
  password: string;
}

export interface SignUpValuesType extends LogInValuesType {
  username: string;
  name: string;
}

type ValueType = keyof SignUpValuesType;

export type ValidationErrorsType = Partial<Record<ValueType, string>>;

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
