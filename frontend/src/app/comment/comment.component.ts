import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments: Comment[] = [];
  newComment: Comment;
  uploadId: string;
  private userAuthSub: Subscription; 

  constructor(
    private userService: UserService ,
    private commentService: CommentService, 
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userAuthSub = this.userService.getUserStatusListener().subscribe();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('uploadId')) {
        this.uploadId = paramMap.get('uploadId');
        this.commentService.getComments(this.uploadId).subscribe(comments => {
          this.comments = comments;
        })
      }
    })
  }

  createNewComment(form: NgForm) {
    if (this.userService.getUserId() === "null") {
      this.snackBar.open("You haven't login yet.");
      return;
    }
    let userId: string = this.userService.getUserId();
    let uploadId: string = this.uploadId;
    let content: string = form.value.content;
    this.commentService.createNewComment({userId, uploadId, content} as Comment);
    this.comments.push();
  }

}
