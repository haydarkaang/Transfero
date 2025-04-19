export type FileCategory = 'image' | 'video' | 'audio' | 'other';

export type FileInfo = {
    path: string,
    name: string,
    type: string,
    category: FileCategory,
    size: number,
    key: number,
}