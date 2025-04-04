import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError, isAxiosError } from 'axios';
import { ContentModal } from '../ContentModal/ContentModal';

export const ErrorTypes = {
  None: 'none',
  Validate: 'validate',
  Server: 'server',
  NotFound: 'notFound',
  AccessDenied: 'accessDenied',
} as const;

export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes];

interface ErrorContextProps {
  ready: boolean;
  errorData?: ErrorData;
  onRemoveError?: () => void;
}

interface ErrorResponse {
  message: string;
}

interface ErrorsResponse {
  errors: {
    message: string;
  }[];
}

const ErrorContext = createContext<ErrorContextProps>({ ready: false });

export interface ErrorData {
  type: ErrorType;
  message?: string;
  status?: number | null;
  data?: any;
}

export interface IErrorProviderProps {
  children: ReactNode;
}

const setError = (
  type: ErrorType,
  axiosError: AxiosError,
  setErrorData: React.Dispatch<React.SetStateAction<ErrorData>>
) => {
  let message = (axiosError.response?.data as ErrorResponse)?.message;

  if (!message) {
    const errors = (axiosError.response?.data as ErrorsResponse)?.errors;
    if (errors && errors.length > 0) {
      message = errors.map((e) => e.message).join('\n');
    }
  }
  setErrorData({
    type: type,
    message: message ?? axiosError.message,
    status: axiosError.status,
    data: axiosError.response?.data,
  });
};

export const ErrorProvider: React.FC<IErrorProviderProps> = ({ children }) => {
  const [errorData, setErrorData] = useState<ErrorData>({ type: ErrorTypes.None });
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setIsLoading(true);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        if (response.status < 400) {
          setErrorData({ type: ErrorTypes.None });
          setIsLoading(false);
        }
        return response;
      },
      (error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError?.status && axiosError.status === 403) {
            setError(ErrorTypes.AccessDenied, axiosError, setErrorData);
          } else if (axiosError?.status && axiosError.status === 404) {
            setError(ErrorTypes.NotFound, axiosError, setErrorData);
          } else if (axiosError?.status && axiosError.status >= 400 && axiosError.status <= 499) {
            // Ошибка валидации
            setError(ErrorTypes.Validate, axiosError, setErrorData);
          } else if (axiosError?.status && axiosError?.status >= 500 && axiosError?.status <= 599) {
            // Ошибка сервера
            setError(ErrorTypes.Server, axiosError, setErrorData);
          } else if (!axiosError.response) {
            // Ошибка сети
            setErrorData({
              type: ErrorTypes.Server,
              message: 'Сервер не отвечает',
            });
          }
        } else {
          // Ошибка не от axios
          setErrorData({
            type: ErrorTypes.Server,
            status: error?.response?.status,
            message: error?.message ?? 'Неизвестная ошибка.',
            data: error?.response?.data,
          });
        }

        setIsLoading(false);
        return Promise.reject(error);
      }
    );
    setReady(true);

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  function handleRemoveError(): void {
    setErrorData({ type: ErrorTypes.None });
  }

  return (
    <ErrorContext.Provider value={{ ready: ready, errorData: errorData, onRemoveError: handleRemoveError }}>
      {isLoading && <ContentModal visible={isLoading}>Выполнение запроса...</ContentModal>}
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError должен использоваться внутри ErrorProvider');
  }
  return context;
};
