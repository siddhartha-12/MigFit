
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Upload } from './upload.model';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Injectable({providedIn: 'root'})
export class UploadService{
    private uploads: Upload[] = [];
    private uploadsUpdated = new Subject<Upload[]>();

    constructor(private http: HttpClient, private router: Router){}

    getUploads(){
        // return [...this.uploads];
        this.http.get<{message: string, uploads: any}>('http://localhost:3030/fitness/uploads')
        .pipe(
            map(uploadData => {
                return uploadData.uploads.map(upload => {
                  return {
                    title: upload.title,
                    content: upload.content,
                    id: upload._id,
                    imagePath: upload.imagePath
                  };
                });
              })
        )
        .subscribe(transformUploads =>{
            this.uploads = transformUploads;
            this.uploadsUpdated.next([...this.uploads]);
        });
    }

    getUploadUpdateListener(){
        return this.uploadsUpdated.asObservable();
    }

    getUpload(id: string) {
        return this.http.get<{ _id: string; title: string; content: string, imagePath: string }>(
          "http://localhost:3030/fitness/uploads/" + id
        );
      }

    addUpload(title: string, content: string, image: File){
        const uploadData = new FormData();
        uploadData.append("title", title);
        uploadData.append("content", content);
        uploadData.append("image", image, title);
        this.http.post<{message: string; upload: Upload}>(
            'http://localhost:3030/fitness/uploads', 
            uploadData
            )
            .subscribe(responseData => {
                const upload: Upload = {
                    id: responseData.upload.id,
                    title: title,
                    content: content,
                    imagePath: responseData.upload.imagePath
                  };
                this.uploads.push(upload);
                this.uploadsUpdated.next([...this.uploads]);
                this.router.navigate(["/"]);
            });
    }

    updateUpload(id: string, title: string, content: string, image: File | string) {
        let uploadData: Upload | FormData;

        if (typeof image === "object") {
            uploadData = new FormData();
            uploadData.append("id", id);
            uploadData.append("title", title);
            uploadData.append("content", content);
            uploadData.append("image", image, title);
          } else {
            uploadData = {
              id: id,
              title: title,
              content: content,
              imagePath: image
            };
          }

        this.http
          .put("http://localhost:3030/fitness/uploads/" + id, uploadData)
          .subscribe(response => {
            const updatedUploads = [...this.uploads];
            const oldUploadIndex = updatedUploads.findIndex(p => p.id === id);
            const upload: Upload = {
                id: id,
                title: title,
                content: content,
                imagePath: ""
              };
            updatedUploads[oldUploadIndex] = upload;
            this.uploads = updatedUploads;
            this.uploadsUpdated.next([...this.uploads]);
            this.router.navigate(["/"]);
          });
      }
    
      deleteUpload(uploadId: string) {
        this.http
          .delete("http://localhost:3030/fitness/uploads/" + uploadId)
          .subscribe(() => {
            const updatedUploads = this.uploads.filter(upload => upload.id !== uploadId);
            this.uploads = updatedUploads;
            this.uploadsUpdated.next([...this.uploads]);
          });
      }
}