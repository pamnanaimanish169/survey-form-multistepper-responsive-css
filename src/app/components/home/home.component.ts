import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  checked;
  gender;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.firstFormGroup = new FormGroup({
      fname : new FormControl('', Validators.required),
      lname : new FormControl('', Validators.required),
      date : new FormControl('', Validators.required),
      country : new FormControl('', Validators.required),
      age : new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required)
    })

    this.secondFormGroup = new FormGroup({
      satisfaction : new FormControl('', Validators.required),
    })

    this.thirdFormGroup = new FormGroup({
      hear : new FormControl('', Validators.required),
    })
  }

  onChange(event) {
    if (event.target.checked == false) {
      let element = document.getElementById('terms_and_conditions');
      element.style.border = 'solid red 1px'
      this.firstFormGroup.controls.terms.patchValue(false)
    } else {
      this.firstFormGroup.controls.terms.patchValue(true)
    }
  }

  getGender(event) {
    console.log(event.target.value)
    if (event.target.value == 'male') {
      this.firstFormGroup.controls.gender.patchValue('male')
    } else if (event.target.value == 'female') {
      this.firstFormGroup.controls.gender.patchValue('female')
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('fname', this.firstFormGroup.controls.fname.value)
    formData.append('lname', this.firstFormGroup.controls.lname.value)
    formData.append('date', this.firstFormGroup.controls.date.value)
    formData.append('country', this.firstFormGroup.controls.country.value)
    formData.append('age', this.firstFormGroup.controls.age.value)
    formData.append('gender', this.firstFormGroup.controls.gender.value)
    formData.append('terms', this.firstFormGroup.controls.gender.value)

    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
      if (object[key] == '' || object[key] == undefined) {
        let element = document.getElementById(key);
        element.style.border = 'solid red 1px'
      }
    })
    let json = object;

    console.log(this.firstFormGroup)
    if(this.firstFormGroup.status == 'INVALID') {
      this.toastrService.error('Please fill all fields and try again.')
    } else {
      // Show the new form
      let firstFormGroup = document.getElementById('firstFormGroup');
      firstFormGroup.style.display = 'none'
      let secondFormGroup = document.getElementById('secondFormGroup');
      secondFormGroup.style.display = 'block'
    }

  }

  goToFirst() {
    let firstFormGroup = document.getElementById('firstFormGroup');
    let secondFormGroup = document.getElementById('secondFormGroup');

    secondFormGroup.style.display = 'none';
    firstFormGroup.style.display = 'block'
  }

  goToSecond() {

  }

  goToThird() {
    console.log(this.secondFormGroup)
    if (this.secondFormGroup.status == 'INVALID') {
      this.toastrService.error('Please ill all fields and try again.')
    } else {
      let secondFormGroup = document.getElementById('secondFormGroup');
      secondFormGroup.style.display = 'none'

      let thirdFormGroup = document.getElementById('thirdFormGroup');
      thirdFormGroup.style.display = 'block'
    }
  }

  goToFourth () {
    
  }

}
