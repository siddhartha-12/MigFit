import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meals.service';
import { UserService } from './node_modules/src/app/services/user.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

 MealsData :any;

  constructor(
    public apiService: MealService,
    private userService: UserService
  ) {
    this.MealsData = [];
   }

  ngOnInit(): void {
    // console.log(this.userService.getUserId())
    this.getAllMeals(this.userService.getUserId());
  }

  getAllMeals(userID) {
    //Get saved list of students
    this.apiService.getItems(userID).subscribe(response => {
      console.log(response);
      this.MealsData = response;
    })
  }
  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllMeals(this.userService.getUserId());
    });
  }
}
