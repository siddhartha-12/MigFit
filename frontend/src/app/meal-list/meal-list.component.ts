//imports
import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meals.service';
import { UserService } from 'src/app/services/user.service';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import { HttpClient } from '@angular/common/http';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// let pdfM = pdfMake.vfs;
// pdfM = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})

export class MealListComponent implements OnInit {

 MealsData :any;

  constructor(
    public apiService: MealService,
    private userService: UserService,
    private http:HttpClient

  ) {
    
    this.MealsData = [];

   }

  ngOnInit(): void {
    // console.log(this.userService.getUserId())
    this.getAllMeals(this.userService.getUserId());
  }

  //to fetch all the day to day meal record
  getAllMeals(userID) {
    //Get saved list of students
    this.apiService.getItems(userID).subscribe(response => {
      console.log(response);
      this.MealsData = response;
    })
  }

  //to delete a meal from the meal record
  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllMeals(this.userService.getUserId());
    });
  }

  //to download the contents of page as pdf file
  generatePdf(){
    console.log(pdfMake)
    const documentDefinition = { content:""};
    pdfMake.createPdf(documentDefinition).download;
   }
 }
