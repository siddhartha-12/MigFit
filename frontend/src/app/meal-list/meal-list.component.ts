import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meals.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

 MealsData :any;

  constructor(
    public apiService: MealService
  ) {
    this.MealsData = [];
   }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    //Get saved list of students
    this.apiService.getItems().subscribe(response => {
      console.log(response);
      this.MealsData = response;
    })
  }
  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllTodos();
    });
  }
}
