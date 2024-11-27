// src/utils/handleError.ts
import { AxiosError } from 'axios';

export const handleError = (error: AxiosError): string => {
    if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        const message = (axiosError.response?.data as { message: string })?.message || 'An unexpected error occurred!';
        return message;
    }
    return 'An unexpected error occurred!';
};
