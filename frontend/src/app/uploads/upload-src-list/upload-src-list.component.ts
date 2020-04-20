import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Upload } from '../upload.model';
import { UploadService } from '../uploads.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-upload-src-list',
  templateUrl: './upload-src-list.component.html',
  styleUrls: ['./upload-src-list.component.scss']
})
export class UploadSrcListComponent implements OnInit, OnDestroy{
  uploads: Upload[] = [];
  isLoading = false;
  private uploadsSub: Subscription;
 
  constructor(public uploadsService: UploadService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.isLoading = true;
    this.uploadsService.getUploads();
    this.uploadsSub = this.uploadsService.getUploadUpdateListener()
      .subscribe((uploads : Upload[]) => {
        this.isLoading = false;
          this.uploads = uploads;
          this.uploads.forEach(upload => {
            if (upload.contentType === 'link') {
              upload.mediaPath = upload.mediaPath.replace('watch?v=', 'embed/');
              upload.mediaPath = this.sanitizer.bypassSecurityTrustResourceUrl(upload.mediaPath);
            }
          });
      });
  }


  onDelete(uploadId: string) {
    this.uploadsService.deleteUpload(uploadId);
  }

  ngOnDestroy(){
    this.uploadsSub.unsubscribe();
  }

}
