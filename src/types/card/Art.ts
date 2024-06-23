export interface CardArtData {
    data: {
        id: number;
        attributes: {
            name: string; // filename
            alternativeText: null;
            caption: null;
            width: number;
            height: number;
            formats: Record<ArtSize, ArtFormat>;
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: null;
            provider: string;
            provider_metadata: null;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export enum ArtSize {
    CARD = "card",
    XSMALL = "xsmall",
    XXSMALL = "xxsmall",
    XXXSMALL = "xxxsmall",
    THUMBNAIL = "thumbnail",
}

interface ArtFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
}
