import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../uploads.service';
import { Upload } from '../upload.model';
import { mimeType} from "./mime-type.validator"
import { from } from 'rxjs';
import {stringify} from 'querystring';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-upload-src',
  templateUrl: './upload-src.component.html',
  styleUrls: ['./upload-src.component.scss']
})
export class UploadSrcComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

  upload: Upload;
  isLoading = false;
  contentType: string;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private uploadId: string;

  constructor(
    public uploadsService: UploadService,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private userService: UserService,
    private router:Router
    ) { }
  // uploadCreated = new EventEmitter<Upload>();


  ngOnInit() {
    this.uploadsService.getUploadUpdateListener()
      .subscribe(res => {
        this.isLoading = false;
      });
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.form = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        contentType: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, {validators: [Validators.required]}),
        media: new FormControl(null, {validators: [Validators.required]}),
        link: new FormControl(null),
        /*image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators:[mimeType]
        })*/
    });
    this.form.get('contentType').valueChanges.subscribe(res => {
      if (this.contentType === 'link'){
        const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        this.form.get('link').setValidators([Validators.required, Validators.pattern(reg)]);
        this.form.get('media').clearValidators();
      }else{
        this.form.get('link').clearValidators();
        this.form.get('media').setValidators([Validators.required]);
      }
      this.form.get('media').updateValueAndValidity();

    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('uploadId')) {
        this.mode = 'edit';
        this.uploadId = paramMap.get('uploadId');
        this.isLoading = true;
        this.uploadsService.getUpload(this.uploadId).subscribe(uploadData => {
          this.isLoading = false;
          this.upload = {
            id: uploadData._id,
            title: uploadData.title,
            content: uploadData.content,
            contentType: uploadData.contentType,
            mediaPath: uploadData.mediaPath,
            imagePath: null,
            userId: this.userService.getUserId(),
            username: this.userService.getUsername()
          };
          this.form.patchValue({
            title: this.upload.title,
            content: this.upload.content,
            contentType: this.upload.contentType,
            mediaPath: this.upload.mediaPath,
            //link: this.upload.contentType === 'link'
          });
        });
      } else {
        this.mode = 'create';
        this.uploadId = null;
      }
    });
  }
  
  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.form.patchValue({media: file});
    console.log(this.form.get('media'));
    this.form.get('media').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSaveUpload(){
    console.log(this.form.value)
    console.log(this.form.status )
    if(this.form.invalid){
      console.log(this.form.invalid)
      console.log(this.form.errors)
      return;
    }

    console.log('I am here');
    console.log(this.form);
    this.isLoading = true;
    if (this.mode === 'create') {
      this.uploadsService.addUpload(
        this.form.value.title,
        this.form.value.content,
        this.form.value.contentType,
        this.form.value.image,
        this.form.value.media,
        this.form.value.link,
        this.userService.getUserId(),
        this.userService.getUsername()
      );
    } else {
    this.uploadsService.updateUpload(
      this.uploadId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.contentType,
      this.form.value.image,
      this.form.value.media,
      this.form.value.link,
      this.userService.getUserId(),
      this.userService.getUsername()
      );
    }
    this.form.reset();
    this.uploadsService.getUploadsByUserId(this.userService.getUserId());
  }

  getTrustedYouTubeUrl(linkedVideo:string) {
    linkedVideo=linkedVideo.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(linkedVideo);
  }
}
