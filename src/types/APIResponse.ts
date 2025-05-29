export type APIResponse<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    errors: string[];
};