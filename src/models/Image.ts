export interface Image {
    id: number;
    title: string;
    url: string;
    likesCount: number;
    dislikesCount: number;
    createdAt: string;
    liked?: boolean;
    disliked?: boolean;
    User: {
        id: number;
        name: string;
    };
}
