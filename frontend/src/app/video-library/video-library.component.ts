import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss']
})
export class VideoLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
