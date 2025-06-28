
// number ProperType<T> = string | number | boolean | ClassProperty | Array<T> | { [key: string]: ProperType<T> };

type ClassProperty = {
    name: string;
    type: ProperType;
    nullable?: boolean;
    access?: 'public' | 'private' | 'protected';
}

type ClassMethod<T> = {
    name: string;
    parameters: Array<Omit<ClassProperty<T>, 'access'>>;
    returnType: ClassProperty<T>;
}

type Class = {
    name: string;
    properties: Array<ClassProperty>;
    methods?: Array<ClassMethod>;
}

type ClassProps = BaseComponentProps<{
    class: Class;
}>;