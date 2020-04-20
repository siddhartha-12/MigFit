import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Upload } from 'src/app/uploads/upload.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../uploads/uploads.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit, OnDestroy{


  upload: Upload;
  uploadId: string;

  private uploadsSub: Subscription;
  constructor(public uploadService: UploadService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.uploadId = paramMap.get('id');
        this.uploadService.getUpload(this.uploadId).subscribe(uploadData => {
          this.upload = {
            id: uploadData._id,
            title: uploadData.title,
            content: uploadData.content,
            contentType: uploadData.contentType,
            mediaPath: uploadData.mediaPath,
            imagePath: null,
            userId: uploadData.userId
          };
          if (this.upload.contentType === 'link') {
            this.upload.mediaPath = this.upload.mediaPath.replace('watch?v=', 'embed/');
            this.upload.mediaPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.upload.mediaPath);
          }
        });
      }
    });
  }

  ngOnAfterContentInit() {

  }

  ngOnDestroy(){
    this.uploadsSub.unsubscribe();
  }
}
