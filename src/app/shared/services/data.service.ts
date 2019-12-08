import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Upload } from '../entities/upload';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  getProducts(basePath): Observable<any> {
    return this.db.object(basePath).valueChanges();
  }

  pushUpload(upload: Upload, data, basePath) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${basePath}/${Math.random().toString(36).slice(-5) + upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        console.log(error);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          data.photo = downloadURL,
          this.saveFileData(data, basePath);
        });
      }
    );
  }

  saveFileData(data, basePath) {
    const obj = this.db.database.ref(basePath);
    return obj.push(data);
  }
}
