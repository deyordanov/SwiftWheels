export type PropTypes = {
    images: Array<CarImage>;
    isPreview: boolean;
    car: Car;
};

export type Car = {
    "car-extras": string[];
    "car-images": CarImage[];
    "car-favorites": string[];
    "car-type": string;
    "car-make": string;
    "car-transmission": string;
    "car-condition": string;
    "car-fuel-type": string;
    "car-engine-type": string;
    "car-drive-type": string;
    "car-shop-address": string;
    "car-model": string;
    "car-color": string;
    "car-engine-size": string;
    "car-doors": number;
    "car-technical-description": string;
    "car-year": number;
    "car-horsepower": number;
    "car-km": number;
    "car-rating": number;
    "car-price": number;
    userId: string;
    userEmail: string;
    _createdOn: number;
    _id: string;
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
