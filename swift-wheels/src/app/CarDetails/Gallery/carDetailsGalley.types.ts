export type PropTypes = {
    images: Array<CarImage>;
    isPreview: boolean;
    car: any;
};

export type CarImage = {
    fileName: string;
    name: string;
    fileSize: number;
    size: number;
    fileKey: string;
    key: string;
    fileUrl: string;
    url: string;
};
