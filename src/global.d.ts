type BaseComponentClassProps<T> = {
    containerStyles?: {[key: string]: string };
} & T;

type BaseComponentProps<T> = {
    key?: string;
    styles?: BaseComponentClassProps;
} & T;