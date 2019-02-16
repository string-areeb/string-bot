declare const _default: {
    getToken(refresh?: boolean): Promise<string | null>;
    releaseToken(): void;
    setCredentials(login: string | undefined, pass: string | undefined): void;
};
export = _default;
