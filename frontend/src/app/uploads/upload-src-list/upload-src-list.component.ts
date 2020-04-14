import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Upload } from '../upload.model';
import { UploadService } from '../uploads.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-upload-src-list',
  templateUrl: './upload-src-list.component.html',
  styleUrls: ['./upload-src-list.component.scss']
})
export class UploadSrcListComponent implements OnInit, OnDestroy{
  uploads: Upload[] = [];
  isLoading = false;
  private uploadsSub: Subscription;
 
  constructor(public uploadsService: UploadService) {}

  ngOnInit() {
    this.isLoading = true;
    this.uploadsService.getUploads();
    this.uploadsSub = this.uploadsService.getUploadUpdateListener()
      .subscribe((uploads : Upload[]) => {
        this.isLoading = false;
          this.uploads = uploads;
      });
  }


  onDelete(uploadId: string) {
    this.uploadsService.deleteUpload(uploadId);
  }

  ngOnDestroy(){
    this.uploadsSub.unsubscribe();
  }

}
