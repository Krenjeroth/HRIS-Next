// ckeditor-custom-build.ts
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';

export default class ClassicEditor extends ClassicEditorBase { }

ClassicEditor.builtinPlugins = [
    Essentials,
    Bold,
    Italic,
    Paragraph,
    FontColor,
    FontSize,
];

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'bold', 'italic', '|',
            'fontColor', 'fontSize', '|',
            'undo', 'redo'
        ]
    },
    fontColor: {
        colors: [
            {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black'
            },
            {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey'
            },
            {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey'
            },
            {
                color: 'hsl(0, 0%, 90%)',
                label: 'Light grey'
            },
            {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
            },
            {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red'
            },
            {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orange'
            },
            {
                color: 'hsl(60, 75%, 60%)',
                label: 'Yellow'
            },
            {
                color: 'hsl(90, 75%, 60%)',
                label: 'Light green'
            },
            {
                color: 'hsl(120, 75%, 60%)',
                label: 'Green'
            },
            {
                color: 'hsl(150, 75%, 60%)',
                label: 'Aquamarine'
            },
            {
                color: 'hsl(180, 75%, 60%)',
                label: 'Turquoise'
            },
            {
                color: 'hsl(210, 75%, 60%)',
                label: 'Light blue'
            },
            {
                color: 'hsl(240, 75%, 60%)',
                label: 'Blue'
            },
            {
                color: 'hsl(270, 75%, 60%)',
                label: 'Purple'
            }
        ]
    },
    fontSize: {
        options: [
            'tiny',
            'small',
            'default',
            'big',
            'huge'
        ]
    },
    language: 'en'
};
