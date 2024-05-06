export type CreateTodoType = {
    title: string;
    description?: string;
    imagePath?: string;
};

export type UpdateTodoType = {
    title?: string;
    description?: string;
    status?: 'pending' | 'completed';
    imagePath?: string;
};
