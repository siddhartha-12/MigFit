import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { MealService } from '../services/meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html',
  styleUrls: ['./meal-create.component.scss']
})
export class MealCreateComponent implements OnInit {

  data: Meal
 
  constructor(
    public apiService: MealService,
    public router: Router
  ) {
    this.data = new Meal();
  }
 
  ngOnInit() {
  }
 
  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['list']);
    });
 
 }
}