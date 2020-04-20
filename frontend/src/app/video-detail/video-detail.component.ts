import { Component, OnInit, OnDestroy } from '@angular/core';
import { Upload } from 'src/app/uploads/upload.model';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/app/video-library/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit, OnDestroy{


  uploads: Upload[] = [];
  private uploadsSub: Subscription;
  constructor(public videosService: VideoService) { }

  ngOnInit(): void {
    this.videosService.getUploads();
    this.uploadsSub = this.videosService.getUploadUpdateListener()
      .subscribe((uploads : Upload[]) => {
          this.uploads = uploads;
      });
  }

  ngOnDestroy(){
    this.uploadsSub.unsubscribe();
  }
}
