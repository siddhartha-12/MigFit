import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

}
