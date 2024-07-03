// types/ckeditor.d.ts
declare module '@ckeditor/ckeditor5-build-classic' {
    const ClassicEditorBuild: any;
    export = ClassicEditorBuild;
}

declare module '@ckeditor/ckeditor5-react' {
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { ComponentType } from 'react';

    export interface CKEditorProps {
        editor: typeof ClassicEditor;
        data?: string;
        config?: any;
        onReady?: (editor: ClassicEditor) => void;
        onChange?: (event: Event, editor: ClassicEditor) => void;
        onBlur?: (event: Event, editor: ClassicEditor) => void;
        onFocus?: (event: Event, editor: ClassicEditor) => void;
    }

    const CKEditor: ComponentType<CKEditorProps>;
    export { CKEditor };
}