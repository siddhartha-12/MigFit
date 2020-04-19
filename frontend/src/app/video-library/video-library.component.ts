import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/uploads/uploads.service';

import { Upload } from 'src/app/uploads/upload.model';


@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss']
})
export class VideoLibraryComponent implements OnInit, OnDestroy {

  uploads: Upload[] = [];
  private uploadsSub: Subscription;
 
  constructor(public uploadsService: UploadService) {}

  ngOnInit() {
    this.uploadsService.getUploads();
    this.uploadsSub = this.uploadsService.getUploadUpdateListener()
      .subscribe((uploads : Upload[]) => {
          this.uploads = uploads;
      });
    }
      ngOnDestroy(){
        this.uploadsSub.unsubscribe();
      }
}
