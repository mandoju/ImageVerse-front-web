export interface Image {
    id: number;
    title: string;
    url: string;
    likesCount: number;
    dislikesCount: number;
    creationDate: string;
    liked?: boolean;
    disliked?: boolean;
}
