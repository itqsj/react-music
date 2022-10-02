export interface ResSearchHotInt {
    code: number;
    data: SearchHotInt[];
    message: string;
}

export interface SearchHotInt {
    alg: string;
    content: string;
    iconType: number;
    iconUrl: string;
    score: number;
    searchWord: string;
    source: number;
    url: string;
}
