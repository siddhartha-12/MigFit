import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from '../models/comment.model';

@Injectable({providedIn: 'root'})
export class CommentService {
    constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

    getComments(uploadId: string) {
        return this.http.get<{message: any, comments: any}>('http://localhost:3030/fitness/comments/' + uploadId)
            .pipe(
                map(commentData => {
                    return commentData.comments.map(comment => {
                        return {
                            userId: comment.userId,
                            content: comment.content,
                            uploadId: comment.uploadId
                        }
                    });
                })
            );
    }

    createNewComment(comment: Comment) {
        this.http.post("http://localhost:3030/fitness/addComment", comment).subscribe(response => {
            console.log(response);
        }, err => {
            console.log(err);
            this.snackBar.open("fail to leave a comment");
        });
    }
}