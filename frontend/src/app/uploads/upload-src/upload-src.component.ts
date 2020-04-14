import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../uploads.service';
import { Upload } from '../upload.model';
import { mimeType} from "./mime-type.validator"
import { from } from 'rxjs';


@Component({
  selector: 'app-upload-src',
  templateUrl: './upload-src.component.html',
  styleUrls: ['./upload-src.component.scss']
})
export class UploadSrcComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  upload: Upload;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private uploadId: string; 

  constructor(
    public uploadsService: UploadService,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer
    ) { }
  // uploadCreated = new EventEmitter<Upload>();


  ngOnInit() {
    this.form = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, {validators: [Validators.required]}),
        image: new FormControl(null, {
          validators: [Validators.required], 
          asyncValidators:[mimeType]
        })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("uploadId")) {
        this.mode = "edit";
        this.uploadId = paramMap.get("uploadId");
        this.isLoading = true;
        this.uploadsService.getUpload(this.uploadId).subscribe(uploadData => {
          this.isLoading = false;
          this.upload = {
            id: uploadData._id, 
            title: uploadData.title, 
            content: uploadData.content,
            imagePath: uploadData.imagePath
          };
          this.form.setValue({
            title: this.upload.title,
            content: this.upload.content,
            image: this.upload.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.uploadId = null;
      }
    });
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // getTrustedYouTubeUrl(linkedVideo: string) {
  //   linkedVideo = linkedVideo.replace('watch?v=', 'embed/');
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(linkedVideo);
  // }
  onSaveUpload(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.uploadsService.addUpload(
        this.form.value.title, 
        this.form.value.content,
        this.form.value.image
      );
    } else {
    this.uploadsService.updateUpload(
      this.uploadId,
      this.form.value.title, 
      this.form.value.content,
      this.form.value.image
      );
    }
    this.form.reset();
  }

  getTrustedYouTubeUrl(linkedVideo:string) {
    linkedVideo=linkedVideo.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(linkedVideo);
  }
}
