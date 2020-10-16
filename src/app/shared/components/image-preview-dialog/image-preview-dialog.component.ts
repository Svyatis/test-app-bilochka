import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    name: string;
    image: string;
}

@Component({
    selector: 'app-image-preview-dialog',
    templateUrl: './image-preview-dialog.component.html',
})
export class ImagePreviewDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ImagePreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    closeWindow(): void {
        this.dialogRef.close();
    }
}
