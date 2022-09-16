export interface PostType {
    id: number;
    userId: number;
    title: string;
    body: string;
    onDelete: (id:number) => void;
}

export interface UserType {
    id?: number;
    email?: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface ModalType {
    isOpen: boolean;
    onClose: () => void;
}