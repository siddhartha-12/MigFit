import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import { VideoService } from 'src/app/video-library/video.service';

import { Upload } from 'src/app/uploads/upload.model';


@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss']
})
export class VideoLibraryComponent implements OnInit, OnDestroy {

  uploads: Upload[] = [];
  private uploadsSub: Subscription;
 
  constructor(public videosService: VideoService) {}

  ngOnInit() {
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
