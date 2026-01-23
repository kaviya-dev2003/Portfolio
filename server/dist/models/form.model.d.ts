export declare const FormModel: {
    create: (data: {
        name: string;
        email: string;
        socialMedia?: string;
        message: string;
    }) => Promise<import("mysql2").QueryResult>;
    findAll: () => Promise<import("mysql2").QueryResult>;
};
//# sourceMappingURL=form.model.d.ts.map